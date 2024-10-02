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
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/dto/create-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('bookings')
@UseGuards(AuthGuard, RolesGuard)
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
  @Roles([Role.Worker, Role.Admin])
  async findAll() {
    try {
      return await this.bookingsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('next-month')
  @Roles([Role.Worker, Role.Admin])
  async findNextMonth() {
    try {
      return await this.bookingsService.findNextMonth();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('me')
  async findMyBookings(@Request() req: any) {
    try {
      const userFromToken = req.user;
      return await this.bookingsService.findByClient(userFromToken.sub);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.bookingsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id')
  @Roles([Role.Client, Role.Admin])
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      return await this.bookingsService.update(id, updateBookingDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete(':id')
  @Roles([Role.Admin])
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.bookingsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id/cancel')
  @Roles([Role.Client, Role.Admin])
  async cancel(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.bookingsService.cancel(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('client/:id')
  @Roles([Role.Worker, Role.Admin])
  async findByClient(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.bookingsService.findByClient(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('worker/me')
  @Roles([Role.Worker])
  async findMyWorkerBookings(@Request() req: any) {
    try {
      const userFromToken = req.user;
      return await this.bookingsService.findByWorker(userFromToken.sub);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get('worker/:id')
  @Roles([Role.Admin, Role.Worker])
  async findByWorker(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.bookingsService.findByWorker(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
