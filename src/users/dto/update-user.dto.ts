import { IsString, Length, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   @IsNotEmpty()
   @IsString()
   @Length(6, 100)
   userName?: string;
}
