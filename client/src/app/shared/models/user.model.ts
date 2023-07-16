
export class UserProfileModel {
  id!: string;
  firstName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  avatar!: string;
  phone!: string;
  userRole!: any[];
  isActive!: boolean;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}` || '';
  }

  public constructor(init?: Partial<UserProfileModel>) {
    Object.assign(this, init);
  }
}
