<template>
  <div>
    <!-- herder -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <!-- Add "active" class when you're on that page" -->
          <li class="nav-item">
            <!-- <a class="nav-link" href="">Home</a> -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor"
                ><i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
              <!-- <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a> -->
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a> -->
              <nuxt-link class="nav-link" to="/settings"
                ><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link
              >
            </li>
            {{user.username }}
            <li class="nav-item">
              <nuxt-link :to="`/profile/${user.userName}`" class="nav-link">
                <img :src="user.image" :alt="'user profile image'" :class="'user-pic'" />
                <!-- <ProfileImage
                  :url="user.image"
                  :class-name="'user.user-pic'"
                  :alt="'user profile image'"
                /> -->
                {{user.userName }}
              </nuxt-link>
            </li>
          </template>
          <template v-if="!user">
            <li class="nav-item">
              <!-- <a class="nav-link" href="">Sign up</a> -->
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="">Sign up</a> -->
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- child router  -->
    <nuxt-child></nuxt-child>
    <!-- {{ user }} -->
    <!-- footer -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  naem: 'LayoutIndex',
  computed: {
    ...mapState(['user']),
  },
};
</script>
<style lang=""></style>
