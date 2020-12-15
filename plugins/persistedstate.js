import createPersistedState from 'vuex-persistedstate';
import shareMutations from 'vuex-shared-mutations';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

export default ({ store }) => {
  createPersistedState({
    paths: ['auth'],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(store);

  shareMutations({
    predicate: ['SET_AUTH'],
  })(store);
};
