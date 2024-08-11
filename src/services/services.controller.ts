import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  ParseUUIDPipe,
  ParseEnumPipe,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Category, CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/dto/create-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      await this.servicesService.create(createServiceDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async findAll() {
    try {
      await this.servicesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.servicesService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      await this.servicesService.update(id, updateServiceDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.servicesService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('category/:category')
  async getActiveServicesByCategory(
    @Param('category', new ParseEnumPipe(Category)) category: Category,
  ) {
    try {
      await this.servicesService.getActiveServicesByCategory(category);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
