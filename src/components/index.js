import Layout from "./Layout/index.vue";

const compontens = [Layout];

export default {
  install: Vue => {
    compontens.forEach(item => Vue.component(item.name, item));
  }
};
