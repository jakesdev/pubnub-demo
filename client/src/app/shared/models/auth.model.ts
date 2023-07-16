import { AuthorizationStatus } from '../enums';
import { UserProfileModel } from './user.model';

export class AuthorizeResponse {
  status!: AuthorizationStatus;
  profile!: UserProfileModel;

  constructor(init?: Partial<AuthorizeResponse>) {
    Object.assign(this, init);
  }
}
