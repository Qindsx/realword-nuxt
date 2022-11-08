export default ($axios) => ({
  // 获取所有标签
  getTages() {
    return $axios.$get('/tags');
  },
});
