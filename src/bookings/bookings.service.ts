import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.model';
import { Service } from 'src/services/entities/service.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking)
    private bookingModel: typeof Booking,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    if (createBookingDto.clientId === createBookingDto.workerId) {
      throw new Error('Client and worker cannot be the same');
    }

    if (createBookingDto.services.length === 0) {
      throw new Error('At least one service must be selected');
    }

    const userExists = await this.userModel.findByPk(createBookingDto.clientId);
    if (!userExists) {
      throw new Error('Client not found');
    }

    let workerExists;
    if (createBookingDto.workerId) {
      workerExists = await this.userModel.findByPk(createBookingDto.workerId);
      if (!workerExists) {
        throw new Error('Worker not found');
      }
    }

    const services = await Promise.all(
      createBookingDto.services.map(async (serviceId) => {
        const service = await this.serviceModel.findByPk(serviceId);
        if (!service) {
          throw new Error(`Service with ID ${serviceId} not found`);
        }
        return service;
      }),
    );

    const total = services.reduce((acc, service) => acc + service.price, 0);

    const booking = await this.bookingModel.create({
      ...createBookingDto,
      services: undefined,
      total,
    });

    await booking.$set('client', userExists);
    await booking.$set('services', services);
    if (workerExists) {
      await booking.$set('worker', workerExists);
    }
    return booking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.findAll();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    let workerExists;
    if (updateBookingDto.workerId) {
      workerExists = await this.userModel.findByPk(updateBookingDto.workerId);
      if (!workerExists) {
        throw new Error('Worker not found');
      }
    }

    const services = await Promise.all(
      updateBookingDto.services.map(async (serviceId) => {
        const service = await this.serviceModel.findByPk(serviceId);
        if (!service) {
          throw new Error(`Service with ID ${serviceId} not found`);
        }
        return service;
      }),
    );

    const total = services.reduce((acc, service) => acc + service.price, 0);

    await booking.update({
      ...updateBookingDto,
      services: undefined,
      total,
    });

    await booking.$set('services', services);
    if (workerExists) {
      await booking.$set('worker', workerExists);
    }
    return booking;
  }

  async remove(id: string): Promise<void> {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await booking.destroy();
    return;
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await booking.update({ isCancelled: true });
    return booking;
  }

  async findByClient(clientId: string): Promise<Booking[]> {
    return this.bookingModel.findAll({
      where: { clientId },
    });
  }

  async findByWorker(workerId: string): Promise<Booking[]> {
    return this.bookingModel.findAll({
      where: { workerId },
    });
  }
}
