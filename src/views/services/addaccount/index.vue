<template>
  <div class="list">
    <div class="title">
      <span></span>账户添加
    </div>
    <div class="account-set">账户设置</div>
    <el-form
      :model="userForm"
      status-icon
      :rules="rules"
      ref="userForm"
      label-width="100px"
      class="userForm"
    >
      <el-upload
        class="avatar-uploader"
        action="http://192.168.1.23:18899/sfy-resource/resource/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p>上传头像</p>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Email:" prop="Email">
        <el-input v-model="userForm.Email"></el-input>
      </el-form-item>
      <span class="asterisk1">*</span>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <span class="asterisk2">*</span>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属商家:" prop="region">
        <el-select v-model="userForm.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <p class="explain">选择所属商家后默认继承商家权限，可在商家列表中单独设置权限</p>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as api from "@/api";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userForm.checkPass !== "") {
          this.$refs.userForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        username: "",
        Email: "",
        pass: "",
        checkPass: "",
        region: ""
      },
      imageUrl: "",
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        Email: [
          { required: true, message: "请输入Email", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择所属商家", trigger: "change" }
        ]
      }
    };
  },

  mounted: function() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data[0];
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG || isJPEG) && isLt2M;
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.list {
  font-size: 14px;
  position: relative;
  color: #101010;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d8d8d8;
    span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: @color;
      margin-right: 8px;
      vertical-align: sub;
    }
  }
  .asterisk1 {
    color: red;
    position: absolute;
    top: 410px;
    left: 392px;
  }
  .asterisk2 {
    color: red;
    position: absolute;
    top: 470px;
    left: 362px;
  }
  .account-set {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f1f1f1;
    color: #101010;
    padding-left: 20px;
  }
  .el-form {
    text-align: center;
    .explain {
        margin-left: 230px;
        color: #999;
    }
    p {
        margin-bottom: 10px;
        color: @color;
        margin-left: 60px;
    }
    .el-form-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /deep/ .el-form-item__content {
      width: 280px;
      margin-left: 0 !important;
    }
    .el-input {
      width: 280px;
      input {
        width: 280px;
      }
    }
    .el-select {
      width: 280px;
    }
    .el-button {
        background-color: @color;
        color: #fff;
        margin-left: 100px;
    }
  }
  //   头像部分
  .avatar-uploader {
    margin: 20px 0 10px;
    /deep/ .el-upload {
      border: 4px dashed #f1f1f1;
      border-radius: 100%;
      margin-left: 60px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /deep/ .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 14px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>
