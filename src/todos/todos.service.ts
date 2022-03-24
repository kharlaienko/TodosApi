import { UserId } from 'src/decorators/userId.decorator';
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
      ...dto
    })
  }

  findAll(userId: number) {

    return this.repository.find({ where: { user: { id: userId } } })
  }

  async search(userId: number, dto: UpdateTodoDto) {

    const qb = this.repository.createQueryBuilder('todo')

    qb.leftJoin('todo.user', 'user').where('user.id = :id')

    if (dto.title) {
      qb.andWhere('todo.title ILIKE :title')
    }

    if (dto.priority) {
      qb.andWhere('todo.priority ILIKE :priority')
    }

    if (dto.isComplete) {
      qb.andWhere('todo.isComplete = :isComplete')
    }
    if (dto.priority) {
      qb.andWhere('todo.priority = :priority')
    }

    qb.setParameters({
      id: userId,
      title: `%${dto.title}%`,
      priority: dto.priority,
      isComplete: `${dto.isComplete}`
    })

    const [items, count] = await qb.getManyAndCount()
    return { items, count }
  }

  async findOne(id: number, userId) {
    let todo;
    try {
      todo = await this.repository.findOneOrFail({ where: { id, user: { id: userId } } })
    } catch (e) {
      throw new BadRequestException('Todo Is Not Exist')
    }
    return todo
  }

  async update(id: number, dto: UpdateTodoDto, userId: number) {
    let todo
    try {
      //todo = await this.repository.findOneOrFail({ where: { id, user: { id: userId } }, relations: ['user', 'category'] })
      todo = await this.repository.find({ where: { id, user: { id: userId } } })
    } catch (e) {
      throw new BadRequestException('The oparation is not possible')
    }

    return this.repository.update(id, {
      ...dto,
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
