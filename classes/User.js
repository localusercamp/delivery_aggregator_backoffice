import IRelationable from '~/classes/IRelationable'
import Role from '~/classes/Role'
import Company from './Company'

export default class User extends IRelationable
{
  constructor(user)
  {
    super(user, User.relations);
  }

  static relations = {
    company: Company,
  };

  get isAdmin() {
    return this.role_id === Role.ADMIN;
  }

  get isModerator() {
    return this.role_id === Role.MODERATOR;
  }

  get isProvider() {
    return this.role_id === Role.PROVIDER;
  }

  get isClient() {
    return this.role_id === Role.CLIENT;
  }

  get startRoute() {
    if (this.isProvider) {
      if (this.company.is_approved) {
        return '/dashboard';
      }
      return '/getting-started';
    }
    return '/dashboard';
  }
}
