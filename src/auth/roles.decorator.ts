import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/dto/create-user.dto';

export const Roles = Reflector.createDecorator<Role[]>();
