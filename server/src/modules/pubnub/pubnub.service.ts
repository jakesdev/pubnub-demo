import { Body, Injectable } from '@nestjs/common';
import PubNub from 'pubnub';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class PubNubService {
  constructor() {
    //
  }
  async sendMessage(@Body() dto: SendMessageDto) {
    const pubnub = new PubNub({
      publishKey: 'pub-c-ef5da0f9-4cf0-4ffc-8130-ae025c9d6caa',
      subscribeKey: 'sub-c-a1d8f0c5-d52c-4854-8047-cfb669392bca',
      userId: 'myUniqueUserId',
    });

    const publishPayload = {
      channel: 'hello_world',
      message: {
        title: 'greeting',
        description: dto.message,
      },
    };
    await pubnub.publish(publishPayload);
    return dto;
  }
}
