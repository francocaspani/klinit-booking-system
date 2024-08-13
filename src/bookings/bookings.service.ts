import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { ServicesService } from 'src/services/services.service';
import { User } from 'src/users/entities/user.model';
import { Service } from 'src/services/entities/service.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking)
    private bookingModel: typeof Booking,
    private usersService: UsersService,
    private servicesService: ServicesService,
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

    const userExists = await this.usersService.findOne(
      createBookingDto.clientId,
    );
    if (!userExists) {
      throw new Error('Client not found');
    }

    let workerExists;
    if (createBookingDto.workerId) {
      workerExists = await this.usersService.findOne(createBookingDto.workerId);
      if (!workerExists) {
        throw new Error('Worker not found');
      }
    }

    const services = await Promise.all(
      createBookingDto.services.map(async (serviceId) => {
        const service = await this.servicesService.findOne(serviceId);
        if (!service) {
          throw new Error(`Service with ID ${serviceId} not found`);
        }
        return service;
      }),
    );

    const totalPrice = services.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    const totalDurationInMinutes = services.reduce(
      (acc, service) => acc + service.durationInMinutes,
      0,
    );

    const booking = await this.bookingModel.create({
      ...createBookingDto,
      services: undefined,
      totalPrice,
      totalDurationInMinutes,
    });

    await booking.$set('client', userExists);
    await booking.$set('services', services);
    if (workerExists) {
      await booking.$set('worker', workerExists);
    }
    return booking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.findAll({
      include: [
        { model: this.userModel, as: 'client' },
        { model: this.userModel, as: 'worker' },
        { model: this.serviceModel, as: 'services' },
      ],
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findByPk(id, {
      include: [
        { model: this.userModel, as: 'client' },
        { model: this.userModel, as: 'worker' },
        { model: this.serviceModel, as: 'services' },
      ],
    });
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
      workerExists = await this.usersService.findOne(updateBookingDto.workerId);
      if (!workerExists) {
        throw new Error('Worker not found');
      }
    }

    let services;
    if (updateBookingDto.services && updateBookingDto.services.length > 0) {
      services = await Promise.all(
        updateBookingDto.services.map(async (serviceId) => {
          const service = await this.servicesService.findOne(serviceId);
          if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
          }
          return service;
        }),
      );
    }

    const totalPrice = services?.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    const totalDurationInMinutes = services?.reduce(
      (acc, service) => acc + service.durationInMinutes,
      0,
    );

    await booking.update({
      ...updateBookingDto,
      services: undefined,
      ...(totalPrice && { totalPrice }),
      ...(totalDurationInMinutes && { totalDurationInMinutes }),
    });

    if (services) {
      await booking.$set('services', services);
    }

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
      include: [
        { model: this.userModel, as: 'client' },
        { model: this.userModel, as: 'worker' },
        { model: this.serviceModel, as: 'services' },
      ],
    });
  }

  async findByWorker(workerId: string): Promise<Booking[]> {
    return this.bookingModel.findAll({
      where: { workerId },
      include: [
        { model: this.userModel, as: 'client' },
        { model: this.userModel, as: 'worker' },
        { model: this.serviceModel, as: 'services' },
      ],
    });
  }
}
