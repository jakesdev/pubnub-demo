import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  projectIcon: string;

  @IsOptional()
  description: string;

  @IsOptional()
  version: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}
