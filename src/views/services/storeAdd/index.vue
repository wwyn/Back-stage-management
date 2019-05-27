<template>
  <div class="store-add">
    <div class="title">
      <span></span>新增商家
    </div>
    <el-form v-show="!showSubmmit" label-position="top" label-width="100px" :model="formAddStore">
      <el-form-item label="基础信息">
        <el-form
          label-position="top"
          v-model="formAddStore.basicForm"
          label-width="80px"
          :model="formAddStore.basicForm"
          :inline="true"
          class="basicForm"
          :rules="rules"
        >
          <el-form-item label="商家名称" prop="brandname">
            <el-input v-model="formAddStore.basicForm.brandname"></el-input>
          </el-form-item>
          <el-form-item label="商家类型" prop="class">
            <el-select v-model="formAddStore.basicForm.class" placeholder="请选择商家类型">
              <el-option
                v-for="item in classList"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域" prop="city">
            <el-select v-model="formAddStore.basicForm.city" placeholder="请选择所属区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮编" prop="username">
            <el-input v-model="formAddStore.basicForm.zipcode"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="formAddStore.basicForm.username"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="formAddStore.basicForm.job"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formAddStore.basicForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="formAddStore.basicForm.QQ"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formAddStore.basicForm.Emile"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="商家详情">
        <el-form
          label-position="top"
          v-model="formAddStore.detailForm"
          label-width="80px"
          :model="formAddStore.detailForm"
          :inline="true"
          class="basicForm"
          :rules="rules"
        >
          <el-form-item label="详情地址" prop="adress">
            <el-input v-model="formAddStore.detailForm.adress"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="call">
            <el-input v-model="formAddStore.detailForm.call"></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input v-model="formAddStore.detailForm.Fax"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="formAddStore.detailForm.Website"></el-input>
          </el-form-item>
          <el-form-item label="营业时间" prop="date">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formAddStore.detailForm.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="商家品类" prop="categories">
            <el-select v-model="formAddStore.detailForm.categories" placeholder="请选择品类">
              <el-option
                v-for="item in categoriesList"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家介绍" prop="introduction" class="introduction">
            <el-input type="textarea" v-model="formAddStore.detailForm.introduction"></el-input>
          </el-form-item>
          <el-form-item label="商家LOGO" prop="logoimageUrl">
            <el-upload
              v-model="formAddStore.detailForm.logoimageUrl"
              class="logoimage-uploader"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :show-file-list="false"
              :on-success="handlelogoSuccess"
              :before-upload="beforelogoUpload"
            >
              <img
                v-if="formAddStore.detailForm.logoimageUrl"
                :src="formAddStore.detailForm.logoimageUrl"
                class="logoimage"
              >
              <i v-else class="el-icon-plus logoimage-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商家背景图" prop="bgimageUrl">
            <el-upload
              v-model="formAddStore.detailForm.bgimageUrl"
              class="bgimg-uploader"
              action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
              :show-file-list="false"
              :on-success="handlebgimgSuccess"
              :before-upload="beforelogoUpload"
            >
              <img
                v-if="formAddStore.detailForm.bgimageUrl"
                :src="formAddStore.detailForm.bgimageUrl"
                class="bgimg"
              >
              <i v-else class="el-icon-plus bgimg-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="财务信息">
        <el-form
          label-position="top"
          v-model="formAddStore.financeForm"
          label-width="80px"
          :model="formAddStore.financeForm"
          :inline="true"
          class="basicForm"
          :rules="rules"
        >
          <el-form-item label="税号" prop="tax">
            <el-input v-model="formAddStore.financeForm.tax"></el-input>
          </el-form-item>
          <el-form-item label="发票抬头" prop="invoice">
            <el-input v-model="formAddStore.financeForm.invoice"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="Bank">
            <el-input v-model="formAddStore.financeForm.Bank"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="formAddStore.financeForm.bankAccount"></el-input>
          </el-form-item>
          <el-form-item label="佣金方式" prop="mode">
            <el-select v-model="formAddStore.financeForm.mode" placeholder="请选择佣金方式">
              <el-option
                v-for="item in feeTypesList"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抽成" prop="Royalty">
            <el-input v-model="formAddStore.financeForm.Royalty" placeholder="输入数字"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="签约信息">
        <el-form
          label-position="top"
          v-model="formAddStore.signingForm"
          label-width="80px"
          :model="formAddStore.signingForm"
          :inline="true"
          class="basicForm"
          :rules="rules"
        >
          <el-form-item label="签约时间" prop="time">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formAddStore.signingForm.time"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="合同编号" prop="CODE">
            <el-input v-model="formAddStore.signingForm.CODE"></el-input>
          </el-form-item>
          <el-form-item label="业务员" prop="salesman">
            <el-select v-model="formAddStore.signingForm.salesman" placeholder="请选择业务员">
              <el-option
                v-for="item in salesManList"
                :key="item.id"
                :label="item.nickname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remarks" class="remarks">
            <el-input v-model="formAddStore.signingForm.remarks"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item class="Submit-btn">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onResetting">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-show="showSubmmit" class="show-submmit">
      <p>
        <i class="el-icon-sold-out"></i>
      </p>
      <strong>商家资料提交成功</strong>
      <p>客户资料提交成功</p>
      <el-button type="primary" @click="goStore">返回列表</el-button>
      <el-button @click="goRevise">重新修改</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";

