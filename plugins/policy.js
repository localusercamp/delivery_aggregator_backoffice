export const $roles = {
  $include: (roles) => {
    const fields = roles.map((role) => 'is' + role);

    return ({store}) => {
      const user = store.getters.user;
      if (!user) throw {statusCode: 404};
      for (const field of fields) if (user[field]) return;
      throw {statusCode: 404};
    }
  },

  $exclude: (roles) => {
    const fields = roles.map((role) => 'is' + role);

    return ({store}) => {
      const user = store.getters.user;
      if (!user) throw {statusCode: 404};
      for (const field of fields) if (user[field]) throw {statusCode: 404};
      return;
    }
  },
}
