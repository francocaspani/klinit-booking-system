import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { generateCode } from './utils/codeGenerator';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from './utils/cache.service';
import { SingInDto } from './dto/signin-user.dto';
import { EmailsService } from 'src/emails/emails.service';
import { EmailType } from 'src/emails/dto/send-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cacheService: CacheService,
    private emailService: EmailsService,
  ) {}

  async generateCode(email: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    const code = generateCode();
    await this.cacheService.storeCode(user.email, code);
    await this.emailService.sendEmail({
      to: user.email,
      type: EmailType.Access,
      replacements: {
        code,
      },
    });
    return 'Code sent to email';
  }

  async verifyCodeAndSignIn(
    singInDto: SingInDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(singInDto.email);
    const verify = await this.cacheService.verifyCode(
      user.email,
      singInDto.code,
    );
    if (!verify) {
      throw new UnauthorizedException('Invalid code');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
