import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { ChatMessage } from '@/core/types';

import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('save')
  async saveMessage(
    @Body() message: ChatMessage,
  ): Promise<{ message: string }> {
    await this.messageService.saveMessage(message);
    return { message: 'Message saved successfully' };
  }

  @Get('get-by-user')
  async getMessagesByUserId(
    @Query('userId') userId: string,
  ): Promise<ChatMessage[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    return this.messageService.getMessagesByUserId(userId);
  }
}
