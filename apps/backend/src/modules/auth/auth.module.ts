// auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigurationModule } from '@/core/config/configuration.modules';
import { ConfigurationService } from '@/core/config/configuration.service';

// Import the Google strategy
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ConfigurationModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
