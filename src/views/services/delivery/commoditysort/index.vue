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
            @click="selectSort(index,item.name)"
          >{{ item.name }}</div>
        </div>
        <p>
          您当前选择的饮品是:
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
          <el-form-item label="商品分类" prop="name">
            <p>{{ this.sortValue }}</p>
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
          <el-form-item label="商品介绍" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品销售价" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="折扣" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="打包费" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="计量单位" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="name">
            <el-input type="textarea" v-model="ruleForm.name"></el-input>
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
            <p @click="addpriceBtn('标价')">添加商品标价</p>
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
            <p @click="addpriceBtn('加价')">添加规格加价</p>
          </div>
        </div>
        <el-table :data="pricetableData" border style="width: 100%">
          <el-table-column prop="name" label="规格"></el-table-column>
          <el-table-column v-for="item in pricetable" :key="item" :label="item"></el-table-column>
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
                v-for="item in citiesList"
                :key="item.name"
                :label="item.name"
                class="cities-list"
              >
                <el-checkbox-group v-model="item.checkedCities">
                  <el-checkbox v-for="val in item.children" :label="val" :key="val">{{val}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button>取消</el-button>
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
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-table :data="pricetableData" border style="width: 100%">
            <el-table-column prop="name" label="规格"></el-table-column>
            <el-table-column v-for="item in pricetable" :key="item" :label="item">
              <input type="text">
            </el-table-column>
          </el-table>
          <div style="text-align: right;">
            <el-button type="primary" @click="hendleAddprice">确定</el-button>
            <el-button @click="hendleCancelprice">取消</el-button>
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
import { debug } from "util";
export default {
  data() {
    return {
      active: 1,
      selectSortList: [
        { name: "蔬菜", id: 0 },
        { name: "水果", id: 1 },
        { name: "海鲜", id: 2 },
        { name: "零食", id: 3 }
      ],
      sortValue: "",
      count: Number,
      showSort: true,
      showBasic: false,
      showNorms: false,
      showSubmit: false,
      // 基本信息
      imageUrl: "",
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      showAddnorms: false,
      selectForm: {},
      citiesList: [
        { name: "上海", children: ["闵行", "浦东", "宝山"], checkedCities: [] },
        { name: "北京", children: ["闵行", "浦东", "宝山"], checkedCities: [] }
      ],
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
      options: [
        {
          value: "12987122",
          label: "口味"
        },
        {
          value: "12987123",
          label: "容量"
        },
        {
          value: "12987124",
          label: "加料"
        }
      ],
      optionsvalue: "",
      pricetableData: [
        {
          id: "12987123",
          name: "价格",
          amount1: "1L",
          amount2: "2L",
          amount3: "3L"
        }
      ],
      pricetable: []
    };
  },
  methods: {
    selectSort(index, val) {
      this.count = index;
      this.sortValue = val;
    },
    goBasic() {
      this.active = 2;
      this.showSort = false;
      this.showBasic = true;
      this.showNorms = false;
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
    goNorms() {
      this.active = 3;
      this.showBasic = false;
      this.showNorms = true;
    },
    goSort() {
      this.active = 1;
      this.showSort = true;
      this.showBasic = false;
      this.showNorms = false;
    },
    goSubmit() {
      this.active = 4;
      this.showSort = false;
      this.showBasic = false;
      this.showNorms = false;
      this.showSubmit = true;
    },
    goCommodity() {
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
    },
    selectNorms(val) {
      let arr = this.tableData.filter(item => item.id === val);
      this.pricetable = arr[0].values;
    },
    addpriceBtn(val) {
      this.showAddPrice = true;
    },
    hendleAddprice() {
      this.showAddPrice = false;
      this.pricetable = [];
    },
    hendleCancelprice() {
      this.showAddPrice = false;
      this.pricetable = [];
    },
    onSubmit() {
      this.showAddnorms = false;
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
      .cities-list {
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


