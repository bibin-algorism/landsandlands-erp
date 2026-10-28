import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, SessionGuard, type SessionUser } from '../../../common/guards/session.guard';
import {
  ChangeRequestFieldsDto,
  ListChangeRequestsQueryDto,
  QueryChangeRequestDto,
  RejectChangeRequestDto,
} from './change-request.dto';
import { ChangeRequestService } from './change-request.service';

/**
 * Registered before EmployeeController so "change-requests" is not captured by GET :id.
 */
@ApiTags('Employee Change Requests')
@Controller('api/v1/employees')
@UseGuards(SessionGuard)
export class ChangeRequestController {
  constructor(private readonly changeRequests: ChangeRequestService) {}

  // Employee: own record only (FR-16)
  @Post('me/change-requests')
  @ApiOperation({ summary: 'Raise a change request on your own record (FR-16 to FR-18)' })
  raise(@Body() dto: ChangeRequestFieldsDto, @CurrentUser() user: SessionUser) {
    return this.changeRequests.raise(user, dto);
  }

  @Get('me/change-requests')
  @ApiOperation({ summary: 'Your change requests' })
  listMine(@CurrentUser() user: SessionUser) {
    return this.changeRequests.listMine(user);
  }

  @Put('me/change-requests/:id')
  @ApiOperation({ summary: 'Resubmit the queried fields (FR-21)' })
  reply(@Param('id') id: string, @Body() dto: ChangeRequestFieldsDto, @CurrentUser() user: SessionUser) {
    return this.changeRequests.reply(user, id, dto);
  }

  @Post('me/change-requests/:id/cancel')
  @ApiOperation({ summary: 'Withdraw an open change request' })
  cancel(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.changeRequests.cancel(user, id);
  }

  // Approvers: HR, or the MD for HR's own record (FR-18, BR-16)
  @Get('change-requests')
  @ApiOperation({ summary: 'Review queue with overdue flags (FR-18, FR-22)' })
  queue(@Query() query: ListChangeRequestsQueryDto, @CurrentUser() user: SessionUser) {
    return this.changeRequests.queue(user, query);
  }

  @Get('change-requests/:id')
  @ApiOperation({ summary: 'Change request detail' })
  detail(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.changeRequests.detail(user, id);
  }

  @Get('change-requests/:id/files')
  @ApiOperation({ summary: 'Stream a proof or proposed document of a change request' })
  openFile(@Param('id') id: string, @Query('key') key: string, @CurrentUser() user: SessionUser) {
    return this.changeRequests.openFile(user, id, key);
  }

  @Post('change-requests/:id/approve')
  @ApiOperation({ summary: 'Approve: the new values replace the old ones (FR-20)' })
  approve(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.changeRequests.approve(user, id);
  }

  @Post('change-requests/:id/query')
  @ApiOperation({ summary: 'Query named fields with a reason (FR-19, FR-21)' })
  query(@Param('id') id: string, @Body() dto: QueryChangeRequestDto, @CurrentUser() user: SessionUser) {
    return this.changeRequests.query(user, id, dto);
  }

  @Post('change-requests/:id/reject')
  @ApiOperation({ summary: 'Reject with a reason (FR-19)' })
  reject(@Param('id') id: string, @Body() dto: RejectChangeRequestDto, @CurrentUser() user: SessionUser) {
    return this.changeRequests.reject(user, id, dto);
  }
}
