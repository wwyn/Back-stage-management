<template>
  <div class="add-sort">
    <div class="title">
      <span></span>服务选择商品分类
    </div>
    <div class="sign">
      <el-steps v-if="this.value=='券码'" :active="active" align-center>
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="提交审核"></el-step>
      </el-steps>
      <el-steps v-if="this.value=='预定'" :active="active" align-center>
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写服务时间"></el-step>
        <el-step title="提交审核"></el-step>
      </el-steps>
    </div>
    <div v-show="showSort" class="add-sort-box">
      <div>
        <div>
          <p>选择分类</p>
          <i class="iconfont icon-fenleizhedie"></i>
        </div>
      </div>
      <div>
        <div class="select-sort">
          <div
            v-for="(item,index) in selectSortList"
            :key="item.id"
            :class="{active:count===index}"
            @click="selectSort(index,item.name)"
          >{{ item.name }}</div>
        </div>
        <p>
          您当前选择的饮品是:
          <span>{{ value }}</span>
        </p>
        <el-button type="primary" @click="goBasic">下一步，填写商品信息</el-button>
      </div>
    </div>
    <div v-show="showBasic" class="add-basic-box">
      <div>
        <div>
          <p>基本信息</p>
          <i class="iconfont icon-fenleizhedie"></i>
        </div>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品分类" prop="name">
            <p>{{ this.value }}</p>
          </el-form-item>
          <el-form-item label="商品图片" prop="name">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品标签" prop="tag">
            <el-checkbox-group v-model="ruleForm.tag">
              <el-checkbox label="随时退" name="tag"></el-checkbox>
              <el-checkbox label="过期退" name="tag"></el-checkbox>
              <el-checkbox label="支持退款" name="tag"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品介绍" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品现价" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="优惠详情" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="公告说明" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="购买须知" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='预定'" label="预定须知" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="goSort">上一步,选择商品分类</el-button>
            <el-button v-show="this.value=='券码'" type="primary" @click="goSubmit">提交</el-button>
            <el-button v-show="this.value=='预定'" type="primary" @click="goTime">下一步,填写预定时间</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="showTime" class="add-time-box">
      <div>
        <div>
          <p>选择时间</p>
          <i class="iconfont icon-fenleizhedie"></i>
        </div>
      </div>
      <div>
        <div>
          <p @click="addTime">添加时间</p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="时间" width="180"></el-table-column>
            <el-table-column prop="name" label="可约人数" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button type="primary" @click="goBasic">上一步，填写商品信息</el-button>
        <el-button @click="goSubmitTime">提交</el-button>
      </div>
    </div>
    <div v-show="showSubmit" class="show-submmit">
      <p>
        <i class="el-icon-sold-out"></i>
      </p>
      <strong>商家资料提交成功</strong>
      <p>客户资料提交成功</p>
      <el-button type="primary" @click="goCommodity">返回列表</el-button>
      <el-button v-show="this.value=='券码'" @click="goRevise">重新修改</el-button>
      <el-button v-show="this.value=='预定'" @click="goReviseTime">重新修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      selectSortList: [{ name: "券码", id: 0 }, { name: "预定", id: 1 }],
      value: "券码",
      count: 0,
      showSort: true,
      showBasic: false,
      showSubmit: false,
      showTime: false,
      // 基本信息
      imageUrl: "",
      ruleForm: {
        name: "",
        tag: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      //   预约
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    selectSort(index, val) {
      this.count = index;
      this.value = val;
    },
    goBasic() {
      this.active = 2;
      this.showSort = false;
      this.showSubmit = false;
      this.showTime = false;
      this.showBasic = true;
    },
    // 基本信息
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
    },
    goSort() {
      this.active = 1;
      this.showSort = true;
      this.showBasic = false;
    },
    goSubmit() {
      this.active = 3;
      this.showSort = false;
      this.showBasic = false;
      this.showSubmit = true;
    },
    goCommodity() {
      this.$router.push({
        path: "/services-service"
      });
    },
    goRevise() {
      this.active = 2;
      this.showSort = false;
      this.showBasic = true;
      this.showSubmit = false;
    },
    goReviseTime() {
        this.active = 3;
      this.showSort = false;
      this.showBasic = false;
      this.showSubmit = false;
      this.showTime = true;
    },
    goTime() {
      this.active = 3;
      this.showSort = false;
      this.showBasic = false;
      this.showTime = true;
    },
    goSubmitTime() {
      this.active = 4;
      this.showSort = false;
      this.showBasic = false;
      this.showTime = false;
      this.showSubmit = true;
    },
    addTime() {
        
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.add-sort {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 10px;
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
  .sign {
    margin: 20px 0;
  }
  /deep/ .el-step__title.is-finish {
    color: @color;
  }
  /deep/ .el-step__head.is-finish {
    color: @color;
    border-color: @color;
  }
  .add-sort-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #999;
    > div:nth-child(1) {
      width: 200px;
      > div {
        margin-top: 60px;
        background-color: #999;
        display: flex;
        p {
          padding: 10px 60px;
          width: 100%;
          color: #fff;
        }
        i {
          color: #999;
          font-size: 34px;
          margin-right: -26px;
        }
      }
    }
    > div:nth-child(2) {
      flex: 1;
      border-left: 1px solid #999;
      text-align: center;
      p {
        text-align: center;
        padding: 20px;
        span {
          color: red;
        }
      }
      .select-sort {
        width: 300px;
        margin: auto;
        border: 1px solid #999;
        border-radius: 4px;
        margin-top: 180px;
        margin-bottom: 60px;
        .active {
          background-color: @color;
          color: #fff;
        }
        > div {
          width: 300px;
          border-bottom: 1px solid #999;
          padding: 20px;
          box-sizing: border-box;
        }
        > div:nth-last-child(1) {
          border-bottom: none;
        }
      }
      button {
        background-color: @color;
        margin-bottom: 100px;
      }
    }
  }
  .add-basic-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #999;
    > div:nth-child(1) {
      width: 200px;
      > div {
        margin-top: 60px;
        background-color: #999;
        display: flex;
        p {
          padding: 10px 60px;
          width: 100%;
          color: #fff;
        }
        i {
          color: #999;
          font-size: 34px;
          margin-right: -26px;
        }
      }
    }
    > div:nth-child(2) {
      border-left: 1px solid #999;
      padding: 80px;
      box-sizing: border-box;
    }
  }
  .add-time-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #999;
    > div:nth-child(1) {
      width: 200px;
      > div {
        margin-top: 60px;
        background-color: #999;
        display: flex;
        p {
          padding: 10px 60px;
          width: 100%;
          color: #fff;
        }
        i {
          color: #999;
          font-size: 34px;
          margin-right: -26px;
        }
      }
    }
    > div:nth-child(2) {
      p {
        padding: 10px 20px;
        background-color: @color;
        color: #fff;
        display: inline-block;
        margin-bottom: 10px;
        border-radius: 4px;
      }
      flex: 1;
      border-left: 1px solid #999;
      padding: 80px;
      box-sizing: border-box;
      /deep/ table {
        .el-button {
          border: none;
          margin: 0;
          margin-right: 10px;
        }
      }
      .el-button {
        margin-top: 40px;
      }
    }
  }
  /deep/ .el-input__inner {
    width: 300px;
  }
  .el-button {
    border: 1px solid @color;
  }
  .el-button--primary {
    background-color: @color;
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #999;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .add-norms-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #999;
    > div:nth-child(1) {
      width: 200px;
      > div {
        margin-top: 60px;
        background-color: #999;
        display: flex;
        p {
          padding: 10px 60px;
          width: 100%;
          color: #fff;
        }
        i {
          color: #999;
          font-size: 34px;
          margin-right: -26px;
        }
      }
    }
    > div:nth-child(2) {
      border-left: 1px solid #999;
      padding: 80px;
      box-sizing: border-box;
    }
  }
  .show-submmit {
    margin-top: 20%;
    text-align: center;
    i {
      color: @color;
      font-size: 40px;
      margin-bottom: 10px;
    }
    strong {
      font-size: 36px;
      color: #101010;
    }
    p {
      margin: 20px;
      font-size: 16px;
      color: #999;
    }
    .el-button--primary {
      background-color: @color;
      color: #fff;
    }
  }
}
</style>


