import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface FeatureFlags {
  auth: {
    google: boolean;
    jwt: boolean;
  };
  integrations: {
    openai: boolean;
    aws: {
      dynamodb: boolean;
    };
  };
  features: {
    newFeature: boolean;
  };
}

@Injectable()
export class FeatureFlagsService {
  constructor(private readonly configService: ConfigService) {}

  private getFeatureFlag(key: string, defaultValue: boolean): boolean {
    const value = this.configService.get<string>(`features.${key}`);
    return value === undefined ? defaultValue : value === 'true';
  }

  isGoogleAuthEnabled(): boolean {
    return this.getFeatureFlag('ENABLE_GOOGLE_AUTH', true); // Enabled by default
  }

  isJwtEnabled(): boolean {
    return true; // Always enabled as core functionality
  }

  isOpenAiEnabled(): boolean {
    return this.getFeatureFlag('ENABLE_OPENAI', true); // Enabled by default
  }

  isDynamoDbEnabled(): boolean {
    return this.getFeatureFlag('ENABLE_AWS_DYNAMODB', true); // Enabled by default
  }

  isNewFeatureEnabled(): boolean {
    return this.getFeatureFlag('ENABLE_NEW_FEATURE', false); // Disabled by default
  }
}
