import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';

import { User } from '@/core/types';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-by-email')
  async getUserByEmail(@Query('email') email: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('update-profile')
  async updateUserProfile(
    @Body() userProfile: User,
  ): Promise<{ message: string }> {
    await this.userService.updateUserProfile(userProfile);
    return { message: 'Profile updated successfully' };
  }
}
