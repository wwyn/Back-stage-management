<template>
  <div class="order">
    <div class="title">
      <span></span>品牌订单
    </div>
    <el-form :inline="true" :model="formInline" ref="formInline" class="classform">
      <el-form-item label="订单编号" prop="code">
        <el-input v-model="formInline.code" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品标题" prop="title" class="input-one">
        <el-input v-model="formInline.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="name" class="input-one">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" class="input-two">
        <el-input v-model="formInline.minMoney" placeholder="￥"></el-input>
        <span>-</span>
        <el-input v-model="formInline.maxMoney" placeholder="￥"></el-input>
      </el-form-item>
      <el-form-item label="成交时间" class="input-two input-one">
        <el-input v-model="formInline.minTime" placeholder="请输入"></el-input>
        <span>-</span>
        <el-input v-model="formInline.maxTime" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="query">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="resetForm('formInline')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-type">
        <p
          v-for="(item,index) in orderStatus"
          :key="index"
          :class="orderIndex == index?'active':''"
          @click="selectOrderStatus(index)"
        >{{ item }}</p>
      </div>
      <div>共计{{ this.total }}笔</div>
    </div>
    <!-- <el-table
      :data="tableData"
      :row="tableData"
      style="width: 100%"
      row-key="id"
      >
      <el-table-column prop="productName" label="商品订单">
        <template slot-scope="scope">
          <div class="shop-box">
            <div class="shop-img">
              <img :src="scope.row.thumbnailsUrl" alt>
            </div>
            <div class="shop-content">
              <p>{{ scope.row.productName }}</p>
              <p>{{ scope.row.shopName }}</p>
              <p>{{ scope.row.shopId }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="价格" width="108"></el-table-column>
      <el-table-column prop="stock" label="数量" width="94"></el-table-column>
      <el-table-column prop="consignee" label="买家" width="94"></el-table-column>
      <el-table-column prop="saleCount" label="订单状态" width="94"></el-table-column>
      <el-table-column prop="saleCount" label="实收款" width="120">
          <template slot-scope="scope">
            <p>$111</p>
            <p>含快递费(10.00)</p>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="118">
        <template slot-scope="scope">
          <el-button @click="handleEditor(scope.row)" type="text" size="small">改价</el-button>
          <el-button @click="handleupSelling(scope.row)" type="text" size="small">取消</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <div class="table-type flex">
      <p>商品订单</p>
      <p>单价</p>
      <p>数量</p>
      <p>买家</p>
      <p>订单状态</p>
      <p>实收款</p>
      <p>操作</p>
    </div>
    <div class="table" v-for="(item,index) in tableData" :key="index">
      <div class="table-title flex">
        <p>订单编号: {{ item.orderNo }}</p>
        <p>创建时间: {{ parseTime(item.createTime) }}</p>
      </div>
      <div class="table-contant-box">
        <div class="table-contant" v-for="(val,index2) in item.orderItems" :key="index2" >
          <div class="table-contant-img flex">
            <img :src="val.thumbnailsUrl" alt>
            <div>
              <p>{{ val.price }}</p>
              <p>{{ val.spec }}</p>
            </div>
          </div>
          <div class="salePrice">{{ val.price }}</div>
          <div class="saleCount">{{ val.quantity }}</div>
          <div v-if="index2<1" class="consignee">{{ item.consignee }}</div>
          <div v-if="index2<1" class="status">{{ `${item.orderStatus == 1?'待付款':''}` }}</div>
          <div v-if="index2<1" class="table-contant-money">
            <p>{{ item.deliverFee }}</p>
            <p>(含快递费10)</p>
          </div>
          <div v-if="index2<1" class="operation flex">
            <p>改价</p>
            <p>取消</p>
            <p>查看</p>
          </div>
        </div>
      </div>
    </div>
    <pagination :page-size="pageSize" :current-page="currentPage" :total="total" @handleCurrentChange="handleCurrentChange" ></pagination>
  </div>
</template>
<script>
import * as api from "@/api";
import { parseTime } from "@/utils";
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      formInline: {
        code: "",
        title: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        minTime: "",
        maxTime: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      orderStatus: [
        "待付款",
        "待发货",
        "已发货",
        "退款中",
        "待评价",
        "已完成",
        "已关闭"
      ],
      orderIndex: 0
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.getOrderList({ currentPage });
  },
  methods: {
    parseTime,
    // 获取订单列表
    async getOrderList(query) {
      const options = {
        pageSize: 15,
        shopId: 1
      };
      try {
        let ret = await api.getOrderList(options);
        if (ret.data.code == 200) {
          this.tableData = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 选择订单状态
    selectOrderStatus(index) {
      this.orderIndex = index;
    },

    // 搜索
    handleSearch() {
      const query = {
        currentPage: 1
      };
      this.getOrderList(query);
    },
    // 重置
    resetForm() {
      this.formInline = {
        code: "",
        title: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        minTime: "",
        maxTime: ""
      };
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList({ currentPage: val });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.order {
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
  .shop-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        width: 110px;
        height: 42px;
        text-align: center;
        line-height: 42px;
      }
    }
    .shop-type {
      .active {
        background-color: #F1F1F1;
      }
    }
    .shop-batch {
      p {
        width: 84px;
        height: 34px;
        line-height: 34px;
        background-color: #F1F1F1;
        margin-left: 10px;
      }
    }
  }
  .el-input {
    width: 270px;
    height: 40px;
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .classform {
    .input-one {
      margin-left: 28px;
    }
    .input-two {
      .el-input {
        width: 120px;
        height: 40px;
      }
      span {
        margin: 0 10px;
      }
    }
    .el-radio-group {
      margin-bottom: 22px;
    }
  }
  .el-select {
    margin-right: 20px;
  }
  /deep/ .el-table .cell {
    padding: 0 !important;
    .el-button {
      color: @color;
      text-align: center;
      margin-right: 10px;
    }
  }
  /deep/ .el-table_1_column_1.is-leaf {
    padding-left: 20px !important;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
  .shop-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .shop-img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      margin-left: 20px;
      img {
        width: 80px;
        height: 80px;
        vertical-align: middle;
      }
    }
    .shop-content {
      font-size: 13px;
      color: #333333;
      height: 80px;
      p:nth-child(1) {
        color: @color;
      }
      p:nth-child(2) {
        margin: 4px 0;
      }
    }
  }
  // 搜索
  .query {
    position: absolute;
    right: 0;
    .el-button {
      width: 80px;
      background: #f1f1f1;
      border: 1px solid #999999;
      border-radius: 2px;
      height: 40px;
      color: #010101;
    }
    .el-button--primary {
      margin-right: 20px;
    }
  }

  // table列表
  .table-type {
    height: 40px;
    background: #F1F1F1;
    font-size: 14px;
    color: #101010;
    padding: 0 20px;
    box-sizing: border-box;
    p:nth-child(1) {
      width: 410px;
    }
    p:nth-child(2) {
      width: 108px;
    }
    p:nth-child(3) {
      width: 94px;
    }
    p:nth-child(4) {
      width: 94px;
    }
    p:nth-child(5) {
      width: 94px;
    }
    p:nth-child(6) {
      width: 120px;
    }
  }
  .table {
    padding: 16px 20px;
    box-sizing: border-box;
    .table-title {
      margin-bottom: 10px;
      color: #333333;
      p:nth-child(2) {
        margin-left: 20px;
      }
    }
    .table-contant-box {
      border-bottom: 1px solid rgba(232, 232, 232, 0.5);
      .table-contant {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding-bottom: 16px;
        .table-contant-img {
          width: 410px;
          min-width: 410px;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
            margin-right: 10px;
            border: 1px solid @color;
          }
          div {
            height: 80px;
            p {
              margin-top: 4px;
            }
            p:nth-child(1) {
              margin-top: 0px;
              color: @color;
            }
          }
        }
        .salePrice {
          width: 108px;
          min-width: 108px;
          color: #eb001d;
        }
        .saleCount {
          width: 94px;
          min-width: 94px;
        }
        .consignee {
          width: 94px;
          min-width: 94px;
        }
        .status {
          width: 94px;
          min-width: 94px;
        }
        .table-contant-money {
          width: 120px;
          min-width: 120px;
          p:nth-child(1) {
            color: #EB001D;
          } 
          p:nth-child(2) {
            font-size: 13px;
            color: #2A2A2A;
            margin-left: 4px;
          }
        }
        .operation {
          position: absolute;
          right: -10px;
          p {
            margin-right: 12px;
          }
          p:nth-child(3) {
            margin-right: 0;
          }
          color: @color;
          width: 118px;
        }
      }
    }
  }
}
</style>
