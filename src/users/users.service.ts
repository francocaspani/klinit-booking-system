import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }
    return await this.userModel.create(createUserDto as any);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(updateUserDto as any);
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return;
  }

  async verifyEmail(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update({ emailVerified: true });
    return user;
  }

  async getRole(id: string): Promise<Role> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.role;
  }
}
