export const state = () => ({
  user: {},
});

export const mutations = {
  SET_USER: (state, obj) => state.user = obj,
};

export const actions = {
  setUser: ({ commit }, obj) => commit('SET_USER', obj),
};

export const getters = {
  user: state => {
    const { user } = state;
    // assign some custom things to user
    return user;
  },
};

export const strict = false;
