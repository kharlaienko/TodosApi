import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],

})

export class AuthModule { }
