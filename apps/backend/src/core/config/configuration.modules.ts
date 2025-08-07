import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { ConfigurationService } from './configuration.service';
import { environment } from './environment';
import { FeatureFlagsService } from './feature-flags.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(process.cwd(), 'apps/backend/.env'),
      load: [environment],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigurationService, FeatureFlagsService],
  exports: [ConfigurationService, FeatureFlagsService],
})
export class ConfigurationModule {}
