<template>
  <g-layout :userInfo="userInfo" :menu="menu">
    <div class="home-management">
      <div class="title">
        <span></span>
        LanunchScreen{{ this.$route.params.type }}
      </div>
      <p class="add-btn" @click="submitManagement">提交</p>
      <el-form ref="form" :model="LanunchScreenForm" label-width="80px">
        <el-form-item label="背景图片">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
          >
            <img v-if="LanunchScreenForm.imageUrl" :src="LanunchScreenForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="引导说法" class="guide">
          <el-input placeholder="最多可输入20个字符" maxlength="20" v-model="LanunchScreenForm.guide"></el-input>
        </el-form-item>
        <el-form-item label="功能类型">
          <el-radio-group v-model="LanunchScreenForm.resource">
            <el-radio label="图片"></el-radio>
            <el-radio label="音频"></el-radio>
            <el-radio label="视频"></el-radio>
            <el-radio label="电商"></el-radio>
            <el-radio label="社区"></el-radio>
            <el-radio label="老人"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跳转链接" class="link">
          <el-input placeholder="选填" v-model="LanunchScreenForm.link"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </g-layout>
</template>
<script>
import menu from "@/menu";
import * as auth from "@/utils/auth";

export default {
  data: () => ({
    menu: menu.home,
    userInfo: {},
    LanunchScreenForm: {
      guide: "",
      resource: "",
      link: "",
      imageUrl: ""
    }
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
    },
    // 获取品牌详情
    async getById(query) {
      try {
        let ret = await api.getById(query);
        if (ret.data.code == 200) {
          this.LanunchScreenForm = {
            guide: ret.data.data.brandName || "",
            resource: ret.data.data.company || "",
            imageUrl: ret.data.data.logo || ""
          };
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleImgSuccess(res, file) {
      this.LanunchScreenForm.imageUrl = res.data[0];
    },
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpeg";
      const extension1 = testmsg === "png";
      const extension2 = testmsg === "jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension1 && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg,jpeg,png格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning"
        });
      }
      return (extension || extension1 || extension2) && isLt2M;
    },
    submitManagement() {
      this.LanunchScreenForm = {
        guide: "",
        resource: "",
        link: "",
        imageUrl: ""
      };
      this.$router.push({
        name: "homeManagement"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.home-management {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 28px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
    span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: @color;
      margin-right: 8px;
      vertical-align: sub;
    }
  }
  .add-btn {
    width: 46px;
    height: 28px;
    background-color: @color;
    line-height: 28px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    position: absolute;
    right: 0;
    top: -5px;
  }
  .guide {
    width: 360px;
    height: 40px;
    input {
      width: 360px;
      height: 40px;
    }
  }
  .link {
    width: 600px;
    height: 40px;
    input {
      width: 600px;
      height: 40px;
    }
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 100px;
    display: block;
  }
}
</style>
