import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { EmailsService } from 'src/emails/emails.service';
import { EmailType } from 'src/emails/dto/send-email.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private emailService: EmailsService,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }
    const newUser = await this.userModel.create(createUserDto as any);
    await this.emailService.sendEmail({
      to: newUser.email,
      type: EmailType.Verification,
      replacements: {
        token: newUser.id,
      },
    });
    return 'User created, vefify your email';
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

  async verifyEmail(id: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update({ emailVerified: true });
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async getRole(id: string): Promise<Role> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.role;
  }

  async setRole(id: string, role: Role): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update({ role });
    return user;
  }
}
