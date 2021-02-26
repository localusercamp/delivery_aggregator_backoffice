export default ({ store, $axios, redirect }) => {
  $axios.onRequest((config) => {
    const { access_token } = store.getters['auth/jwt'];
    const { expires } = store.getters['auth/jwt'];
    const now = Math.floor(Date.now() / 1000);
    if (!!expires && Number(expires) <= Number(now)) {
      store.dispatch('signout');
      return redirect('/signin');
    }
    access_token
      ? config.headers = { Authorization: `Bearer ${access_token}`, 'Accept-Language': 'ru' }
      : config.headers = { 'Accept-Language': 'ru' };
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  });

  $axios.onResponse((response) => {
    if (response.status === 403) {
      store.dispatch('signout');
      return redirect('/signin');
    }
    return response;
  });
};
