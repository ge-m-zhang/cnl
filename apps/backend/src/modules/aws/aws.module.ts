import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AWSController } from './aws.controller';
import { AWSService } from './aws.service';

@Module({
  imports: [ConfigModule],
  controllers: [AWSController],
  providers: [AWSService],
  exports: [AWSService],
})
export class AWSModule {}
