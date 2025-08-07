import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AWSService implements OnModuleInit {
  public readonly region: string;
  public readonly accessKey: string;
  public readonly secretKey: string;

  public ddbClient: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_DEFAULT_REGION');
    this.accessKey = this.configService.get<string>('AWS__ACCESS_KEY');
    this.secretKey = this.configService.get<string>('AWS__SECRET_ACCESS_KEY');
  }

  async onModuleInit() {
    await this.initializeDynamoDBConnection();
  }

  // Initialize DynamoDB connection
  private async initializeDynamoDBConnection() {
    try {
      const client = new DynamoDBClient({
        region: this.region,
        credentials: {
          accessKeyId: this.accessKey,
          secretAccessKey: this.secretKey,
        },
      });

      this.ddbClient = DynamoDBDocumentClient.from(client);
      Logger.log('DynamoDB connection initialized');
    } catch (error) {
      Logger.error('Failed to initialize DynamoDB connection:', error);
      throw error;
    }
  }

  // Example method to list DynamoDB tables
  async listTables() {
    if (!this.ddbClient) {
      Logger.error('DynamoDB client is not initialized');
      throw new Error('DynamoDB client is not initialized');
    }

    try {
      const data = await this.ddbClient.send(new ListTablesCommand({}));
      Logger.log('Tables:', data.TableNames);
      return data.TableNames;
    } catch (error) {
      Logger.error('Error listing tables:', error);
      throw error;
    }
  }
}
