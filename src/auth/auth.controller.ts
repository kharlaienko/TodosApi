import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guard/auth/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly UsersService: UsersService
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.signJWT(req.user.id)
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.UsersService.create(dto)
    return this.authService.signJWT(user.id)
  }
}
