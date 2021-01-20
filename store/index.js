export const actions = {
  signout: ({ dispatch }) => {
    dispatch('auth/setJWT', {});
    dispatch('user/setUser', {});
  },
};
