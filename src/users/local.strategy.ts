import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import { LoginReq } from './api/login.req';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<LoginReq> {
    const user = await this.userService.validateUserCredentials(
      email,
      password,
    );

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
