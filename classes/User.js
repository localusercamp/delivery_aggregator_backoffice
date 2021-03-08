import Entity from '~/classes/Entity'
import Role from '~/classes/Role'

export default class User extends Entity
{
  constructor(user)
  {
    super();
    Object.assign(this, user);

    Object.defineProperty(this, 'isAdmin', {
      get: () => this.role_id === Role.ADMIN,
      ...User.prop_protected(),
    });
    Object.defineProperty(this, 'isModerator', {
      get: () => this.role_id === Role.MODERATOR,
      ...User.prop_protected(),
    });
    Object.defineProperty(this, 'isProvider', {
      get: () => this.role_id === Role.PROVIDER,
      ...User.prop_protected(),
    });
    Object.defineProperty(this, 'isClient', {
      get: () => this.role_id === Role.CLIENT,
      ...User.prop_protected(),
    });

    Object.defineProperty(this, 'startRoute', {
      get: () => {
        if (this.isProvider) {
          if (this.company.is_approved) {
            return '/dashboard';
          }
          return '/getting-started';
        }
        return '/dashboard';
      },
      ...User.prop_protected(),
    });
  }
}
