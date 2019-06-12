<template>
  <g-layout :userInfo="userInfo" :menu="menu">
    <div class="home-management">
      <div class="title">
        <span></span>
        LanunchScreen{{ this.$route.params.type }}
      </div>
      <p class="add-btn" @click="submitManagement">提交</p>
      <el-form ref="LanunchScreenForm" :rules="rules" :model="LanunchScreenForm" label-width="80px">
        <el-form-item label="背景图片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.1.23:18899/sfy-resource/resource/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
          >
            <img
              v-if="!isVideo && LanunchScreenForm.imageUrl"
              :src="LanunchScreenForm.imageUrl || ''"
              class="avatar"
            >
            <video
              v-if="isVideo"
              :src="LanunchScreenForm.imageUrl"
              class="avatar"
              controls="controls"
            >您的浏览器不支持视频播放</video>
            <i v-if="!LanunchScreenForm.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="position: absolute;top: 70px;left: 180px;color: #999;">支持图片、GIF、小视频上传，尺寸1920*1200</p>
        </el-form-item>
        <el-form-item label="引导说法" class="guide" prop="guide">
          <el-input placeholder="最多可输入20个字符" maxlength="20" v-model="LanunchScreenForm.guide"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" class="villa">
          <el-select v-model="LanunchScreenForm.villa" placeholder="请选择小区名称">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能类型" prop="resource">
          <el-radio-group v-model="LanunchScreenForm.resource">
            <el-radio label="0">图片</el-radio>
            <el-radio label="1">视频</el-radio>
            <el-radio label="2">音频</el-radio>
            <el-radio label="3">电商</el-radio>
            <el-radio label="4">社区</el-radio>
            <el-radio label="5">老人</el-radio>
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
import * as api from "@/api";

import menu from "@/menu";
import * as auth from "@/utils/auth";

export default {
  data: () => ({
    menu: menu.home,
    userInfo: {},
    isVideo: false,
    LanunchScreenForm: {
      guide: "",
      resource: "0",
      link: "",
      imageUrl: "",
      villa: ""
    },
    rules: {
      guide: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
      ],
       imageUrl: [
        { required: true, message: "请上传背景图片", trigger: "blur" },
      ],
      resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
    }
  }),
  mounted() {
    this.getCookie();
    if (this.$route.params.bannerId != "") {
      this.getBanner(this.$route.params.bannerId);
    }
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
    // 获取详情
    async getBanner(query) {
      try {
        let ret = await api.getBanner(query);
        console.log(ret, "获取详情");
        if (ret.data.code == 200 && ret.data.data) {
          let _type = { 图片: 0, 视频: 1, 音频: 2, 电商: 3, 社区: 4, 老人: 5 }[
            ret.data.data.type
          ];
          console.log(_type);
          this.LanunchScreenForm = {
            guide: ret.data.data.voiceDesc || "",
            resource: _type.toString() || "",
            imageUrl: ret.data.data.backgroundUrl || "",
            link: ret.data.data.infoFileUrl || ""
          };
          console.log(this.LanunchScreenForm);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // addBanner
    async addBanner(data) {
      try {
        let ret = await api.addBanner(data);
        if (ret.data.code == 200) {
          this.$router.push({
            name: "homeManagement"
          });
        } else {
          alert("数据添加失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 修改
    async updateBanner(data) {
      try {
        let ret = await api.updateBanner(data);
        if (ret.data.code == 200) {
          console.log("修改了");
          this.$router.push({
            name: "homeManagement"
          });
        } else {
          alert("数据修改失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 编辑Banner
    handleImgSuccess(res, file) {
      this.LanunchScreenForm.imageUrl = res.data[0];
    },
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extensionV = testmsg === "mp4";
      if (!extensionV) {
        this.isVideo = false;
        const extension = testmsg === "jpeg";
        const extension0 = testmsg === "gif";
        const extension1 = testmsg === "png";
        const extension2 = testmsg === "jpg";
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!extension && !extension0 && !extension1 && !extension2) {
          this.$message({
            message: "上传文件只能是 jpg,jpeg,png,gif格式!",
            type: "warning"
          });
        }
        if (!isLt2M) {
          this.$message({
            message: "上传文件大小不能超过 10MB!",
            type: "warning"
          });
        }
        return (extension || extension0 || extension1 || extension2) && isLt2M;
      } else {
        this.isVideo = true;
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (
          [
            "video/mp4",
            "video/ogg",
            "video/flv",
            "video/avi",
            "video/wmv",
            "video/rmvb"
          ].indexOf(file.type) == -1
        ) {
          this.$message.error("请上传正确的视频格式");
          return false;
        }
        if (!isLt10M) {
          this.$message.error("上传视频大小不能超过10MB哦!");
          return false;
        }
      }
    },
    submitManagement() {
      console.log(this.LanunchScreenForm);
      const options = {
        infoFileUrl: this.LanunchScreenForm.link,
        type: this.LanunchScreenForm.resource,
        voiceDesc: this.LanunchScreenForm.guide,
        backgroundUrl: this.LanunchScreenForm.imageUrl
      };
      if (this.$route.params.bannerId === "") {
        let data = {
          ...options
        };
        this.addBanner(data);
      } else {
        let data = {
          ...options,
          bannerId: this.$route.params.bannerId
        };
        this.updateBanner(data);
      }
      this.LanunchScreenForm = {
        guide: "",
        resource: "",
        link: "",
        imageUrl: ""
      };
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
  .villa {
    width: 360px;
    height: 40px;
    .el-select {
      width: 100%;
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
