import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { ApiError } from 'src/api/ApiError';
import { jwtErrors } from 'src/auth/api/jwt.errors';
import { JwtContents } from 'src/users/api/JwtContents';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async getJwtToken(userId: number): Promise<string> {
    const existingUser = await this.user.findOneBy({ id: userId });
    let token = existingUser.token ?? 'hello';
    if (
      existingUser.tokenExp &&
      dayjs(existingUser.tokenExp, 'DD/MM/YYYY').isBefore(dayjs())
    )
      token = 'hello';
    const userDataToUpdate = {
      token,
      tokenExp: dayjs().add(1, 'week').format('DD/MM/YYYY'),
    };
    await this.user.update(userId, userDataToUpdate);
    return this.jwtService.signAsync({ userId, token });
  }

  public async validateJwtToken(jwt: JwtContents): Promise<void> {
    const existingUser = await this.user.findOneBy({ id: jwt.userId });
    if (!existingUser)
      throw new ApiError({ userId: jwtErrors.userDoesNotExist });
    if (existingUser.token !== jwt.token)
      throw new ApiError({ token: jwtErrors.invalidToken });
    if (dayjs(existingUser.tokenExp, 'DD/MM/YYYY').isBefore(dayjs()))
      throw new ApiError({ token: jwtErrors.tokenExpired });
    await this.user.update(jwt.userId, {
      tokenExp: dayjs().add(1, 'week').format('DD/MM/YYYY'),
    });
  }
}
