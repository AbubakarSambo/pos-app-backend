import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
// import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // private mailService: MailService,
  ) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findByPhone(phone);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      user.password = undefined;
      return user;
    }
    return null;
  }
  async login(user: any) {
    console.log({ user });
    const payload = {
      phone: user.phone,
      id: user.id,
      role: user.roleId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
