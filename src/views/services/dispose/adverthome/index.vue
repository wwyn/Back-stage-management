<template>
  <div class="adverthome">
    <div class="title">
      <span></span>添加首页广告
    </div>
    <div class="contant">
      <p>添加广告</p>
      <div>
        <el-form
          :model="advertForm"
          :rules="rules"
          ref="advertForm"
          label-width="100px"
          class="demo-advertForm"
            >
          <el-form-item label="广告名称" prop="name">
            <el-input v-model="advertForm.name"></el-input>
            <p class="tips">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</p>
          </el-form-item>
          <el-form-item label="开始时间" prop="start">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              v-model="advertForm.start"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="end">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              v-model="advertForm.end"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="上线/下线" prop="online">
            <el-radio-group v-model="advertForm.resource">
              <el-radio label="1">上线</el-radio>
              <el-radio label="0">下线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告图片" prop="file">
            <el-upload
              class="upload-demo"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="广告链接" prop="link">
            <el-input v-model="advertForm.link"></el-input>
          </el-form-item>
          <el-form-item label="广告备注" prop="desc">
            <el-input type="textarea" v-model="advertForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAdvertForm('advertForm')">提交</el-button>
            <!-- <el-button @click="resetForm('advertForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      advertForm: {
        name: "",
        start: "",
        end: "",
        online: "1",
        file: "",
        link: "",
        desc: ""
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        start: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        end: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        file: [
          { required: true, message: "请选择上传广告图片", trigger: "change" }
        ],
        link: [
          { required: true, message: "请输入广告链接", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.getResourcesById({ id: this.$route.params.id });
    }
  },
  methods: {
    //   添加广告首页
    async setResources(data) {
      const _data = {
        ...data,
        appFileUrl: this.advertForm.file || "",
        beginShowTime: this.advertForm.start || "",
        description: this.advertForm.desc || "",
        endShowTime: this.advertForm.end || "",
        position: "home_banner",
        title: this.advertForm.name || "",
        status: this.advertForm.online || "",
        type: 1,
        url: this.advertForm.link || ""
      };
      try {
        let ret = await api.setResources(_data);
        console.log(ret, "添加");
        if (ret.data.code == 200) {
          this.$router.push({
            name: "servicesDispose"
          });
          this.advertForm = {
            name: "",
            start: "",
            end: "",
            online: "1",
            file: "",
            link: "",
            desc: ""
          };
        } else {
          alert("广告添加失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取详情
    async getResourcesById(data) {
      try {
        let ret = await api.getResourcesById(data);
        console.log(ret, "获取详情");
        if (ret.data.code == 200) {
          let data = ret.data.data;
          this.fileList=[{name:'广告图片',url:data.appFileUrl}]
          this.advertForm.file = data.appFileUrl || "";
          this.advertForm.start = data.beginShowTime || "";
          this.advertForm.desc = data.description || "";
          this.advertForm.end = data.endShowTime || "";
          this.advertForm.name = data.title || "";
          this.advertForm.online = data.status || "";
          this.advertForm.link = data.url || "";
        } else {
          alert("详情获取失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    submitAdvertForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            const query = {
              id: this.$route.params.id
            };
            this.setResources(query);
          } else {
            this.setResources({});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleSuccess(file, fileList) {
      this.advertForm.file = file.data[0];
      console.log(file.data[0]);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.adverthome {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 10px;
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
  .contant {
    border: 1px solid #999;
    margin-top: 20px;
    > p {
      background-color: #f1f1f1;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
    }
    > div {
      .tips {
        color: #999;
        font-size: 12px;
      }
      padding: 40px 240px;
      box-sizing: border-box;
      .el-input {
        width: 400px !important;
        height: 40px;
      }
      /deep/ .el-textarea__inner {
        width: 320px;
        height: 100px;
      }
    }
  }
}
</style>


