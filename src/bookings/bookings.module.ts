import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './entities/booking.model';
import { BookingService } from './entities/bookingService.model';
import { UsersModule } from 'src/users/users.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking, BookingService]),
    UsersModule,
    ServicesModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [SequelizeModule],
})
export class BookingsModule {}
