import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/guards/roles.decorator';
import { CurrentUser, SessionGuard, type SessionUser } from '../../common/guards/session.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DirectEditDto } from './dto/direct-edit.dto';
import { ListEmployeesQueryDto } from './dto/list-employees.dto';
import { SubmitSecondDocDto } from './dto/submit-second-doc.dto';
import { EmployeeEditService } from './edit/employee-edit.service';
import { EmployeeService } from './employee.service';

@ApiTags('Employee Management')
@Controller('api/v1/employees')
@UseGuards(SessionGuard)
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly editService: EmployeeEditService,
  ) {}

  @Post()
  @Roles(UserRole.HR_ADMIN, UserRole.SUPER_ADMIN) // FR-01: only HR onboards employees
  @ApiOperation({ summary: 'Model 1: Direct HR Onboarding Entry (FR-01)' })
  @ApiResponse({
    status: 201,
    description: 'Employee record & User auth account created; returns the one-time temporary password',
  })
  createEmployee(@Body() dto: CreateEmployeeDto, @CurrentUser() user: SessionUser) {
    return this.employeeService.createEmployee(dto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List employees visible to the caller (BRQ-04, BRQ-14)' })
  listEmployees(@Query() query: ListEmployeesQueryDto, @CurrentUser() user: SessionUser) {
    return this.employeeService.listEmployees(user, query);
  }

  @Get('me')
  @ApiOperation({ summary: "The caller's own employee record (FR-11)" })
  getMyProfile(@CurrentUser() user: SessionUser) {
    return this.employeeService.getMyProfile(user);
  }

  @Get('onboarding/pending-documents')
  @Roles(UserRole.HR_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Employees with a pending previous-organisation document (FR-07, FR-08)' })
  getPendingOnboardingDocuments() {
    return this.employeeService.getPendingOnboardingDocuments();
  }

  @Post(':id/second-document')
  @Roles(UserRole.HR_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Submit the missing previous-organisation document (BR-05, FR-07)' })
  submitSecondDocument(
    @Param('id') id: string,
    @Body() dto: SubmitSecondDocDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.employeeService.submitSecondDocument(id, dto, user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Employee detail; restricted data only for permitted viewers (FR-11 to FR-14)' })
  getEmployee(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.employeeService.getEmployee(user, id);
  }

  @Get(':id/editable-fields')
  @ApiOperation({ summary: 'Fields and current values for HR edit or the employee change request' })
  getEditableFields(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.editService.editableFields(user, id);
  }

  @Patch(':id')
  @Roles(UserRole.HR_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'HR direct edit of another employee (FR-24, BR-16)' })
  directEdit(@Param('id') id: string, @Body() dto: DirectEditDto, @CurrentUser() user: SessionUser) {
    return this.editService.directEdit(user, id, dto);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Field and action history (BRQ-20, FR-38, FR-39)' })
  getHistory(
    @Param('id') id: string,
    @Query() query: ListEmployeesQueryDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.editService.history(user, id, query.field);
  }

  @Get(':id/documents/:document')
  @ApiOperation({ summary: 'Stream a document image; every view is audited' })
  getDocument(
    @Param('id') id: string,
    @Param('document') document: string,
    @CurrentUser() user: SessionUser,
  ) {
    return this.employeeService.openDocument(user, id, { document });
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Stream a current document image by storage key (edit screens); audited' })
  getDocumentByKey(@Param('id') id: string, @Query('key') key: string, @CurrentUser() user: SessionUser) {
    return this.employeeService.openDocument(user, id, { key });
  }
}
