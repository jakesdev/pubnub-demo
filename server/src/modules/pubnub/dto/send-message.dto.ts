import { IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  message: string;
}
