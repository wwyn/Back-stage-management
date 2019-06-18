<template>
  <g-layout :userInfo="userInfo" :menu="menu">中国地图</g-layout>
</template>
<script>
import menu from "@/menu";
import * as api from "@/api";
import * as auth from "@/utils/auth";
import Cookies from "js-cookie";

export default {
  data: () => ({
    menu: menu.home,
    userInfo: {}
  }),
  mounted() {
    this.getCookie();
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        let ret = await api.getUserInfo();
        console.log(ret, "用户信息");
        this.userInfo = ret.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getCookie() {
      try {
        let ret = await auth.getToken();
        if (ret === undefined) {
          this.$router.push({
            path: "/login"
          });
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
