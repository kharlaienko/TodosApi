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
    const user = await this.repository.findOne({ where: { 'id': id } })
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email }, select: ['password', 'userName', 'email', 'id'] })
    return user
  }

  async update(id: number, dto: UpdateUserDto) {
    let user;

    try {
      user = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('User was not found')
    }

    return this.repository.update(id, {
      userName: dto.userName
    })
  }

  async remove(id: number) {
    let user;
    try {
      user = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('User was not found')
    }

    return this.repository.delete(id)
  }
}
