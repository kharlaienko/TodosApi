import { CategoryEntity } from './entities/category.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>
  ) { }

  create(dto: CreateCategoryDto, userId: number) {
    return this.repository.save({
      title: dto.title,
      user: { id: userId }
    })
  }

  findUsersCategories(userId: number) {
    return this.repository.find({
      where: {
        user: { id: userId }
      }
    })
  }

  findOne(id: number, userId: number) {
    return this.repository.findOne({ where: { id, user: { id: userId } } });
  }

  async update(id: number, userId: number, dto: UpdateCategoryDto,) {
    try {

      await this.repository.findOneOrFail({ where: { id, user: { id: userId } } })
    } catch {
      throw new BadRequestException('Todo was not found')
    }
    return this.repository.update(id, {
      title: dto.title
    });
  }

  async remove(id: number, userId: number) {
    try {

      await this.repository.findOneOrFail({ where: { id, user: { id: userId } } })
    } catch {
      throw new BadRequestException('Todo was not found')
    }

    return this.repository.delete(id)
  }
}
