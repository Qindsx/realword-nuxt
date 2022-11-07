import userRepositoryModule from '../api/userRepository.js'
export default function ({ $axios }, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
  	// 相关配置
  })
  apiModules.user = userRepositoryModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}
