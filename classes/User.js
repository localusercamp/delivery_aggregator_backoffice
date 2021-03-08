import Entity from '~/classes/Entity'
import Role from '~/classes/Role'

export default class User extends Entity
{
  constructor(user)
  {
    super();
    Object.assign(this, user);
  }
  
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
