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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles([Role.Admin])
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
