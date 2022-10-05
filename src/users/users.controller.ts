import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RegisterReq } from './api/register.req';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginReq } from './api/login.req';
import { AuthGuard } from '@nestjs/passport';
import { ApiError } from 'src/api/ApiError';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async registerUser(@Body() req: RegisterReq) {
    try {
      await this.userService.registerUser(req);
    } catch (e) {
      if (e instanceof ApiError) {
        e.send();
      } else throw e;
    }
  }

  @Post('login')
  async login(
    @Body() req: LoginReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userId = await this.userService.loginUser(req);
      const token = await this.authService.getJwtToken(userId);

      const secretData = { userId, token };
      res.cookie('auth-cookie', secretData, { httpOnly: true });
    } catch (e) {
      if (e instanceof ApiError) {
        e.send();
      } else throw e;
    }
  }

  @Get('movies')
  @UseGuards(AuthGuard('jwt'))
  async movies() {
    return ['Avatar', 'Avengers'];
  }
}
