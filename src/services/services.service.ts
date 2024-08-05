import { Injectable } from '@nestjs/common';
import { Category, CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './entities/service.model';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceModel.create(createServiceDto as any);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.findAll();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findByPk(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceModel.findByPk(id);
    if (!service) {
      throw new Error('Service not found');
    }
    await service.update(updateServiceDto as any);
    return service;
  }

  async remove(id: string): Promise<void> {
    const service = await this.serviceModel.findByPk(id);
    if (!service) {
      throw new Error('Service not found');
    }
    await service.destroy();
    return;
  }

  async getActiveServicesByCategory(category: Category): Promise<Service[]> {
    return await this.serviceModel.findAll({
      where: {
        isAvailable: true,
        category,
      },
    });
  }
}
