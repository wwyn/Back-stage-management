<template>
  <div class="g-e-commerce">
    <g-layout :userInfo="userInfo"  title="诺电商系统" :menu="menu" />
  </div>
</template>

<script>
import menu from "@/menu";
import * as auth from "@/utils/auth";
export default {
  data: () => ({
    menu: menu.eCommerce,
    userInfo:{}
  }),
  mounted() {
    this.getCookie();
  },
  methods: {
    async getCookie() {
      try {
        let ret = await auth.getToken();
        this.userInfo = JSON.parse(ret);
        if (ret == {} || (ret.username == "" || ret.username == "undefind")) {
          this.$router.push({
            path: "/login"
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
