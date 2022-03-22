import { IsString, Length } from "class-validator";
export class CreateCategoryDto {
   @IsString()
   @Length(3, 255)
   title: string;
}
