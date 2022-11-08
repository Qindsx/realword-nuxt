<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  class="nav-link"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  :class="{ active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                  class="nav-link"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <!-- <a href="" class="author">Eric Simons</a> -->
                <span class="date">{{
                  article.createAt | date('MMM DD,YYYY')
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoritedDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item === page }"
                v-for="item in totalPage"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                v-for="item of tags"
                :key="item"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LIMIT_LIST_ITEM } from '@/constants';
import { mapState } from 'vuex';
export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ $api, store, query }) {
    const page = Number.parseInt(query.page || 1);
    const { tag } = query;
    const tab = query.tab || 'global_feed';
    // const loadArticles = stroe.state.user && tab === 'your_feed' ?
    const params = {
      offset: (page - 1) * LIMIT_LIST_ITEM,
      tag,
    };

    const getArticles = (params) => {
      return $api.article.getArticles(params);
    };
    const getFeedArticles = (params) => {
      return $api.article.getFeedArticles(params);
    };

    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles;

    const [articlesData, tagData] = await Promise.all([
      loadArticles(params),
      $api.tags.getTages(),
    ]);
    const { articles, articlesCount } = articlesData;
    articles.forEach((item) => {
      item.favoritedDisabled = false;
    });
    const { tags } = tagData;
    return {
      articles,
      articlesCount,
      page,
      tag,
      tab,
      tags,
    };
  },
  methods: {
    async onFavorite(article) {
      console.log(article.slug);
      console.log(this.$axios);
      article.favoritedDisabled = true;
      if (article.favorited) {
        await this.$api.article.addFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await this.$api.article.deleteFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }

      article.favoritedDisabled = false;
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / LIMIT_LIST_ITEM);
    },
    ...mapState(['user']),
  },
};
</script>
<style lang=""></style>
