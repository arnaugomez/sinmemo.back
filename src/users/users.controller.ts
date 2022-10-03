import { Body, Controller, Post } from '@nestjs/common';
import { RegisterReq } from './api/register.req';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  async registerUser(@Body() req: RegisterReq) {
    return await this.userService.registerUser(req);
  }
}
