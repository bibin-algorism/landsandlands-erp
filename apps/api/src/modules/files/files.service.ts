import { BadRequestException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { Prisma, StoredFileStatus } from '@prisma/client';
import { createHash } from 'crypto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { FILE_KEY_PATTERN, FileStorageService } from './file-storage.service';

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  pdf: 'application/pdf',
};

/**
 * Public interface of the Files module: records every upload (BRD 8.7 #13) and
 * lets other modules attach uploads to their records and stream them back.
 */
@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: FileStorageService,
  ) {}

  async store(input: {
    folder: string;
    extension: string;
    content: Buffer;
    fileName: string;
    uploadedById: string;
  }) {
    const key = await this.storage.save(input.folder, input.extension, input.content);
    return this.prisma.storedFile.create({
      data: {
        key,
        fileName: input.fileName,
        mimeType: MIME_TYPES[input.extension],
        size: input.content.length,
        sha256: createHash('sha256').update(input.content).digest('hex'),
        uploadedById: input.uploadedById,
      },
    });
  }

  /**
   * Mark freshly uploaded files as used by a record, inside the caller's transaction.
   * Only PENDING uploads can be attached, so a key cannot be reused across records.
   */
  async attach(tx: Prisma.TransactionClient, keys: string[]): Promise<void> {
    const unique = [...new Set(keys)];
    if (!unique.length) return;
    const result = await tx.storedFile.updateMany({
      where: { key: { in: unique }, status: StoredFileStatus.PENDING },
      data: { status: StoredFileStatus.ATTACHED, attachedAt: new Date() },
    });
    if (result.count !== unique.length) {
      const found = await tx.storedFile.findMany({
        where: { key: { in: unique }, status: StoredFileStatus.PENDING },
        select: { key: true },
      });
      const missing = unique.filter((key) => !found.some((f) => f.key === key));
      throw new BadRequestException(
        `Uploaded documents not found or already used: ${missing.join(', ')}`,
      );
    }
  }

  /** Stream a stored file. Callers must check access first. */
  async open(key: string, downloadName?: string): Promise<StreamableFile> {
    if (!FILE_KEY_PATTERN.test(key) || !(await this.storage.exists(key))) {
      throw new NotFoundException('Document not found');
    }
    const extension = key.split('.').pop()!;
    const record = await this.prisma.storedFile.findUnique({ where: { key } });
    const name = (downloadName ?? record?.fileName ?? key.split('/').pop()!).replace(/["\r\n]/g, '');
    return new StreamableFile(this.storage.open(key), {
      type: MIME_TYPES[extension],
      disposition: `inline; filename="${name}"`,
    });
  }
}
