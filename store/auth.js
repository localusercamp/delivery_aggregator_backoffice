export const state = () => ({
  jwt: {},
});

export const mutations = {
  SET_AUTH: (state, obj) => state.jwt = obj,
};

export const actions = {
  setJWT: ({ commit }, obj) => commit('SET_AUTH', obj),
};

export const getters = {
  jwt: state => state.jwt,
  authenticated: state => !!state.jwt.access_token,
};

export const strict = false;
