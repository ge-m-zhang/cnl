import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ChatMessage } from '@/core/types';

import { AWSService } from '../aws/aws.service';

@Injectable()
export class MessageService {
  constructor(private readonly awsService: AWSService) {}

  private dynamoDBClient = new DynamoDBClient({
    region: this.awsService.region,
    credentials: {
      accessKeyId: this.awsService.accessKey,
      secretAccessKey: this.awsService.secretKey,
    },
  });

  private dynamoDBDocClient = DynamoDBDocumentClient.from(this.dynamoDBClient);

  private readonly tableName = 'messages';
  // Save a single message
  async saveMessage(message: ChatMessage): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        msgId: message.msgId,
        userId: message.userId,
        sender: message.sender,
        message: message.message,
        timestamp: message.timestamp,
      },
    };

    try {
      const command = new PutCommand(params);
      await this.dynamoDBDocClient.send(command);
    } catch (error) {
      console.error('Error saving message to DynamoDB:', error);
      throw new InternalServerErrorException(
        'Error saving message to DynamoDB',
      );
    }
  }

  // Retrieve messages by userId
  async getMessagesByUserId(userId: string): Promise<ChatMessage[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'UserIdIndex', // created the userId index
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    try {
      const command = new QueryCommand(params);
      const result = await this.dynamoDBDocClient.send(command);

      if (!result.Items) {
        return [];
      }

      return result.Items as ChatMessage[];
    } catch (error) {
      console.error('Error retrieving messages by userId:', error);
      throw new InternalServerErrorException(
        'Error retrieving messages by userId',
      );
    }
  }
}
