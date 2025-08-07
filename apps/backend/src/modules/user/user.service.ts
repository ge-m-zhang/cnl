import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { User } from '@/core/types';

import { AWSService } from '../aws/aws.service';

@Injectable()
export class UserService {
  // temp workaround for getting credentials
  constructor(private readonly awsService: AWSService) {}

  private dynamoDBClient = new DynamoDBClient({
    region: this.awsService.region,
    credentials: {
      accessKeyId: this.awsService.accessKey,
      secretAccessKey: this.awsService.secretKey,
    },
  });

  private dynamoDBDocClient = DynamoDBDocumentClient.from(this.dynamoDBClient);

  private readonly tableName = 'users';

  async getUserByEmail(email: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        userId: email,
      },
    };

    try {
      const command = new GetCommand(params);
      const result = await this.dynamoDBDocClient.send(command);

      if (result.Item) {
        return result.Item as User;
      } else {
        return null; // Return null if no user found
      }
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new InternalServerErrorException('Error fetching user by email');
    }
  }

  async updateUserProfile(userProfile: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        userId: userProfile.userId,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        profilePicture: userProfile.profilePicture,
        accessToken: userProfile.accessToken,
        firstLogin: userProfile.firstLogin,
        lastLogin: userProfile.lastLogin,
      },
    };

    try {
      const command = new PutCommand(params);
      await this.dynamoDBDocClient.send(command);
      Logger.log('Profile updated successfully');
    } catch (error) {
      Logger.error('Error updating profile in DynamoDB', error);
      throw new InternalServerErrorException(
        'Error updating profile in DynamoDB',
      );
    }
  }
}
