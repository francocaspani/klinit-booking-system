import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './entities/service.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Service]), UsersModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [SequelizeModule, ServicesService],
})
export class ServicesModule {}
