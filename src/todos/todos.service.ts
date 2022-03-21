import { TodoEntity } from './entities/todo.entity';
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
    })
  }

  findAll(userId: number) {
    return this.repository.find({ where: { user: { id: userId } } })
  }

  async findOne(id: number) {
    let todo;
    try {
      todo = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('Todo Is Not Exist')
    }
    return todo
  }

  async update(id: number, dto: UpdateTodoDto) {
    let todo
    try {
      todo = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('Cannot Update')
    }

    return await this.repository.update(id, {
      title: dto.title || todo.title,
      description: dto.description || todo.description,
      isComplete: dto.isComplete ?? todo.isComplete
    })
  }

  async remove(id: number) {
    let todo;

    try {
      todo = await this.repository.findOneByOrFail({ id })
    } catch (e) {
      throw new BadRequestException('Cannot Delete')
    }

    return this.repository.delete(id)
  }
}
