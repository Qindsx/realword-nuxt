const cookieparser = process.server ? require('cookieparser') : undefined;

// 防止数据冲突，需要将state定义为一个函数，返回数据对象
export const state = () => {
  return {
    //当前登录用户状态
    user: null,
  };
};

export const mutations = {
  setUser(state, data) {
    console.log(data, 'state');
    state.user = data;
    console.log(state.user, 'state.user');
  },
};

export const actions = {
  // nuxtServerInit 只会在服务端渲染中执行
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
        console.log(user, 'user');
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user);
    console.log(state.user, 'state');
  },
};
