import { TodoEntity } from './../entities/todo.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

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
}
