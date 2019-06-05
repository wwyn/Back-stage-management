<template>
  <div class="list">
    <div class="title">
      <span></span>服务券码订单管理
    </div>
    <div class="storetype">
      <div
        v-for="(item,index) in storetype"
        :key="index"
        :class="{active:count===index}"
        @click="hendleType(index)"
      >{{ item.name }}({{item.number}})</div>
    </div>
    <el-form :inline="true" :model="storeForm" class="demo-form-inline">
      <el-form-item label="输入搜索">
        <el-input v-model="storeForm.code" placeholder="订单编号/商品货号"></el-input>
      </el-form-item>
      <el-form-item label="用户">
        <el-input v-model="storeForm.consignee" placeholder="用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户手机号">
        <el-input v-model="storeForm.consigneeMobile" placeholder="用户手机号"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="storeForm.beginTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-batch">
        <p @click="handleBatchLower">批量关闭</p>
        <p @click="handleBatchDel">批量删除</p>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :data="tableCouponData"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单编号" width="150" align="center"></el-table-column>
      <el-table-column label="提交时间" width="170" align="center">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.createTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="consigneeMobile" label="用户账号" width="140" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="订单金额" width="90" align="center"></el-table-column>
      <el-table-column prop="payName" label="支付方式" width="90" align="center">
        <template slot-scope="scope">
          <p>{{ payStatus[scope.row.payStatus] }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="payStatus" label="支付状态" width="90" align="center"></el-table-column>
      <el-table-column prop="orderSource" label="订单来源" width="90" align="center"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="90" align="center">
        <template slot-scope="scope">
          <p>{{ orderStatus[scope.row.orderStatus] }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleLooktable(scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>
<script>
import * as api from "@/api";
import { parseTime } from "@/utils";
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      storetype: [
        { name: "全部商品", number: 10000 },
        { name: "待付款", number: 10000 },
        { name: "已消费", number: 10000 },
        { name: "已完成", number: 10000 },
        { name: "已取消", number: 10000 },
        { name: "已退款", number: 10000 }
      ],
      count: 0,
      storeForm: {
        caode: "",
        consignee: "",
        consigneeMobile: "",
        beginTime: ""
      },
      tableCouponData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      productIdList: [],
      loading: true,
      payStatus: {
        "-1": "无效",
        "0": "待支付",
        "1": "部分支付",
        "2": "已支付"
      },
      orderStatus: {
        "-1": "无效",
        "0": "已创建",
        "5": "已确认",
        "10": "已支付",
        "13": "商户确认",
        "15": "已发货",
        "20": "已完成",
        "25": "已取消",
        "30": "退款中",
        "35": "已退款"
      }
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.getOrderList({ currentPage, mode: 0 });
  },
  methods: {
    parseTime,
    // 批量设置商品列表
    async batchPart(data) {
      try {
        const ret = await api.batchPart(data);
        if (ret.data.code == 200) {
          this.getOrderList({ currentPage: this.currentPage });
        } else {
          console.log("设置列表失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 列表
    async getOrderList(params) {
      const query = {
        ...params,
        shopId: 5,
        orderType: "virtual",
        consignee: this.storeForm.consignee || "",
        c: this.storeForm.consigneeMobile || "",
        beginTime: this.storeForm.beginTime || "",
        orderNo: this.storeForm.code || "",
        pageSize: 10
      };
      try {
        const ret = await api.getOrderList(query);
        console.log(ret, "券码订单列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.loading = false;
          this.tableCouponData = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        } else {
          this.loading = false;
          this.tableCouponData = [];
          this.total = 0;
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    hendleType(index) {
      this.count = index;
      switch (index) {
        case 0:
          this.getOrderList({ currentPage: 1, mode: 0 });
          break;
        case 1:
          this.getOrderList({ currentPage: 1, mode: 1 });
          break;
        case 2:
          this.getOrderList({ currentPage: 1, mode: 2 });
          break;
        case 3:
          this.getOrderList({ currentPage: 1, mode: 3 });
          break;
        case 4:
          this.getOrderList({ currentPage: 1, mode: 4 });
          break;
        case 5:
          this.getOrderList({ currentPage: 1, mode: 5 });
          break;
        case 6:
          this.getOrderList({ currentPage: 1, mode: 6 });
          break;
      }
    },

    // 搜索
    handleSearch(data) {
      const query = {
        currentPage: 1
      };
      this.getOrderList(query);
    },
    // 重置
    resetForm() {
      this.storeForm = {
        caode: "",
        consignee: "",
        consigneeMobile: "",
        beginTime: ""
      };
    },
    // 批量关闭订单
    handleBatchLower() {},
    // 批量删除
    handleBatchDel() {
      const query = {
        productIds: this.productIdList,
        hide: "1"
      };
      this.batchPart(query);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.productList({ currentPage: val });
    },
    // 查看订单
    handleLooktable(options) {
      this.$router.push({
        name: `servicesOrderCouponDetail`,
        params: {
          orderNo: options.orderNo
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.list {
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
  .storetype {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 20px;
    > div {
      border: 1px solid #999;
      margin: 10px 10px 20px 0;
      padding: 6px 10px;
      border-radius: 2px;
    }
    .active {
      background-color: @color;
      color: #fff;
      border: 1px solid @color;
    }
  }
  .shop-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        width: 110px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        background-color: @color;
      }
      .add {
        color: #fff;
        border-radius: 2px;
      }
    }
    .shop-batch {
      p {
        width: 84px;
        height: 34px;
        line-height: 34px;
        background-color: #f1f1f1;
        margin-right: 10px;
      }
    }
  }
  .el-input {
    width: 220px;
    height: 40px;
    margin-right: 20px;
  }
  .el-date-editor {
    width: 220px !important;
    height: 40px;
    margin-right: 20px;
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .el-form-item__content {
    .el-button {
      background-color: @color;
      color: #fff;
    }
    .el-button:nth-child(2) {
      background-color: #999 !important;
      color: #fff;
    }
  }

  .el-select {
    margin-right: 20px;
  }
}
//   更改表格样式部分
/deep/ .table-i {
  font-size: 12px;
  margin-right: 24px;
}
/deep/ .el-table td,
.el-table th.is-leaf {
  padding: 0;
}
/deep/ .el-table th > .cell {
  padding: 0;
  font-size: 14px;
  color: #101010;
}
/deep/ .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: none;
}
/deep/ .el-table--border,
.el-table--group {
  border: none;
}
/deep/ .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-table--border th,
.el-table__fixed-right-patch {
  height: 40px !important;
  background: #f1f1f1;
}
.el-table th,
/deep/ .el-table tr {
  height: 40px;
  padding: 0;
}
</style>
