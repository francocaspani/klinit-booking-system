import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), BookingsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule],
})
export class UsersModule {}
