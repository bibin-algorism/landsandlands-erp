import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FileStorageService } from './file-storage.service';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ||
          'dev-super-secret-jwt-key-landsandlands-erp-2026',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FileStorageService, FilesService],
  exports: [FilesService],
})
export class FilesModule {}
