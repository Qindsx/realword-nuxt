<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="loginUser.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="item of comments" :key="item.id">
      <div class="card-block">
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username,
            },
          }"
          class="comment-author"
          >{{ item.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          article.createdAt | date('MMM DD, YYYY')
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      loginUser:this.$store.state.user
    };
  },
  props: {
    article: {
      type: Object,
      requied: true,
    },
  },
  async mounted() {
    const res = await this.$api.article.getArticleComments(this.article.slug);
    this.comments = res.comments;
    console.log(res);
  },
};
</script>
<style lang=""></style>
