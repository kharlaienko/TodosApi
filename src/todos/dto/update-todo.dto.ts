import { CreateTodoDto } from './create-todo.dto';
import { TodoPriority } from './../entities/todo.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ToBoolean } from 'src/decorators/to-bool.decorator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
   @IsOptional()
   @IsBoolean()
   @ToBoolean()
   isComplete?: boolean;

   @IsOptional()
   @IsNumber()
   categoryId?: number;

   @IsOptional()
   @IsString()
   @Matches(new RegExp(`${TodoPriority.HIGHT}|${TodoPriority.MEDIUM}|${TodoPriority.LOW}`))
   priority?: TodoPriority
}