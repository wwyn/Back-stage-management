<template>
  <div class="accountauthority">
    <div class="title">
      <span></span>权限设置
    </div>
    <div class="contant">
      <p>当前配置: 商家</p>
      <div>
        <div>
          <div>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAllbusiness"
              @change="handleCheckAllChangebusiness"
            >商家管理</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedmanagement" @change="handleCheckedmanagementChange">
              <el-checkbox
                v-for="business in management"
                :label="business"
                :key="business"
              >{{business}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-checkbox
              :indeterminate="isIndeterminateOrder"
              v-model="checkAllOrder"
              @change="handleCheckAllChangeOrder"
            >订单管理</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedOrder" @change="handleCheckedOrderChange">
              <el-checkbox v-for="item in order" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button style="margin-left: 47%;" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
const businessManagement = [
  "商品添加/编辑",
  "商品上架/下架",
  "分类添加/编辑",
  " 分类删除"
];
const orderManagement = [
  "商品添加/编辑",
  "商品上架/下架",
  "分类添加/编辑",
  " 分类删除"
];
export default {
  data() {
    return {
      checkAllbusiness: false,
      checkedmanagement: [],
      management: businessManagement,
      isIndeterminate: true,
      //
      checkAllOrder: false,
      checkedOrder: [],
      order: orderManagement,
      isIndeterminateOrder: true,
    };
  },
  methods: {
    handleCheckAllChangebusiness(val) {
      this.checkedmanagement = val ? businessManagement : [];
      this.isIndeterminate = false;
    },
    handleCheckedmanagementChange(value) {
      let checkedCountbusiness = value.length;
      this.checkAllbusiness = checkedCountbusiness === this.management.length;
      this.isIndeterminate =
        checkedCountbusiness > 0 &&
        checkedCountbusiness < this.management.length;
    },
    //
    handleCheckAllChangeOrder(val) {
      this.checkedOrder = val ? orderManagement : [];
      this.isIndeterminateOrder = false;
    },
    handleCheckedOrderChange(value) {
      let checkedCountorder = value.length;
      this.checkAllOrder = checkedCountorder === this.order.length;
      this.isIndeterminateOrder =
        checkedCountorder > 0 &&
        checkedCountorder < this.order.length;
    },
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.accountauthority {
  font-size: 14px;
  position: relative;
  color: #101010;
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
  .contant {
    border: 1px solid #999;
    margin-bottom: 10px;
    > p {
      background-color: #f1f1f1;
      border-bottom: 1px solid #999;
      padding: 20px;
      box-sizing: border-box;
    }
    > div {
      padding: 30px;
      box-sizing: border-box;
      > div {
        > div {
          padding: 20px;
          border: 1px solid #999;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>


