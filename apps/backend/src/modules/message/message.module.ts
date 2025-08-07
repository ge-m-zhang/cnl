import { Module } from '@nestjs/common';

import { AWSService } from '../aws/aws.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, AWSService],
})
export class MessagesModule {}
