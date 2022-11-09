import { LIMIT_LIST_ITEM } from '@/constants';

export default ($axios) => ({
  // 获取首页文章列表
  getArticles({
    tag = '',
    author = '',
    favorited = '',
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }) {
    const defaultParam = {
      ...(tag && { tag }),
      ...(author && { author }),
      ...(favorited && { favorited }),
    };
    return $axios.$get('/articles', {
      params: { ...defaultParam, limit, offset },
    });
  },

  // 获取关注作者的文章列表
  getFeedArticles({ limit = LIMIT_LIST_ITEM, offset = 0 }) {
    return $axios.$get('/articles/feed', {
      // headers: {
      params: {
        limit,
        offset,
      },
    });
  },

  // 获取文章详情
  getArticle(slug) {
    return $axios.$get(`/articles/${slug}`);
  },

  // 获取文章评论
  getArticleComments(slug){
    return $axios.$get(`/articles/${slug}/comments`);

  },

  // 添加点赞
  addFavorite(slug) {
    return $axios.$post(`/articles/${slug}/favorite`);
  },
  // 取消点赞
  deleteFavorite(slug) {
    return $axios.$delete(`/articles/${slug}/favorite`);
  },
});
