import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTodoDto {
   @IsNotEmpty()
   @IsString()
   @Length(3, 255)
   title: string

   @IsOptional()
   @IsString()
   @Length(3)
   description?: string
}
