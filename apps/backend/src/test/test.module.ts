import { Module } from '@nestjs/common';

import { AWSModule } from '@/modules/aws/aws.module';

import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [AWSModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
