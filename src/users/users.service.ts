import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterReq } from './api/register.req';
import { RegisterResErrors } from './api/register.res';
import { getPasswordHash } from './transformers/getPasswordHash';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  public async registerUser(input: RegisterReq): Promise<RegisterResErrors> {
    // TODO: check that user with given email does not already exist
    const newUser = new User();
    newUser.email = input.email;
    newUser.password = await getPasswordHash(input.password);
    await this.user.insert(newUser);
    return {};
  }
}
