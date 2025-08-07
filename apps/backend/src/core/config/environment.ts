import { Logger } from '@nestjs/common';

import { GPT_MODEL } from '@/utils/constants';

export type NodeEnv = 'local' | 'qa' | 'development' | 'production';

export type Environment = ReturnType<typeof environment>;
export type ServerConfig = ReturnType<typeof serverConfig>;
export type ClientConfig = ReturnType<typeof clientConfig>;
export type OpenAIConfig = ReturnType<typeof openaiConfig>;
export type GoogleAuthConfig = ReturnType<typeof googleConfig>;
export type AwsConfig = ReturnType<typeof awsConfig>;
export type JwtConfig = ReturnType<typeof jwtConfig>;
export type FeatureFlagsConfig = ReturnType<typeof featureFlagsConfig>;

const serverConfig = () => ({
  env: process.env.APP_ENV ?? ('local' as NodeEnv),
  isTestMode: process.env.NODE_ENV === 'test',
  port: parseInt(process.env.APP_PORT ?? '4000'),
  baseUrl:
    process.env.SERVER_BASE_URL ?? `http://localhost:${process.env.APP_PORT}`,
});

const clientConfig = () => ({
  host: process.env.CLIENT_HOST ?? 'http://localhost:3000',
});

const googleConfig = () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: `${serverConfig().baseUrl}/api/auth/google/callback`,
});

const openaiConfig = () => ({
  apiKey: process.env.OPENAI_API_KEY,
  // todo: change as env variable
  model: GPT_MODEL,
});

const jwtConfig = () => ({
  secret: process.env.JWT_SECRET,
});

const awsConfig = () => ({
  defaultRegion: process.env.AWS_DEFAULT_REGION || 'us-east-2',
  aws_access_key: process.env.AWS__ACCESS_KEY,
  aws_secret_access_key: process.env.AWS__SECRET_ACCESS_KEY,
});

/**
 * Feature flag configuration for enabling/disabling features based on environment
 */
export const featureFlagsConfig = () => ({
  // Authentication features
  auth: {
    google: process.env.ENABLE_GOOGLE_AUTH,
    jwt: true, // Always enabled as it's core functionality
  },
  // External API integrations
  integrations: {
    openai: process.env.ENABLE_OPENAI,
    aws: {
      dynamodb: process.env.ENABLE_AWS_DYNAMODB,
    },
  },
  // Feature development flags
  features: {
    newFeature: process.env.ENABLE_NEW_FEATURE, // Default: false
  },
});

export const environment = () => ({
  server: serverConfig(),
  client: clientConfig(),
  aws: awsConfig(),
  google: googleConfig(),
  openai: openaiConfig(),
  jwt: jwtConfig(),
  features: featureFlagsConfig(),
});
