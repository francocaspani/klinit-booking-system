import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './entities/service.model';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [SequelizeModule.forFeature([Service]), BookingsModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [SequelizeModule],
})
export class ServicesModule {}
