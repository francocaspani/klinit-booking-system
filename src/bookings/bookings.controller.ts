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
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      await this.bookingsService.create(createBookingDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      await this.bookingsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      await this.bookingsService.update(id, updateBookingDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.cancel(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('client/:id')
  async findByClient(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.findByClient(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('worker/:id')
  async findByWorker(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.findByWorker(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
