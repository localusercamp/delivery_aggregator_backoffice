export const state = () => ({
  auth: {},
  user: {},
  synced: false,
});

export const mutations = {
  SET_AUTH: (state, obj) => state.auth = obj,
  SET_USER: (state, obj) => state.user = obj,
};

export const actions = {
  setAuth: ({ commit }, obj) => commit('SET_AUTH', obj),
  setUser: ({ commit }, obj) => commit('SET_USER', obj),
  signout: ({ dispatch }) => {
    dispatch('setAuth', {});
    dispatch('setUser', {});
    dispatch('setSynced', false);
  },
};

export const getters = {
  auth: (state) => state.auth,
  authenticated: (state) => !!state.auth.access_token,
  user: (state) => {
    const { user } = state;
    // assign some custom things to user
    return user;
  },
};

export const strict = false;
