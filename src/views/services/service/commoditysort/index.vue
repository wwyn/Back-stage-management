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
            @click="selectSort(index,item.categoryName,item.id)"
          >{{ item.categoryName }}</div>
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
          <el-form-item label="商品图片" prop="imageUrl">
            <el-upload
              v-model="ruleForm.imageUrl"
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
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="ruleForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="商品标签" prop="tag">
            <el-checkbox-group v-model="ruleForm.tag">
              <el-checkbox label="anytimeReturn">随时退</el-checkbox>
              <el-checkbox label="expiredReturn">过期退</el-checkbox>
              <el-checkbox label="canReturn">支持退款</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品介绍" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="marketPrice">
            <el-input v-model="ruleForm.marketPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品现价" prop="salePrice">
            <el-input v-model="ruleForm.salePrice"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="优惠详情" prop="discountExplain">
            <el-input type="textarea" v-model="ruleForm.discountExplain"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="公告说明" prop="notice">
            <el-input type="textarea" v-model="ruleForm.notice"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='券码'" label="购买须知" prop="notes">
            <el-input type="textarea" v-model="ruleForm.notes"></el-input>
          </el-form-item>
          <el-form-item v-show="this.value=='预定'" label="预定须知" prop="notes">
            <el-input type="textarea" v-model="ruleForm.notes"></el-input>
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
                <el-button type="text" size="small" @click="handleEditor">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
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
    <div v-if="showModal" class="show-modal">
      <div class="modal-box">
        <p>添加时间段</p>
        <el-form :inline="true">
          <div v-for="(item,index) in timeList" :key="index">
            <el-form-item label="时间">
              <el-time-select
                v-model="item.time"
                :picker-options="{
                        start: '08:30',
                        step: '00:30',
                        end: '18:30'
                    }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="可预约人数">
              <el-input v-model="item.number" placeholder="请填写"></el-input>
            </el-form-item>
          </div>
          <el-button type="primary" @click="handleTimeAdd">添加时间段</el-button>
          <p></p>
          <el-form-item class="button">
            <el-button type="primary" @click="handleConfirm">确认</el-button>
            <el-button @click="handleCancel">取消</el-button>
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
      active: 1,
      selectSortList: [],
      value: "券码",
      serveId: "",
      count: 0,
      showSort: true,
      showBasic: false,
      showSubmit: false,
      showTime: false,
      showModal: false,
      // 基本信息
      imageUrl: "",
      ruleForm: {
        imageUrl: "",
        productName: "",
        tag: [],
        description: "",
        marketPrice: "",
        salePrice: "",
        discountExplain: "",
        notice: "",
        notes: ""
      },
      rules: {
        productName: [
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
      ],
      timeList: [{ time: "", number: "" }]
    };
  },
  mounted() {
    this.categoryList();
  },
  methods: {
    // 设置服务类商品
    async setVirtualProduct() {
      const query = {
        anytimeReturn:
          this.ruleForm.tag.indexOf("anytimeReturn") != -1 ? "1" : "0",
        expiredReturn:
          this.ruleForm.tag.indexOf("expiredReturn") != -1 ? "1" : "0",
        canReturn: this.ruleForm.tag.indexOf("canReturn") != -1 ? "1" : "0",

        categoryId: this.ruleForm.serveId || 0,
        description: this.ruleForm.description || "",
        discountExplain: this.ruleForm.discountExplain || "",
        marketPrice: this.ruleForm.marketPrice || 0,
        notes: this.ruleForm.notes || "",
        notice: this.ruleForm.notice || "",
        pic: this.ruleForm.imageUrl || "",
        productName: this.ruleForm.productName || "",
        salePrice: this.ruleForm.salePrice || 0
      };
      try {
        const ret = await api.setVirtualProduct(query);
        if (ret.data.code == 200) {
          this.active = 4;
          this.showSort = false;
          this.showBasic = false;
          this.showTime = false;
          this.showSubmit = true;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 商品分类列表
    async categoryList() {
      const query = {
        pid: 1000
      };
      try {
        const ret = await api.categoryList(query);
        this.selectSortList = ret.data.data.categories;
      } catch (e) {
        console.log(e.message);
      }
    },
    selectSort(index, val, id) {
      this.count = index;
      this.value = val;
      this.serveId = id;
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
      this.ruleForm.imageUrl = res.data[0];
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
      console.log(this.ruleForm, "券码");
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
      this.setVirtualProduct();
    },
    addTime() {
      this.showModal = true;
    },
    handleEditor() {
      this.showModal = true;
    },
    handleConfirm() {
      this.showModal = false;
      console.log(this.timeList);
    },
    handleCancel() {
      this.showModal = false;
    },
    handleTimeAdd() {
      this.timeList.push({ time: "", number: "" });
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
  .show-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(12, 12, 12, 0.3);
    z-index: 99;
    .modal-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 2px;
      p {
        padding: 20px;
        box-sizing: border-box;
        background-color: #f1f1f1;
        margin-bottom: 20px;
      }
      form {
        padding: 20px;
        /deep/ .el-input__inner {
          width: 220px;
        }
        p {
          width: 100%;
          height: 20px;
          padding: 0;
          background-color: #fff;
          border-top: 1px solid #f1f1f1;
          margin-top: 20px;
        }
        .button {
          margin: 0;
          width: 100%;
          text-align: right;
        }
      }
    }
  }
}
</style>


