import Vue from "vue";
import App from "./App.vue";
import VCharts from "v-charts";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Components from "./components";
import "./assets/styles/reset.css";
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Components);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
