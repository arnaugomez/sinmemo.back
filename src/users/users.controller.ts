import { Body, Controller, Post } from '@nestjs/common';
import { getApiResponse } from 'src/api/ApiResponse';
import { LoginReq } from './api/login.req';
import { RegisterReq } from './api/register.req';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  async registerUser(@Body() req: RegisterReq) {
    const response = await this.userService.registerUser(req);
    return getApiResponse(response);
  }
  @Post('login')
  async login(@Body() req: LoginReq) {
    const response = await this.userService.loginUser(req);
    return getApiResponse(response);
  }
}
