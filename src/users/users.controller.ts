import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { handleApiError } from 'src/api/ApiResponse';
import { RegisterReq } from './api/register.req';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginReq } from './api/login.req';
import { AuthGuard } from '@nestjs/passport';
import { ApiError } from 'src/api/ApiError';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  async registerUser(@Body() req: RegisterReq) {
    try {
      await this.userService.registerUser(req);
    } catch (e) {
      if (e instanceof ApiError) {
        handleApiError(e.response);
      } else throw e;
    }
  }

  @Post('login')
  // @UseGuards(AuthGuard('local'))
  async login(
    @Body() req: LoginReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userId = await this.userService.loginUser(req);
      const token = await this.userService.getJwtToken(req);

      const secretData = { token, refreshToken };
      res.cookie('auth-cookie', secretData, { httpOnly: true });
    } catch (e) {
      if (e instanceof ApiError) {
        handleApiError(e.response);
      } else throw e;
    }
  }

  @Get('movies')
  @UseGuards(AuthGuard('jwt'))
  async movies() {
    return ['Avatar', 'Avengers'];
  }
}
