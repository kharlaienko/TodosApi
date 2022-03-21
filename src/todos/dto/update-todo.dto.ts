import { TodoEntity, TodoPriority } from './../entities/todo.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateTodoDto extends PartialType(TodoEntity) {
   @IsOptional()
   @IsString()
   @Length(3, 255)
   title?: string

   @IsOptional()
   @IsString()
   @Length(3)
   description?: string;

   @IsOptional()
   @IsBoolean()
   isComplete?: boolean;

   @IsOptional()
   @IsString()
   @Matches(new RegExp(`${TodoPriority.HIGHT}|${TodoPriority.MEDIUM}|${TodoPriority.LOW}`))
   priority?: TodoPriority
}
