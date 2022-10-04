import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
