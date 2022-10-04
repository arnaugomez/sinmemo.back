import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getApiResponse } from 'src/api/ApiResponse';
import { RegisterReq } from './api/register.req';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginReq } from './api/login.req';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  async registerUser(@Body() req: RegisterReq) {
    const response = await this.userService.registerUser(req);
    return getApiResponse(response);
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: LoginReq, @Res({ passthrough: true }) res: Response) {
    const response = await this.userService.loginUser(req);
    getApiResponse(response);
    const token = await this.userService.getJwtToken(req);

    const secretData = {
      token,
      refreshToken: '',
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return {};
  }
}
