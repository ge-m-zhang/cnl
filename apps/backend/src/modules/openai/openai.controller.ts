import { Body, Controller, Post } from '@nestjs/common';

import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('send-to-gpt')
  async sendMessage(@Body('message') message: string) {
    const response = await this.openAiService.sendMessageToGPT(message);
    return { response };
  }
}
