export const state = () => ({
  cart: {},
});

export const mutations = {
  SET_CART: (state, obj) => state.cart = obj,
  ADD_TO_CART: (state, obj) => {
    const unique = _.cloneDeep(obj);
    unique.reassignProductUUID();
    state.cart.items.push(unique);
  },
  REMOVE_FROM_CART: (state, uid) => state.cart.items.splice(_.findIndex(state.cart.items, (item) => item.uid === uid), 1),
  FLUSH: (state) => state.cart.items = [],
};

export const actions = {
  init: ({dispatch}) => dispatch('setCart', {items: []}),
  add: ({commit}, obj) => commit('ADD_TO_CART', obj),
  remove: ({commit}, uid) => commit('REMOVE_FROM_CART', uid),
  flush: ({commit}) => commit('FLUSH'),
  setCart: ({ commit }, obj) => commit('SET_CART', obj),
};

export const getters = {
  cart: state => state.cart
};

export const strict = false;
