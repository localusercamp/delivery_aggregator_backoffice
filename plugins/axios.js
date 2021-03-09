export default ({ store, $axios, redirect, app }) => {
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

  $axios.onResponseError(error => {
    const {response} = error;
    const {data}     = response;
    const {errors}   = data;

    // if (response.status === 403) {
    //   store.dispatch('signout');
    //   return redirect('/signin');
    // }

    const msg_text = 'При заполнении формы допущены ошибки';
    let msg_html = `${msg_text}<br/><br/>`;

    if (typeof errors === 'string') {
      msg_html = `${msg_html}${errors}`;
    }
    else {
      msg_html = Object.values(errors).reduce((accumulator, errors_arr) => `${accumulator}${errors_arr}<br/>`, msg_html);
    }
    app.router.app.$noty.error(msg_html);

    return;
  });
};
