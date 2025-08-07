import { Body, Controller, Post } from '@nestjs/common';

import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('add')
  async addTestData(
    @Body() testData: { randomId: string; message: string },
  ): Promise<{ message: string }> {
    await this.testService.addTestData(testData);
    return { message: 'Test data added successfully' };
  }
}
