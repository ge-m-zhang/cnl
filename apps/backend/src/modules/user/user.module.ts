import { Module } from '@nestjs/common';

import { AWSModule } from '../aws/aws.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AWSModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
