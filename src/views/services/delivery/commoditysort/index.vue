<template>
  <div class="add-sort">
    <div class="title">
      <span></span>配送选择商品分类
    </div>
    <div class="sign">
      <el-steps :active="active" align-center>
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品规格"></el-step>
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
            @click="selectSort(index,item.name,item.id)"
          >{{ item.name }}</div>
        </div>
        <p>
          您当前选择的商品类别是:
          <span>{{ sortValue }}</span>
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
          <el-form-item label="商品分类" prop="type">
            <p>{{ this.sortValue }}</p>
          </el-form-item>
          <el-form-item label="商品图片" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.1.23:18899/sfy-resource/resource/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品图片" prop="imageUrlBig">
            <el-upload
              class="avatar-uploader-big"
              action="http://192.168.1.23:18899/sfy-resource/resource/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccessBig"
              :before-upload="beforeAvatarUploadBig"
            >
              <img v-if="ruleForm.imageUrlBig" :src="ruleForm.imageUrlBig" class="avatar-big">
              <i v-else class="el-icon-plus avatar-uploader-icon-big"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品介绍" prop="introduce">
            <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="商品销售价" prop="sellingprice">
            <el-input v-model="ruleForm.sellingprice"></el-input>
          </el-form-item>
          <el-form-item label="折扣" prop="discount">
            <el-input v-model="ruleForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="打包费" prop="packprice">
            <el-input v-model="ruleForm.packprice"></el-input>
          </el-form-item>
          <el-form-item label="计量单位" prop="metering">
            <el-select v-model="ruleForm.metering" placeholder="请选择计量单位">
              <el-option label="份" value="份"></el-option>
              <el-option label="克" value="克"></el-option>
              <el-option label="个" value="个"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="束" value="束"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="goSort">上一步,选择商品分类</el-button>
            <el-button type="primary" @click="goNorms">下一步,填写商品规格</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="showNorms" class="add-norms-box">
      <div>
        <div>
          <p>商品规格</p>
          <i class="iconfont icon-fenleizhedie"></i>
        </div>
      </div>
      <div>
        <div class="add-norms-btn">
          <div>
            <p @click="selectnormsBtn">选择商品规格</p>
          </div>
        </div>
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="规格名称" width="100"></el-table-column>
            <el-table-column prop="amount1" width="100" label="规格值 1"></el-table-column>
            <el-table-column prop="amount2" width="100" label="规格值 2"></el-table-column>
            <el-table-column prop="amount3" width="100" label="规格值 3"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-norms-btn">
          <div>
            <p @click="addpriceBtn">添加商品标价</p>
          </div>
        </div>
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="规格名称" width="100"></el-table-column>
            <el-table-column prop="amount1" width="100" label="规格值 1"></el-table-column>
            <el-table-column prop="amount2" width="100" label="规格值 2"></el-table-column>
            <el-table-column prop="amount3" width="100" label="规格值 3"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-norms-btn">
          <div>
            <p @click="addbatchingBtn">添加配料</p>
          </div>
        </div>
        <el-table :data="pricetableData" border style="width: 100%">
          <el-table-column prop="name" label="规格"></el-table-column>
          <el-table-column v-for="item in pricetable" :key="item.id" :label="item.value"></el-table-column>
        </el-table>
        <el-button @click="goBasic">上一步,填写商品信息</el-button>
        <el-button type="primary" @click="goSubmit">提交</el-button>
      </div>
      <div v-if="showAddnorms" class="addnorms-modal">
        <div>
          <p>选择商品规格</p>
          <div>
            <el-form :model="selectForm" label-width="80px">
              <el-form-item
                v-for="item in normList"
                :key="item.spec"
                :label="item.spec"
                class="norm-list"
              >
                <el-checkbox-group v-model="item.checkednorm" @change="handleCheckednormChange">
                  <el-checkbox v-for="val in item.values" :label="val" :key="val.id">{{ val.value }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onAddnormsSubmit">确认</el-button>
                <el-button @click="onAddnormsCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if="showAddPrice" class="addprice-modal">
        <div>
          <p>添加商品标价</p>
          <div>
            <span>规格选择:</span>
            <el-select v-model="optionsvalue" @change="selectNorms">
              <el-option v-for="item in normList" :key="item.id" :label="item.spec" :value="item"></el-option>
            </el-select>
          </div>
          <el-table :data="pricetableData" border style="width: 100%">
            <el-table-column prop="name" label="规格"></el-table-column>
            <el-table-column v-for="item in pricetable" :key="item.id" :label="item.value">
              <input v-model="item.price" type="text">
            </el-table-column>
          </el-table>
          <div style="text-align: right;">
            <el-button type="primary" @click="hendleAddprice">确定</el-button>
            <el-button @click="hendleCancelprice">取消</el-button>
          </div>
        </div>
      </div>
      <div v-if="showAddBatching" class="addprice-modal">
        <div>
          <p>添加商品配料</p>
          <div>
            <span style="margin-bottom: 20px;display:inline-block;">配料选择:</span>
            <el-checkbox-group v-model="checkedBatching" @change="handleCheckedBatchingChange">
              <el-checkbox v-for="val in batchingList" :label="val" :key="val.id">{{ val.name }}</el-checkbox>
            </el-checkbox-group>
            <div style="margin-top: 20px;text-align: right;">
              <el-button type="primary" @click="onAddBatchingSubmit">确认</el-button>
              <el-button @click="onAddBatchingCancel">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showSubmit" class="show-submmit">
      <p>
        <i class="el-icon-sold-out"></i>
      </p>
      <strong>商家资料提交成功</strong>
      <p>客户资料提交成功</p>
      <el-button type="primary" @click="goCommodity">返回列表</el-button>
      <el-button @click="goRevise">重新修改</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      active: 1,
      selectSortList: [{ name: "", id: 0 }],
      sortValue: "",
      sortId: "",
      productId: "",
      count: Number,
      showSort: true,
      showBasic: false,
      showNorms: false,
      showSubmit: false,
      // 基本信息
      ruleForm: {
        type: "",
        name: "",
        imageUrl: "",
        imageUrlBig: "",
        introduce: "",
        sellingprice: "",
        discount: "",
        packprice: "",
        metering: ""
      },
      rules: {
        imageUrl: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        imageUrlBig: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sellingprice: [
          { required: true, message: "请输入销售价格", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "请输入商品介绍", trigger: "blur" },
          { min: 1, max: 60, message: "长度在 1 到 60 个字符", trigger: "blur" }
        ]
      },
      showAddnorms: false,
      selectForm: {},
      normList: [],
      tableData: [
        {
          id: "12987122",
          name: "口味",
          values: ["甜辣", "微辣", "麻辣"],
          amount1: "甜辣",
          amount2: "微辣",
          amount3: "麻辣"
        },
        {
          id: "12987123",
          name: "容量",
          values: ["1L", "2L", "3L"],
          amount1: "1L",
          amount2: "2L",
          amount3: "3L"
        },
        {
          id: "12987124",
          name: "加料",
          values: ["红豆", "马蹄", "粉圆"],
          amount1: "红豆",
          amount2: "马蹄",
          amount3: "粉圆"
        }
      ],
      showAddPrice: false,
      showAddBatching: false,
      checkedBatching: [],
      batchingList: [],
      optionsvalue: "",
      pricetableData: [],
      pricetable: [],
      productItems: [],
      specList: [],
      parts: []
    };
  },
  mounted() {
    this.getCategoriesByShop();
  },
  methods: {
    // 设置配送商品
    async setGeneralProduct(options) {
      const query = {
        ...options,
        categoryId: this.sortId || "",
        description: this.ruleForm.introduce || "",
        discount: this.ruleForm.discount || "",
        packFee: this.ruleForm.packprice || "",
        pic: this.ruleForm.imageUrlBig || "",
        productName: this.ruleForm.name || "",
        remark: this.ruleForm.remarks || "",
        salePrice: this.ruleForm.sellingprice || "",
        thumbnailsUrl: this.ruleForm.imageUrl || "",
        unit: this.ruleForm.metering || ""
      };
      try {
        const ret = await api.setGeneralProduct(query);
        console.log(ret, "设置配送商品");
        if (ret.data.code == 200) {
          this.active = 3;
          this.showBasic = false;
          this.showNorms = true;
          this.productId = ret.data.data.id;
        } else {
          alert(ret.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取配送商品分类
    async getCategoriesByShop() {
      try {
        const ret = await api.getCategoriesByShop();
        console.log(ret, "获取配送商品分类");
        if (ret.data.code == 200 && ret.data.data) {
          this.selectSortList = ret.data.data;
        } else {
          alert(ret.data.message);
          this.selectSortList = [{ name: "", id: 0 }];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取规格列表
    async getSpecsByShopId() {
      const query = {
        shopId: 5
      };
      try {
        const ret = await api.getSpecsByShopId(query);
        console.log(ret, "获取规格列表");
        if (ret.data.code == 200 && ret.data.data) {
          let arr = ret.data.data;
          let newArr = arr.map(item => ({
            ...item,
            checkednorm: []
          }));
          this.normList = newArr;
        } else {
          this.normList = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取配料列表
    async getMyParts() {
      try {
        const ret = await api.getMyParts();
        console.log(ret, "获取配料列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.batchingList = ret.data.data;
        } else {
          this.batchingList = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 设置商品规格
    async setProductSpecs() {
      const query = {
        parts: this.parts,
        productId: this.productId,
        productItems: this.productItems,
        specList: this.specList
      };
      try {
        const ret = await api.setProductSpecs(query);
        console.log(ret, "设置规格信息");
        if (ret.data.code == 200) {
          this.active = 4;
          this.showSort = false;
          this.showBasic = false;
          this.showNorms = false;
          this.showSubmit = true;
          this.productItems = [];
          this.specList = [];
          this.parts = [];
        } else {
          alert(ret.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    handleCheckednormChange(val) {},
    selectSort(index, val, id) {
      this.count = index;
      this.sortValue = val;
      this.sortId = id;
    },
    goBasic() {
      this.active = 2;
      this.showSort = false;
      this.showBasic = true;
      this.showNorms = false;
    },
    // 基本信息
    handleAvatarSuccess(res, file) {
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
    handleAvatarSuccessBig(res, file) {
      this.ruleForm.imageUrlBig = res.data[0];
    },
    beforeAvatarUploadBig(file) {
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
    // 提交配送信息
    goNorms() {
      this.showBasic = false;
      this.showNorms = true;
      if (this.productId != "") {
        let query = {
          productId: this.productId
        };
        this.setGeneralProduct(query);
      } else {
        this.setGeneralProduct({});
      }
    },
    goSort() {
      this.active = 1;
      this.showSort = true;
      this.showBasic = false;
      this.showNorms = false;
    },
    goSubmit() {
      this.setProductSpecs();
    },
    goCommodity() {
      this.productId = "";
      this.$router.push({
        path: "/services-delivery"
      });
    },
    goRevise() {
      this.active = 3;
      this.showSort = false;
      this.showBasic = false;
      this.showNorms = true;
      this.showSubmit = false;
    },
    selectnormsBtn() {
      this.showAddnorms = true;
      this.getSpecsByShopId();
    },
    selectNorms(val) {
      this.optionsvalue = val.spec;
      this.pricetableData = [val];
      let arr = this.normList.filter(item => item.id === val.id);
      this.pricetable = arr[0].values.map(item => ({
        ...item,
        price: ""
      }));
    },
    addpriceBtn() {
      this.showAddPrice = true;
      this.getSpecsByShopId();
    },
    // 添加配料
    addbatchingBtn() {
      this.showAddBatching = true;
      this.getMyParts();
    },
    handleCheckedBatchingChange() {},
    // 添加商品标价确认
    hendleAddprice() {
      this.specList = [
        {
          id: this.pricetable[0].specId,
          spec: this.pricetable[0].specName,
          values: this.pricetable.map(item => {
            return {
              id: item.id,
              value: item.value
            };
          })
        }
      ];
      this.showAddPrice = false;
      this.pricetable = [];
    },
    hendleCancelprice() {
      this.showAddPrice = false;
      this.this.specList = [];
      this.pricetable = [];
    },
    // 选择规格确认
    onAddnormsSubmit() {
      this.productItems = this.normList.checkednorm.map(item => {
        return {
          specId: item.specId,
          specName: item.specName,
          valueId: item.id,
          valueName: item.value
        };
      });
      this.showAddnorms = false;
    },
    // 选择规格取消
    onAddnormsCancel() {
      this.productItems = [];
      this.showAddnorms = false;
    },
    // 选择配料确认
    onAddBatchingSubmit() {
      this.parts = this.checkedBatching.map(item => {
        return item.id;
      });
      this.showAddBatching = false;
    },
    // 选择配料取消
    onAddBatchingCancel() {
      this.showAddBatching = false;
      this.parts = [];
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
  //
  .avatar-uploader-big /deep/ .el-upload {
    border: 1px dashed #999;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-big .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon-big {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-big {
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
      padding: 60px 80px;
      box-sizing: border-box;
      .add-norms-btn {
        p {
          display: inline-block;
          background-color: @color;
          color: #fff;
          padding: 10px 10px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
      }
    }
    .addnorms-modal {
      z-index: 99;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(143, 143, 143, 0.5);
      > div {
        width: 800px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2px;
        p {
          padding: 16px 20px;
          box-sizing: border-box;
          background-color: #f1f1f1;
        }
      }
      .norm-list {
        margin-bottom: 0px;
      }
    }
    .addprice-modal {
      z-index: 99;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(143, 143, 143, 0.5);
      > div {
        width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2px;
        span {
          margin-right: 20px;
        }
        > div {
          padding: 20px;
          box-sizing: border-box;
        }
        p {
          padding: 16px 20px;
          box-sizing: border-box;
          background-color: #f1f1f1;
        }
        .el-input {
          width: 100px;
          height: 40px;
          /deep/ input {
            width: 100px;
            height: 40px;
          }
        }
      }
      .el-table {
        input {
          width: 80px;
          height: 32px;
          text-align: center;
          border: 1px solid #f1f1f1;
        }
      }
    }
  }
  .el-table--border {
    margin-bottom: 20px;
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


