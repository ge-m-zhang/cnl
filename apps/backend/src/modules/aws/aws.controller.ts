import { Controller, Get } from '@nestjs/common';

import { AWSService } from './aws.service';

@Controller('aws')
export class AWSController {
  constructor(private readonly awsService: AWSService) {}

  @Get('dynamodb/tables')
  async listTables() {
    return await this.awsService.listTables();
  }
}
