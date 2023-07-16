import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  picture?: string;

  @IsNotEmpty()
  password?: string;
}
