import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GPT_MODEL } from '@/utils/constants';

import {
  ClientConfig,
  GoogleAuthConfig,
  OpenAIConfig,
  ServerConfig,
} from './environment';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  getClientConfig(): ClientConfig {
    return this.configService.getOrThrow<ClientConfig>('client');
  }

  getServerConfig(): ServerConfig {
    return this.configService.getOrThrow<ServerConfig>('server');
  }

  getGoogleConfig(): GoogleAuthConfig {
    return this.configService.getOrThrow<GoogleAuthConfig>('google');
  }

  getHost(): string {
    return this.getClientConfig().host;
  }

  getJwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  getOpenAIConfig(): OpenAIConfig {
    return this.configService.getOrThrow<OpenAIConfig>('openai');
  }

  /**
   * getAwsConfig(): AWSConfig {
   * return this.configService.getOrThrow<AWSConfig>('aws');
   * }
   */
}
