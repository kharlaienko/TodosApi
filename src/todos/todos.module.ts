import { TodoEntity } from './entities/todo.entity';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule { }
