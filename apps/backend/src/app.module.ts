import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from './core/config/environment';
import { AuthModule } from './modules/auth/auth.module';
import { AWSModule } from './modules/aws/aws.module';
import { AWSService } from './modules/aws/aws.service';
import { MessagesModule } from './modules/message/message.module';
import { OpenAiController } from './modules/openai/openai.controller';
import { OpenAiService } from './modules/openai/openai.service';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
    }),
    AWSModule,
    AuthModule,
    MessagesModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController, OpenAiController],
  providers: [AppService, OpenAiService, AWSService],
})
export class AppModule {}
