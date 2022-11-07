// export function authLoagin({ $axios, plalod: users }) {
//   return $axios.$post('/users/login', { user });
// }

export default ($axios) => ({
  // 登录接口
  authLoagin(paylod) {
    return $axios.$post('/users/login', paylod);
  },
  // 注册接口
  authRegister(paylod) {
    return $axios.$post('/users', paylod);
  },
});
