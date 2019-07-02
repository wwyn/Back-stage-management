<template>
  <el-container class="g-layout">
    <el-header class="header">
      <g-header :userInfo="userInfo"/>
    </el-header>
    <el-container class="content">
      <el-aside class="aside">
        <g-sidebar :title="title" :menu="menu"/>
      </el-aside>
      <el-main class="main">
        <slot>
          <router-view></router-view>
        </slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "./header";
import Sidebar from "./sidebar";

export default {
  components: {
    "g-sidebar": Sidebar,
    "g-header": Header
  },
  name: "g-layout",
  props: {
    title: {
      type: String,
      default: "诺管理系统"
    },
    menu: {
      type: Array,
      default: () => []
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style lang="less" scoped>
@color: #d8d8d8;
.g-layout {
  background-color: #fff;
}

.aside {
  width: 190px !important;
  overflow: hidden;
  height: 1056px;
  background: #fff;
  padding-top: 40px;
  border: 1px solid @color;
}

.content {
  background-color: #fff;
  width: 1280px;
  margin: auto;
}

.main {
  padding-right: 0;
  background-color: #fff;
}

.header {
  height: 59px !important;
  line-height: 59px;
  border-bottom: 1px solid @color;
  margin-bottom: 28px;
}
</style>
