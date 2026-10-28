import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHashService } from '../../common/security/password-hash.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeAccessService } from './access/employee-access.service';
import { EmployeeEditService } from './edit/employee-edit.service';
import { ChangeRequestController } from './change-requests/change-request.controller';
import { ChangeRequestService } from './change-requests/change-request.service';
import { AuditModule } from '../audit/audit.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    AuditModule,
    FilesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'dev-super-secret-jwt-key-landsandlands-erp-2026',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  // ChangeRequestController first: its static paths must win over EmployeeController's GET :id
  controllers: [ChangeRequestController, EmployeeController],
  providers: [
    EmployeeService,
    EmployeeAccessService,
    EmployeeEditService,
    ChangeRequestService,
    PasswordHashService,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
