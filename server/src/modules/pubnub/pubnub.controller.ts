import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { PubNubService } from './pubnub.service';

@Controller('pubnub')
export class PubNubController {
  constructor(private pubNubService: PubNubService) {}

  @Post('message')
  sendMessage(@Body() dto: SendMessageDto) {
    return this.pubNubService.sendMessage(dto);
  }
}
