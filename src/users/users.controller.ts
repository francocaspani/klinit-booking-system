import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  ParseUUIDPipe,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req: any) {
    try {
      const userFromToken = req.user;
      return await this.usersService.findOne(userFromToken.sub);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin, Role.Worker])
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateMe(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userFromToken = req.user;
      return await this.usersService.update(userFromToken.sub, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token', new ParseUUIDPipe()) token: string) {
    try {
      return await this.usersService.verifyEmail(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
