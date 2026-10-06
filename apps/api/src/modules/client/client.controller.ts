import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('api/v1/clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
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
  @ApiOperation({ summary: 'Onboard a new Client (Individual or Corporate)' })
  async createClient(@Body() dto: CreateClientDto, @Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.clientService.createClient(dto, user.sub || user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all Clients with Pagination & Role-based Masking' })
  async getClients(@Query() query: QueryClientsDto, @Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.clientService.getClients(query, {
      userId: user.sub || user.userId,
      role: user.role,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Client details by ID' })
  async getClientById(@Param('id') id: string, @Req() req: any) {
    const user = this.extractUserFromReq(req);
    return this.clientService.getClientById(id, {
      userId: user.sub || user.userId,
      role: user.role,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Client details' })
  async updateClient(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
    @Req() req: any,
  ) {
    const user = this.extractUserFromReq(req);
    return this.clientService.updateClient(id, dto, {
      userId: user.sub || user.userId,
      role: user.role,
    });
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Reassign Client Primary Relationship Manager' })
  async assignPrimaryRM(
    @Param('id') id: string,
    @Body('primaryRMId') primaryRMId: string,
    @Req() req: any,
  ) {
    this.extractUserFromReq(req);
    return this.clientService.assignPrimaryRM(id, primaryRMId);
  }
}
