import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './entities/booking.model';
import { ServicesModule } from 'src/services/services.module';
import { BookingService } from './entities/bookingService.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Booking, BookingService]),
    ServicesModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [SequelizeModule],
})
export class BookingsModule {}
