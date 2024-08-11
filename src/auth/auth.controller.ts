import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('generate-code')
  async generateCode(@Query('email') email: string) {
    try {
      return await this.authService.generateCode(email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('login')
  async verifyCodeAndSignIn(@Body() singInDto: SingInDto) {
    try {
      return await this.authService.verifyCodeAndSignIn(singInDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
