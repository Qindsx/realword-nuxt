<template lang="">
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <articleComments :article="article"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it';
import ArticleMeta from './components/article-meta';
import articleComments from './components/article-comments.vue';
export default {
  name: 'ArticleIndex',
  components: { ArticleMeta, articleComments },
  async asyncData({ $api, params }) {
    const data = await $api.article.getArticle(params.slug);
    const md = new MarkdownIt();
    data.article.body = md.render(data.article.body);
    console.log(data.article.body);
    return {
      article: data.article,
    };
  },
};
</script>
<style lang=""></style>
