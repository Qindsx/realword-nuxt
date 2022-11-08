import userRepositoryModule from '../api/userRepository.js';
import article from '../api/article.js';
import tags from '../api/tags.js';
export default function ({ $axios, store }, inject) {
  const apiModules = {};
  // 请求拦截器
  $axios.onRequest((config) => {
    // 相关配置
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });
  // 响应拦截器
  $axios.onResponse((config) => {});
  //  添加请求拦截
  // const apiModules = $axios.create({
  //   headers: {
  //     common: {
  //       Accept: 'text/plain, */*'
  //     }
  //   }
  // })
  apiModules.user = userRepositoryModule($axios);
  apiModules.article = article($axios);
  apiModules.tags = tags($axios);
  // Inject to context as $api
  inject('api', apiModules);
}
