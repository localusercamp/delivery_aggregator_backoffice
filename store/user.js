import User from "~/classes/User";

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
    const user = User.$adapt(state.user);

    // user.startRoute = user.isOperator ? '/analytics' : (
    //   !!user.company?.approved_at ? '/dashboard' : '/getting-started'
    // );

    // user.startRoute = '/dashboard';
    console.log(user);

    return user;
  },
};

export const strict = false;
