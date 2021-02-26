import { getAppUrl } from './cli/helpers';
import webpack from 'webpack'

const appUrl = getAppUrl();

export default {
  mode: 'spa',
  publicRuntimeConfig: {
    appUrl,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon/favicon.ico' },
      {
        rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon/favicon-32x32.png',
      },
    ],
  },
  loading: { color: '#fff' },
  generate: {
    fallback: 'index.html',
  },
  css: [
    '@/assets/css/bootstrap.min.css',
    '@/assets/scss/app.scss',
  ],
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/components.js',
    '~/plugins/ui.js',
    { src: '~/plugins/persistedstate.js', mode: 'client' },
    { src: '~/plugins/lodash.js', mode: 'client' },
    { src: '~/plugins/noty.js', mode: 'client' },
    { src: '~/plugins/element-ui.js', mode: 'client' },
  ],
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    baseURL: appUrl,
    browserBaseURL: appUrl,
  },
  router: {
    middleware: ['redirect']
  },
  build: {
    extend(config, ctx) {
    },

    plugins: [
      new webpack.ProvidePlugin({
        '$policy': '~/plugins/policy'
      })
    ]
  },
};
