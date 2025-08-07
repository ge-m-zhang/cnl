import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { ConfigurationService } from '@/core/config/configuration.service';
import { FeatureFlagsService } from '@/core/config/feature-flags.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private readonly configService: ConfigurationService,
    private readonly featureFlags: FeatureFlagsService,
  ) {
    const isEnabled = featureFlags.isGoogleAuthEnabled();
    if (!isEnabled) {
      throw new Error('Google authentication is disabled');
    }

    const config = configService.getGoogleConfig();

    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      // need to be added to Authorized redirect URIs in Google Cloud Console
      // APIs & Services > Crendentials > XX web client > Authorized redirect URIs
      callbackURL: config.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: unknown, user?: unknown) => void,
  ) {
    try {
      if (!this.featureFlags.isGoogleAuthEnabled()) {
        throw new UnauthorizedException('Google authentication is disabled');
      }

      const { name, emails, photos } = profile;
      //Logger.log('profile***', JSON.stringify(profile));
      const user = {
        email: emails[0]?.value,
        firstName: name?.givenName,
        lastName: name?.familyName,
        picture: photos[0]?.value,
        accessToken,
      };
      done(null, user);
    } catch (error) {
      this.logger.error('Error in Google authentication:', error);
      done(error, null);
    }
  }
}

//temp
export type responseProfile = {
  emails: { value: string; verified: boolean }[];
  name: { familyName: string; givenName: string };
  photos: { value: string }[];
};
