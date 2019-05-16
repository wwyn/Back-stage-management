<template>
  <div class="publish">
    <div class="title">
      <span></span>商品发布
    </div>
    <div class="category-title">
      已选类目:
      <span v-if="selected.length<1">无</span>
      <span v-for="(item,index) in selected" :key="index">
        <span>{{ item }}</span>
        <span v-if="index<2">></span>
      </span>
      <span v-if="selected.length<1">（点击下方类目表选择您要发布商品的类目）</span>
    </div>
    <!-- <el-cascader
      :props="props"
      :options="categoryList"
      class="cascader"
      filterable
      @change="handleChange"
    ></el-cascader>-->
    <div class="selection-box">
      <div>
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="typeName1" @blur="searchOne"></el-input>
        <div
          v-for="(item,index) in categoryList"
          :class="count1==index?'active':''"
          :key="index"
          @click="handleSelectOne(index,item)"
        >
          <p>{{ item.typeName }}</p>
          <i v-if="item.subclass.length>0" class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div>
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="typeName2"></el-input>
        <div
          v-for="(item,index) in (categoryList[count1] || { subclass: [] }).subclass"
          :key="index"
          :class="count2==index?'active':''"
          @click="handleSelectTwo(index,item)"
        >
          <p>{{ item.typeName || '' }}</p>
          <i v-if="item.subclass.length>0" class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div>
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="typeName3"></el-input>
        <div
          v-for="(item,index) in ((categoryList[count1] || { subclass: [] }).subclass[count2] || { subclass: [] }).subclass"
          :key="index"
          :class="count3==index?'active':''"
          @click="handleSelectThree(index,item)"
        >
          <p>{{ item.typeName || '' }}</p>
          <i v-if="item.subclass.length>0" class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="publish-btn">
      <el-button @click="cancelPublish">取消</el-button>
      <el-button type="primary" @click="goPublish" :disabled="disabled" :class="disabled?'':'disabled'">下一步,发布商品</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
  function init(arr) {
    arr.forEach(item => {
        if (!item.subclass) {
            item.subclass = [];
            return;
        }
        init(item.subclass)
    });
}
export default {
  data() {
    return {
      selected: [],
      categoryList: [],
      props: {
        label: "typeName",
        value: "id",
        children: "subclass"
      },
      typevals: [],
      count1: Number,
      count2: Number,
      count3: Number,
      typeName1:'',
      typeName2:'',
      typeName3:'',
      disabled: true,
    };
  },
  
  mounted() {
    this.typeList();
  },
  methods: {
    // 获取品牌类目
    async typeList() {
      const query = {};
      try {
        const ret = await api.typeList(query);
        const data = ret.data.data;
        init(data);
        this.categoryList = data;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 一级选择
    handleSelectOne(index, item) {
      this.count1 = index;
      this.selected = [];
      this.typevals = [];
      this.selected.push(item.typeName);
      this.typevals.push(item.id);
      this.disabled = false;
    },

    // 二级选择
    handleSelectTwo(index, item) {
      this.count2 = index;
      if (this.selected.length > 1) {
        this.selected.splice(1, 1);
        this.typevals.splice(1, 1);
      }
      this.selected.push(item.typeName);
      this.typevals.push(item.id);
    },
    // 三级选择
    handleSelectThree(index, item) {
      this.count3 = index;
      if (this.selected.length > 2) {
        this.selected.splice(2, 1);
        this.typevals.splice(2, 1);
      }
      this.selected.push(item.typeName);
      this.typevals.push(item.id);
    },
    //一级搜索
    searchOne() {
      console.log(this.typeName1)
    },
    // 选择类目
    // handleChange(value) {
    //   this.selected = [];
    //   this.typevals = [];
    //   value.reduce((arr, item) => {
    //     const target = arr.find(t => t.id === item);
    //     this.selected.push(target.typeName);
    //     this.typevals.push(target.id);
    //     return target.subclass;
    //   }, this.categoryList);
    // },
    // 取消选择
    cancelPublish() {
      this.selected = [];
      this.typevals = [];
    },
    // 下一步
    goPublish() {
      window.localStorage.setItem(
        "typeid",
        JSON.stringify({
          typeval: this.typevals.pop(),
          selected: this.selected
        })
      );
      this.$router.push({
        name: "eCommerceCommodity"
      });
    }
  }
};
</script>
<style lang="less">
@color: #1260fb;

.publish {
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
  .category-title {
    height: 60px;
    border: 1px solid #999999;
    border-radius: 2px;
    line-height: 60px;
    padding-left: 30px;
    box-sizing: border-box;
    span {
      color: @color;
      margin-left: 6px;
    }
  }

  // 搜索框
  /deep/ .el-cascader.cascader {
    .el-cascader__label {
      width: 1070px;
    }
    .el-input {
      width: 1070px;
    }
  }
  .publish-btn {
    text-align: center;
    margin: 60px auto 0;
    .disabled {
      background-color: @color !important;
    }
  }
  .el-button {
    background: #f1f1f1;
    border-radius: 2px;
  }
  .el-button + .el-button {
    margin-left: 26px;
    background-color: #999;
  }
  //选择框
  .selection-box {
    .active {
      background: #F1F1F1;
      i {
        color: @color;
      }
    }
    width: 1070px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #999;
    height: 457px;
    margin-top: 20px;
    box-sizing: border-box;
    > div {
      width: 33.333%;
      border-right: 1px solid #999;
      height: 100%;
      padding-top: 29px;
      box-sizing: border-box;
      .el-input {
        margin-bottom: 30px;
        height: 36px;
        border: 1px solid #999999;
        border-radius: 2px;
        padding: 0;
        margin: 0 29px 30px;
        width: 298px;
        input {
        border: none;
        height: 34px;
        }
        /deep/ .el-input__icon {
          line-height: 36px;
        } 
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        padding: 0 30px;
        box-sizing: border-box;
      }
    }
    > div:nth-child(3) {
      border-right: none;
    }
  }
}
</style>


