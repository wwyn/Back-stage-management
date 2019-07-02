<template>
  <div class="login" :style="loginBg">
    <div class="login-from">
      <img src="../../assets/image/loadbanner.png" alt>
      <div class="from">
        <div class="title">诺智能管理平台</div>
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="demo-ruleForm">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入名称"
            auto-complete="on"
            prop="username"
          ></el-input>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="enterLogin"
            prop="password"
            type="password"
          ></el-input>
          <div class="verification">
            <el-input
              v-model="loginForm.verification"
              placeholder="请输入验证码"
              @keyup.enter.native="enterLogin"
              prop="verification"
              @focus="handleChange"
              style="width: 200px;margin:0"
            ></el-input>
            <img class="verification-img" :src="verificationImg">
          </div>
          <el-button
            :disabled="isBtnLoading"
            v-bind:class="{active:isChange}"
            @click="handleLogin"
            :loading="isBtnLoading"
            @keyup.enter="enterLogin"
          >{{btnText}}</el-button>
          <div class="prompt" :class="{show:err}">*您输入的用户名或密码错误</div>
        </el-form>
      </div>
    </div>
    <div class="copyright">诺智能科技（上海）有限公司 2019 版权所有</div>
  </div>
</template>
<script>
import * as api from "@/api";
import * as auth from "@/utils/auth";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      loginBg: {
        backgroundImage:
          "url(" + require("../../assets/image/login-bg.png") + ")",
        backgroundRepeat: "repeat",
        backgroundSize: "auto"
      },
      loginForm: {
        username: "",
        password: "",
        verification: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      isBtnLoading: false,
      isChange: false,
      err: false,
      verificationImg: "",
      randomN: ""
    };
  },
  computed: {
    btnText: function() {
      if (this.isBtnLoading) return "登录中...";
      return "登录";
    }
  },
  mounted() {
    let Newrandom = Math.ceil(Math.random() * 1000);
    this.randomN = Newrandom;
    this.verificationImg =
      "http://192.168.1.23:18899/sfy-user/valid/imageCode?requestId=" +
      Newrandom;
    // this.getImageCode();
  },
  methods: {
    // 获取图片验证码
    // async getImageCode() {
    //   const query = {
    //     requestId: 2
    //   };
    //   try {
    //     const ret = await api.getImageCode(query);
    //     console.log(ret, "获取验证码");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // 系统登录
    handleChange() {
      this.isChange = true;
    },
    async sysUserLogin() {
      const query = {
        imageCode: this.loginForm.verification || '',
        password: this.loginForm.password || '',
        requestId: this.randomN || '',
        username: this.loginForm.username || '',
      };
      try {
        const ret = await api.sysUserLogin(query);
        if (ret.data.code == 200){
          this.setCookie(ret.data.data.accessToken);
          this.$router.push("/");
          this.$notify({
            type: "success",
            message: "欢迎你," + this.loginForm.username + "!",
            duration: 3000
          });
        } else {
          this.err = true;
          this.isBtnLoading = false;
        }
      } catch (e) {
        this.isBtnLoading = true;
      }
    },
    enterLogin: function(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.handleLogin();
      }
    },
    handleLogin() {
      this.isBtnLoading = true;
      this.sysUserLogin();
    },
    async setCookie(token) {
      try {
        let ret = await auth.setToken(token);
        console.log(ret, "token");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.login {
  background-color: #101010;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  .login-from {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    width: 800px;
    height: 460px;
    top: 50%;
    left: 50%;
    margin-top: -230px;
    margin-left: -400px;
    box-shadow: 0 0 4px 0 rgba(191, 191, 191, 0.5);
    border-radius: 6px;
    > img {
      width: 400px;
      height: 460px;
      vertical-align: middle;
    }
    .verification {
      width: 280px;
      margin: auto;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .verification-img {
        display: inline-block;
        width: 100px;
        height: 38px;
        border: 1px solid #ccc;
        vertical-align: middle;
      }
    }
  }
}
.copyright {
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  position: absolute;
  bottom: 60px;
  width: 100%;
}
.from {
  width: 400px;
  height: 460px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .title {
    font-family: sans-serif, serif;
    font-size: 18px;
    color: #101010;
    margin-bottom: 46px;
  }
}
.demo-ruleForm {
  .el-input {
    width: 280px;
    margin-bottom: 30px;
  }
  .el-input + .el-button {
    width: 280px;
    background: #999999;
    border-radius: 2px;
    font-size: 18px;
    color: #ffffff;
    margin-top: 10px;
    margin-bottom: 14px;
  }
  .el-button {
    width: 280px;
    background: #999999;
    border-radius: 2px;
    font-size: 18px;
    color: #ffffff;
    margin-top: 10px;
    margin-bottom: 14px;
  }
  .active {
    background-color: @color !important;
  }
  .prompt {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #eb001d;
    text-align: left;
    padding-left: 60px;
    opacity: 0;
  }
  .show {
    opacity: 1;
  }
}
</style>
