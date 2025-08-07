import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom Google Auth Guard
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    //? Add custom logic here if needed (e.g. redirect to login page)
    return (await super.canActivate(context)) as boolean;
  }
}
