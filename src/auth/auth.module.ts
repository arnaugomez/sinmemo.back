import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from 'src/users/user';

@Module({
  imports: [
    JwtModule.register({
      secret: 'My random secret key never let others',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
