import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { loginErrors } from './api/login.errors';
import { LoginReq } from './api/login.req';
import { LoginResErrors } from './api/login.res';
import { registerErrors } from './api/register.errors';
import { RegisterReq } from './api/register.req';
import { RegisterResErrors } from './api/register.res';
import { getPasswordHash } from './transformers/getPasswordHash';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async registerUser(input: RegisterReq): Promise<RegisterResErrors> {
    const existingUser = await this.user.findOneBy({ email: input.email });
    if (existingUser) return { email: [registerErrors.userExists] };

    const newUser = new User();
    newUser.email = input.email;
    newUser.password = await getPasswordHash(input.password);
    await this.user.insert(newUser);
    return {};
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<LoginReq> {
    const user = await this.user.findOneBy({ email });
    if (user == null) {
      return null;
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return { email, password };
  }

  public async getJwtToken(user: LoginReq): Promise<string> {
    return this.jwtService.signAsync({ ...user });
  }

  public async loginUser(input: LoginReq): Promise<LoginResErrors> {
    const existingUser = await this.user.findOneBy({ email: input.email });
    if (!existingUser) return { email: [loginErrors.userDoesNotExist] };
    const isValidPassword = await compare(
      input.password,
      existingUser.password,
    );
    if (!isValidPassword) return { password: [loginErrors.invalidPassword] };
    return {};
  }
}
