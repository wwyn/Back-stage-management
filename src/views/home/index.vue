<template>
  <g-layout :userInfo="userInfo" :menu="menu">中国地图</g-layout>
</template>
<script>
import menu from "@/menu";
import * as auth from "@/utils/auth";

export default {
  data: () => ({
    menu: menu.home,
    userInfo: {}
  }),
  mounted() {
    this.getCookie();
  },
  methods: {
    async getCookie() {
      try {
        let ret = await auth.getToken();
        if (ret === undefined) {
          this.$router.push({
            path: "/login"
          });
        } else {
           this.userInfo = JSON.parse(ret);
        }

      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
