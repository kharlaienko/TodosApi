import { checkIsCompare } from 'src/config/hashing';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface UserRessponse {
  password: string,
  userName: string,
  email: string
  id: number
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<UserRessponse | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await checkIsCompare(password, user.password)) {
      delete user.password
      return user;
    }
    return null;
  }

  async signJWT(user) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
