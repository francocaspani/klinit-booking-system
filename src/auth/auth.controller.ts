import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin-user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

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
  async verifyCodeAndSignIn(
    @Body() singInDto: SingInDto,
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.verifyCodeAndSignIn(singInDto);
      res.cookie('access_token', token.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600 * 1000,
        path: '/',
      });

      const setCookieHeader = res.getHeader('Set-Cookie');
      if (!setCookieHeader) {
        throw new Error('Failed to set cookie');
      }
      console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']);

      return res.send({ success: true });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.send({ success: true });
  }

  @UseGuards(AuthGuard)
  @Get('is-auth')
  async isAuth(@Res() res: Response) {
    return res.send({ success: true });
  }
}
