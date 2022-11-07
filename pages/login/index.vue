<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in error">
              <li v-for="(message, index) of messages" :key="index">
                {{ `${field}:${message}` }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="handleSumbit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//仅在客户加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
  name: 'LoginIndex',
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        username: '',
      },
      error: [], // 错误信息
    };
  },
  methods: {
    async handleSumbit() {
      try {
        // console.log(this.user);
        const res = this.isLogin
          ? await this.$api.user.authLoagin({ user: this.user })
          : await this.$api.user.authRegister({ user: this.user });
        // console.log(res);

        //保存用户的登录状态
        this.$store.commit('setUser', res.user);

        // 使用cookie来进行持久化
        Cookie.set('user', JSON.stringify(res.user));
        console.log(this.$store.state.user);

        this.$router.push('/');
      } catch (err) {
        console.log(err);
        this.error = err.response.data.errors;
      }
    },
  },
};
</script>
<style lang=""></style>
