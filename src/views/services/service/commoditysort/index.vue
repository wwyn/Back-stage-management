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
          <div>选择分类</div>
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
          <el-form-item label="商品图片" prop="thumbnailsUrl">
            <el-upload
              v-model="ruleForm.thumbnailsUrl"
              class="avatar-uploader-thumbnailsUrl"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :show-file-list="false"
              :on-success="handleThumbnailsUrlSuccess"
              :before-upload="beforeThumbnailsUrlUpload"
            >
              <img
                v-if="ruleForm.thumbnailsUrl"
                :src="ruleForm.thumbnailsUrl"
                class="avatar-thumbnailsUrl"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon-thumbnailsUrl"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品图片" prop="imageUrl">
            <el-upload
              v-model="ruleForm.imageUrl"
              class="avatar-uploader"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :show-file-list="false"
              :on-success="handleImageUrlSuccess"
              :before-upload="beforeImageUrlUpload"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
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
          <el-form-item v-show="this.value=='预定'" label="服务详情" prop="serviceExplain">
            <el-input type="textarea" v-model="ruleForm.serviceExplain"></el-input>
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
          <el-table :data="addTimeTableData" border style="width: 100%">
            <el-table-column prop="time" label="时间" width="180"></el-table-column>
            <el-table-column prop="quantity" label="可约人数" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEditorTime">编辑</el-button>
                <el-button type="text" size="small" @click="handleDelTime(scope.row)">删除</el-button>
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
            <el-button type="primary" @click="handleTimeConfirm">确认</el-button>
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
      serveId: 1001,
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
        thumbnailsUrl: "",
        productName: "",
        tag: [],
        description: "",
        marketPrice: "",
        salePrice: "",
        discountExplain: "",
        notice: "",
        notes: "",
        serviceExplain: ""
      },
      rules: {
        productName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 60, message: "长度在 1 到 60 个字符", trigger: "blur" }
        ],
        imageUrl: [
          { required: true, message: "请选择商品图片", trigger: "change" }
        ],
        description: [
          { required: true, message: "请输入商品介绍", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        marketPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        salePrice: [
          { required: true, message: "请输入商品现价", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        discountExplain: [
          { required: true, message: "请输入优惠详情", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        notice: [
          { required: true, message: "请输入公告说明", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        serviceExplain: [
          { required: true, message: "请输入服务详情", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        notes: [
          { required: true, message: "请输入购买须知", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      },
      //   预约
      productId: "",
      addTimeTableData: [],
      timeList: [{ time: "", number: "" }]
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.productId = this.$route.params.id;
      this.value = this.$route.params.value;
      this.getProductDetail({ id: this.$route.params.id });
      this.goBasic();
    }
    this.categoryList();
  },
  methods: {
    // 设置服务类商品
    async setVirtualProduct(query,time) {
      const _query = {
        ...query,
        anytimeReturn:
          this.ruleForm.tag.indexOf("anytimeReturn") != -1 ? "1" : "0",
        expiredReturn:
          this.ruleForm.tag.indexOf("expiredReturn") != -1 ? "1" : "0",
        canReturn: this.ruleForm.tag.indexOf("canReturn") != -1 ? "1" : "0",

        categoryId: this.serveId || "",
        description: this.ruleForm.description || "",
        discountExplain: this.ruleForm.discountExplain || "",
        marketPrice: this.ruleForm.marketPrice || 0,
        notes: this.ruleForm.notes || "",
        notice: this.ruleForm.notice || "",
        pic: this.ruleForm.imageUrl || "",
        thumbnailsUrl: this.ruleForm.thumbnailsUrl || "",
        productName: this.ruleForm.productName || "",
        salePrice: this.ruleForm.salePrice || 0,
        serviceExplain: this.ruleForm.serviceExplain || ""
      };
      try {
        const ret = await api.setVirtualProduct(_query);
        if (ret.data.code == 200) {
          console.log(ret, "设置商品");
          if (time == 0) {
            this.active = 4;
            this.showSort = false;
            this.showBasic = false;
            this.showTime = false;
            this.showSubmit = true;
          } else if (time == 1) {
            this.active = 3;
            this.showSort = false;
            this.showBasic = false;
            this.showTime = true;
            this.productId = ret.data.data.id;
            this.getProdReserveListByPid();
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取商品详情
    async getProductDetail(query) {
      try {
        const ret = await api.getProductDetail(query);
        console.log(ret, "商品详情");
        if (ret.data.code == 200) {
          let data = ret.data.data;
          this.ruleForm = {
            imageUrl: data.mainPic || "",
            thumbnailsUrl: data.thumbnailsUrl || "",
            productName: data.productName || "",
            tag:
              [
                data.canReturn == 1 ? "canReturn" : "",
                data.anytimeReturn == 1 ? "anytimeReturn" : "",
                data.expiredReturn == 1 ? "expiredReturn" : ""
              ] || [],
            description: data.metaDescription || "",
            marketPrice: data.marketPrice || "",
            salePrice: data.salePrice || "",
            discountExplain: data.discountExplain || "",
            notice: data.notice || "",
            notes: data.notes || "",
            serviceExplain: data.serviceExplain || ""
          };
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
    // 获取时间段列表
    async getProdReserveListByPid() {
      let query = {
        productId: this.productId
      };
      try {
        const ret = await api.getProdReserveListByPid(query);
        if (ret.data.code == 200) {
          this.addTimeTableData = ret.data.data.categories;
        } else {
          this.addTimeTableData = [];
          alert(ret.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除预约信息
    async removeProdReserve(query) {
      try {
        const ret = await api.removeProdReserve(query);
        console.log(ret, "删除预约信息");
        if (ret.data.code == 200) {
          this.getProdReserveListByPid();
        } else {
          alert(ret.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 批量添加预约时间
    async batchAddProdReserve(query) {
      try {
        const ret = await api.batchAddProdReserve(query);
        console.log(ret, "批量添加时间");
        if (ret.data.code == 200) {
          this.showModal = false;
          this.timeList = [{ time: "", number: "" }];
        } else {
          alert(ret.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除预约时间
    handleDelTime(options) {
      this.removeProdReserve({ id: options.id });
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
    handleThumbnailsUrlSuccess(res, file) {
      this.ruleForm.thumbnailsUrl = res.data[0];
    },
    beforeThumbnailsUrlUpload(file) {
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
    handleImageUrlSuccess(res, file) {
      this.imageUrl = res.data[0];
      this.ruleForm.imageUrl = res.data[0];
    },
    beforeImageUrlUpload(file) {
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
      if (this.productId != "") {
        let query = {productId: this.productId};
        this.setVirtualProduct(query,"0");
      } else {
        let query = {};
        this.setVirtualProduct(query,"0");
      }
    },
    // 返回列表
    goCommodity() {
      this.productId = "";
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
      if (this.productId != "") {
        let query = {productId: this.productId};
        this.setVirtualProduct(query,"1");
      } else {
        let query = {};
        this.setVirtualProduct(query,"1");
      }
    },
    // 预约提交
    goSubmitTime() {
      this.active = 4;
      this.showSort = false;
      this.showBasic = false;
      this.showSubmit = true;
      this.showTime = false;
    },
    addTime() {
      this.showModal = true;
    },
    handleEditorTime() {
      this.showModal = true;
    },
    handleTimeConfirm() {
      this.batchAddProdReserve();
    },
    handleCancel() {
      this.timeList = [{ time: "", number: "" }];
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
  .avatar-thumbnailsUrl {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon-thumbnailsUrl {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader-thumbnailsUrl /deep/ .el-upload {
    border: 1px dashed #999;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-thumbnailsUrl .el-upload:hover {
    border-color: #409eff;
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
    width: 400px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 400px;
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


