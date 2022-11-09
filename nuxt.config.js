export default {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除pagse默认的路由表
      routes.splice(0);
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/index.vue'),
            children: [
              {
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/home/index.vue'),
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/index.vue'),
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/index.vue'),
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/index.vue'),
              },

              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/index.vue'),
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/index.vue'),
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/index.vue'),
              },
            ],
          },
        ]
      );
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  // buildModules: ['@nuxtjs/composition-api'],
  modules: ['@nuxtjs/axios'],
  plugins: ['./plugins/api.js', '~/plugins/dayjs.js'],
  axios: {
    baseURL: 'https://conduit.productionready.io/api',
  },
};
