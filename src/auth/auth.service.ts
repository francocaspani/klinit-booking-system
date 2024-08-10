import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { generateCode } from './utils/codeGenerator';
import { storeCode, verifyCode } from './utils/cacheService';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateCode(email: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    const code = generateCode();
    storeCode(user.email, code);
    // Send code to email
    return 'Code sent to email';
  }

  async verifyCodeAndSignIn(
    email: string,
    code: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    const verify = verifyCode(user.email, code);
    if (!verify) {
      throw new UnauthorizedException('Invalid code');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
