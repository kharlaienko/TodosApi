import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseBoolPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UserId } from 'src/decorators/userId.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  create(@Body() dto: CreateTodoDto, @UserId() id) {
    return this.todosService.create(dto, id);
  }

  @Get()
  findAllUsersTodo(@UserId() id: number) {
    return this.todosService.findAll(id);
  }

  @Get('/search')
  search(
    @UserId() id: number,
    @Query() dto: UpdateTodoDto
  ) {
    return this.todosService.search(id, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @UserId() userId: number) {
    return this.todosService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto, @UserId() userId) {
    return this.todosService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}
