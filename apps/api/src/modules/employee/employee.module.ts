import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHashService } from '../../common/security/password-hash.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'dev-super-secret-jwt-key-landsandlands-erp-2026',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, PasswordHashService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
