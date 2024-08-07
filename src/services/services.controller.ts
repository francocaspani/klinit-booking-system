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
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Category, CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      await this.servicesService.create(createServiceDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      await this.servicesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.servicesService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id')
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
