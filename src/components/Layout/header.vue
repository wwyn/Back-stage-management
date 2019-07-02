<template>
  <div class="g-header">
    <div class="logo-header">
      <img src="../../assets/image/logo.png" alt>
      <p>诺系统管理后台</p>
    </div>
    <div class="user-name">
      <i class="iconfont icon-xiaoxi-wu"></i>
      <div class="header-user">
        <p>{{ userInfo.username }}</p>
      </div>
      <img src="../../assets/image/userImg.png" alt>
      <i @click="openQuit" class="arrow iconfont icon-tuichudenglu"></i>
    </div>
    <div v-if="isOpen" class="quit">
      <p>账号管理</p>
      <p>退出登录</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "g-header",
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openQuit() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style lang="less" scoped>
.g-header {
  position: relative;
  width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 59px;
  .logo-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      font-size: 16px;
      color: #101010;
      margin-left: 10px;
      font-weight: 500;
    }
  }
  .user-name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .arrow {
      font-size: 12px;
      margin-left: 15px;
      margin-top: 4px;
    }
    i {
      margin-right: 18px;
      margin-top: 2px;
    }
    .header-user {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      font-size: 20px;
      p {
        margin-right: 10px;
        font-size: 14px;
        color: #101010;
      }
    }
  }
  .quit {
    width: 70px;
    background-color: #fff;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 58px;
    border: 1px solid #d8d8d8;
    border-top: none;
    z-index: 999;
    p {
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
    p:nth-child(2) {
      border-bottom: 2px solid #1260fb;
    }
    p:hover {
      cursor:pointer;
      background-color: #F1F1F1;
    }
  }

  img {
    width: 36px !important;
    height: 36px !important;
    border-radius: 100%;
    vertical-align: middle;
  }
}
</style>
