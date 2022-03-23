import { UserEntity } from './../users/entities/user.entity';
import { TodoEntity, TodoPriority } from './entities/todo.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private repository: Repository<TodoEntity>
  ) { }

  create(dto: CreateTodoDto, userId: number) {
    return this.repository.save({
      user: { id: userId },
      title: dto.title,
      description: dto.description || null,
      priority: dto.priority || TodoPriority.LOW,
    })
  }

  findAll(userId: number) {
    return this.repository.find({ where: { user: { id: userId } } })
  }

  async findOne(id: number) {
    let todo;
    try {
      todo = await this.repository.findOneOrFail({ where: { id } })
    } catch (e) {
      throw new BadRequestException('Todo Is Not Exist')
    }
    return todo
  }

  async update(id: number, dto: UpdateTodoDto, userId: number) {
    let todo
    try {
      //todo = await this.repository.findOneOrFail({ where: { id, user: { id: userId } }, relations: ['user', 'category'] })
      todo = await this.repository.createQueryBuilder('qb')
        .select("todo").from(TodoEntity, "todo")
        .leftJoinAndSelect('todo.user', 'user')
        .leftJoinAndSelect('user.categories', 'category')
        .where("todo.id = :todoId", { todoId: id })
        .andWhere('user.id = :userId', { userId: userId })
        .andWhere('category.id = :categoryId', { categoryId: dto.categoryId })
        .getOneOrFail()
    } catch (e) {
      throw new BadRequestException('The oparation is not possible')
    }

    return this.repository.update(id, {
      title: dto.title || todo.title,
      description: dto.description || todo.description,
      isComplete: dto.isComplete || todo.isComplete,
      priority: dto.priority || todo.priority,
      category: { id: dto.categoryId } || todo.category.id
    })
  }

  async remove(id: number) {
    let todo;

    try {
      todo = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('Cannot delete. Todo is not found.')
    }

    return this.repository.delete(id)
  }
}
