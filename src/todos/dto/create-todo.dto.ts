import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { TodoPriority } from "../entities/todo.entity";

export class CreateTodoDto {
   @IsNotEmpty()
   @IsString()
   @Length(3, 255)
   title: string

   @IsOptional()
   @IsString()
   @Length(3)
   description?: string

   @IsOptional()
   @IsString()
   @Matches(new RegExp(`${TodoPriority.HIGHT}|${TodoPriority.MEDIUM}|${TodoPriority.LOW}`))
   priority?: TodoPriority
}
