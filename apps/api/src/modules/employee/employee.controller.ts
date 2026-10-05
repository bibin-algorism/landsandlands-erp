import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UploadDocumentsDto } from './dto/upload-documents.dto';
import { CreateChangeRequestDto } from './dto/create-change-request.dto';
import { ActionChangeRequestDto } from './dto/action-change-request.dto';
import { DirectEditDto } from './dto/direct-edit.dto';
import { SubmitSecondDocDto } from './dto/submit-second-doc.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Employee Management')
@Controller('api/v1/employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Helper: Extract JWT user payload from Request Authorization Header
   */
  private extractUserFromReq(req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired JWT token');
    }
  }

  @Post()
  @ApiOperation({ summary: 'Model 1: Direct HR Onboarding Entry (FR-01)' })
  @ApiResponse({ status: 201, description: 'Employee record & User auth account created successfully' })
  async createEmployee(@Body() dto: CreateEmployeeDto, @Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.createEmployee(dto, user.sub || user.userId);
  }

  @Get('onboarding/pending-documents')
  @ApiOperation({ summary: 'List employees with pending secondary documents & 29-day notice flags (FR-07, FR-08)' })
  @ApiResponse({ status: 200, description: 'Pending onboarding documents queue fetched' })
  async getPendingOnboardingDocuments() {
    return this.employeeService.getPendingOnboardingDocuments();
  }

  @Post(':id/second-document')
  @ApiOperation({ summary: 'Submit missing secondary organisation document (FR-07, FR-08)' })
  @ApiResponse({ status: 200, description: 'Secondary document submitted successfully' })
  async submitSecondDocument(
    @Param('id') id: string,
    @Body() dto: SubmitSecondDocDto,
    @Req() req: any,
  ) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.submitSecondDocument(id, dto, user.sub || user.userId);
  }

  @Post(':id/documents')
  @ApiOperation({ summary: 'Upload Educational & Qualification Documents (FR-04 to FR-09)' })
  @ApiResponse({ status: 201, description: 'Documents uploaded successfully' })
  async uploadDocuments(
    @Param('id') id: string,
    @Body() dto: UploadDocumentsDto,
  ) {
    return this.employeeService.uploadEducationalDocuments(id, dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current logged-in employee profile (FR-11)' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  async getMyProfile(@Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.getEmployeeByUserId(user.sub || user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List active employees with basic role view' })
  @ApiQuery({ name: 'vertical', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Employee list fetched successfully' })
  async listEmployees(@Query('vertical') vertical?: string) {
    return this.employeeService.listEmployees(vertical);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single employee profile by ID with role-based masking' })
  @ApiResponse({ status: 200, description: 'Employee profile fetched successfully' })
  async getEmployeeById(@Param('id') id: string, @Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.getEmployeeById(id, user.role);
  }

  @Post('change-requests')
  @ApiOperation({ summary: 'Raise employee profile edit request with proof (FR-16, FR-17)' })
  @ApiResponse({ status: 201, description: 'Change request submitted successfully with 24h SLA' })
  async createChangeRequest(
    @Body() dto: CreateChangeRequestDto,
    @Req() req: any,
  ) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.createChangeRequest(user.sub || user.userId, dto);
  }

  @Post('change-requests/:id/action')
  @ApiOperation({ summary: 'HR action on edit request: APPROVE, QUERY, or REJECT (FR-19, FR-20)' })
  @ApiResponse({ status: 200, description: 'Change request actioned successfully' })
  async actionChangeRequest(
    @Param('id') id: string,
    @Body() dto: ActionChangeRequestDto,
    @Req() req: any,
  ) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.actionChangeRequest(id, dto, user.sub || user.userId);
  }

  @Put(':id/direct-edit')
  @ApiOperation({ summary: 'Direct HR Edit on employee record (FR-24)' })
  @ApiResponse({ status: 200, description: 'Direct edit applied with audit log' })
  async directEdit(
    @Param('id') id: string,
    @Body() dto: DirectEditDto,
    @Req() req: any,
  ) {
    const user = this.extractUserFromReq(req);
    return this.employeeService.directEdit(id, dto, user.sub || user.userId);
  }
}
