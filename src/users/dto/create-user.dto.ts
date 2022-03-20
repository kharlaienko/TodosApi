import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
   @IsNotEmpty()
   @IsString()
   @Length(3, 100)
   userName: string

   @IsNotEmpty()
   @IsEmail()
   email: string

   @IsNotEmpty()
   @Length(6, 100)
   password: string
}