export default {
  data() {
    return {
      classList: [],
      categoriesList: [],
      feeTypesList: [],
      salesManList: [],
      formAddStore: {
        basicForm: {
          brandname: "",
          class: "",
          city: "",
          zipcode: "",
          username: "",
          job: "",
          phone: "",
          QQ: "",
          Emile: ""
        },
        detailForm: {
          adress: "",
          call: "",
          Fax: "",
          Website: "",
          data: "",
          categories: "",
          introduction: "",
          logoimageUrl: "",
          bgimageUrl: ""
        },
        financeForm: {
          tax: "",
          invoice: "",
          Bank: "",
          bankAccount: "",
          mode: "",
          Royalty: ""
        },
        signingForm: {
          time: "",
          CODE: "",
          salesman: "",
          remarks: ""
        }
      },
      rules: {
        brandname: [
          { required: true, message: "请输入商家名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11个字符", trigger: "blur" }
        ],
        Email: [
          { required: true, message: "请输入Email", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        class: [
          { required: true, message: "请选择所属商家", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择所属商家", trigger: "change" }
        ],
        adress: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        introduction: [
          { required: true, message: "请输入简介", trigger: "blur" },
          {
            min: 1,
            max: 1000,
            message: "长度在 2 到 1000 个字符",
            trigger: "blur"
          }
        ],
        call: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 7,
            max: 20,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        categories: [
          { required: true, message: "请选择品类", trigger: "change" }
        ],
        data: [{ required: true, message: "请选择时间", trigger: "change" }],
        mode: [{ required: true, message: "请选择方式", trigger: "change" }],
        tax: [
          { required: true, message: "请输入税号", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        invoice: [
          { required: true, message: "请输入发票抬头", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        Bank: [
          { required: true, message: "请输入开户银行", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        Royalty: [
          { required: true, message: "请输入提成", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        time: [{ required: true, message: "请选择时间", trigger: "change" }],
        CODE: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        salesman: [
          { required: true, message: "请输入业务员名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      showSubmmit: false
    };
  },
  mounted() {
    this.getShoptypes();
    this.getCategoriesList();
    this.getFeeTypes();
    this.getSalesMan();
  },
  methods: {
    // 获取商家类型
    async getShoptypes() {
      try {
        const ret = await api.getShoptypes();
        console.log(ret);
        if (ret.data.code == 200) {
          this.classList = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取商家品类
    async getCategoriesList() {
      const query = {
        module: "shop"
      };
      try {
        const ret = await api.getCategoriesList(query);
        console.log(ret);
        if (ret.data.code == 200) {
          this.categoriesList = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // getFeeTypes
    async getFeeTypes() {
      const query = {
        module: "shop"
      };
      try {
        const ret = await api.getFeeTypes(query);
        console.log(ret);
        if (ret.data.code == 200) {
          this.feeTypesList = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // getSalesMan
    async getSalesMan() {
      try {
        const ret = await api.getSalesMan();
        console.log(ret,'业务员');
        if (ret.data.code == 200) {
          console.log('业务员sss');
          this.salesManList = ret.data.data;

        }
      } catch (e) {
        console.log(e.message);
      }
    },
    //   logo
    handlelogoSuccess(res, file) {
      this.formAddStore.detailForm.logoimageUrl = res.data[0];
    },
    handlebgimgSuccess(res, file) {
      this.formAddStore.detailForm.bgimageUrl = res.data[0];
    },
    beforelogoUpload(file) {
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
    // 返回列表
    goStore() {
      this.$router.push({
        path: "/services-store"
      });
    },
    goRevise() {
      this.showSubmmit = false;
    },
    onSubmit() {
      this.showSubmmit = true;
      console.log(this.formAddStore);
    },
    onResetting() {
      formAddStore = {
        basicForm: {
          brandname: "",
          class: "",
          city: "",
          zipcode: "",
          username: "",
          job: "",
          phone: "",
          QQ: "",
          Emile: ""
        },
        detailForm: {
          adress: "",
          call: "",
          Fax: "",
          Website: "",
          data: "",
          type: "",
          introduction: "",
          logoimageUrl: "",
          bgimageUrl: ""
        },
        financeForm: {
          tax: "",
          invoice: "",
          Bank: "",
          bankAccount: "",
          mode: "",
          Royalty: ""
        },
        signingForm: {
          time: "",
          CODE: "",
          salesman: "",
          remarks: ""
        }
      };
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.store-add {
  font-size: 14px;
  position: relative;
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
  .basicForm {
    .el-form-item {
      width: 300px;
      margin-right: 85px;
      margin-bottom: 10px;
      .el-select {
        width: 300px;
      }
    }
    .el-form-item:nth-child(3n) {
      margin-right: 0;
    }
  }
  /deep/ .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .introduction {
    width: 688px !important;
    min-height: 160px;
  }
  .el-textarea {
    width: 688px;
    min-height: 160px;
    /deep/ textarea {
      min-height: 160px !important;
    }
  }
  //   上传文件
  .logoimage-uploader /deep/ .el-upload {
    border: 1px dashed #999;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .logoimage-uploader /deep/ .el-upload:hover {
    border-color: @color;
  }
  .logoimage-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .logoimage {
    width: 178px;
    height: 178px;
    display: block;
  }
  .bgimg-uploader /deep/ .el-upload {
    border: 1px dashed #999;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bgimg-uploader /deep/ .el-upload:hover {
    border-color: @color;
  }
  .bgimg-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 378px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .bgimg {
    width: 378px;
    height: 178px;
    display: block;
  }
  .remarks {
    width: 1070px;
    .el-input {
      width: 1070px;
      input {
        width: 1070px;
      }
    }
  }
  .Submit-btn {
    text-align: center;
    button {
      background-color: #999;
      color: #101010;
    }
    .el-button--primary {
      background-color: @color;
      color: #fff;
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


