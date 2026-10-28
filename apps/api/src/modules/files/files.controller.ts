import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, SessionGuard, type SessionUser } from '../../common/guards/session.guard';
import { FilesService } from './files.service';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface UploadedFilePart {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

/** Detect the real file type from its leading bytes; the client-sent mimetype is not trusted. */
function detectExtension(buffer: Buffer): 'jpg' | 'png' | 'webp' | 'pdf' | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpg';
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'png';
  }
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return 'webp';
  }
  if (buffer.toString('ascii', 0, 5) === '%PDF-') return 'pdf';
  return null;
}

@ApiTags('Files')
@Controller('api/v1/files')
@UseGuards(SessionGuard)
export class FilesController {
  constructor(private readonly files: FilesService) {}

  @Post('employee-documents')
  @ApiOperation({ summary: 'Upload an employee document image or PDF; returns its storage key (BR-04)' })
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE, files: 1 } }))
  async uploadEmployeeDocument(
    @UploadedFile() file: UploadedFilePart | undefined,
    @CurrentUser() user: SessionUser,
  ) {
    if (!file) {
      throw new BadRequestException('Attach the document in the "file" field.');
    }
    const extension = detectExtension(file.buffer);
    if (!extension) {
      throw new BadRequestException('Only JPG, PNG, WEBP or PDF files are accepted.');
    }

    const stored = await this.files.store({
      folder: 'employee-documents',
      extension,
      content: file.buffer,
      fileName: file.originalname,
      uploadedById: user.userId,
    });
    return { key: stored.key, fileName: stored.fileName, size: stored.size };
  }
}
