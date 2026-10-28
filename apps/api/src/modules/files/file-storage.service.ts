import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { createReadStream, promises as fs, type ReadStream } from 'fs';
import * as path from 'path';

export const FILE_KEY_PATTERN = /^[a-z-]+\/[0-9a-f-]{36}\.(jpg|png|webp|pdf)$/;

/**
 * Stores uploaded files and identifies them by an opaque storage key
 * (e.g. "employee-documents/<uuid>.jpg"). Local disk for now; swap the
 * implementation for GCS without changing callers.
 */
@Injectable()
export class FileStorageService {
  private readonly root: string;

  constructor(config: ConfigService) {
    this.root = path.resolve(config.get<string>('UPLOAD_DIR') || 'uploads');
  }

  async save(folder: string, extension: string, content: Buffer): Promise<string> {
    const key = `${folder}/${randomUUID()}.${extension}`;
    const target = this.resolve(key);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
    return key;
  }

  async exists(key: string): Promise<boolean> {
    if (!FILE_KEY_PATTERN.test(key)) return false;
    try {
      await fs.access(this.resolve(key));
      return true;
    } catch {
      return false;
    }
  }

  /** Open a stored file for streaming; throws if the key is malformed. */
  open(key: string): ReadStream {
    return createReadStream(this.resolve(key));
  }

  private resolve(key: string): string {
    if (!FILE_KEY_PATTERN.test(key)) {
      throw new Error(`Invalid storage key: ${key}`);
    }
    return path.join(this.root, key);
  }
}
