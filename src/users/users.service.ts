import { UserEntity } from './entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getHash, checkIsCompare } from 'src/config/hashing';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) { }

  async create(dto: CreateUserDto) {

    const user = await this.repository.findOneBy({ email: dto.email })
    if (user) {
      throw new BadRequestException('User is already exist')
    }

    return await this.repository.save({
      userName: dto.userName,
      password: await getHash(dto.password),
      email: dto.email,
    })
  }

  findAll() {
    return this.repository.find()
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id })
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
