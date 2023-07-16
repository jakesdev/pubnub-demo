import { Module } from '@nestjs/common';

import { PubNubController } from './pubnub.controller';
import { PubNubService } from './pubnub.service';

@Module({
  imports: [],
  controllers: [PubNubController],
  providers: [PubNubService],
  exports: [PubNubService],
})
export class PubNubModule {}
