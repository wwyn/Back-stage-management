import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
     // 处理状态
     change (state) {
      state.count += 10
     }
  },
  actions: {
    change ({commit}) {
      // 模拟异步
      setTimeout(() => {
       commit('change')
      }, 1000)
     }
  }
});
