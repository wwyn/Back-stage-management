<template>
  <div class="list">
    <div class="title">
      <span></span>账户管理
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="输入搜索">
        <el-input v-model="formInline.user" placeholder="用户名/姓名"></el-input>
      </el-form-item>
      <el-form-item label="所属商家">
        <el-select v-model="formInline.business" placeholder="请选择商家">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.shopName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询结果</el-button>
        <el-button style="background-color: #999;border: none" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-type">
        <p class="add" @click="handlerAddaccount">添加</p>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :data="tableData"
      border
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
      <el-table-column type="index" label="序号" width="54" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="140" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="140" align="center"></el-table-column>
      <el-table-column prop="shopName" label="所属商家" width="120" align="center"></el-table-column>
      <el-table-column label="添加时间" width="180" align="center">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.createTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column label="最后登录" width="180" align="center">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.updateTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="enabled" label="是否禁用" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.enabled.toString()"
            active-value="1"
            inactive-value="0"
            active-color="#1260fb"
            @change="checkEnabled($event,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAuthority(scope.row)">权限设置</el-button>
          <el-button type="text" size="small" @click="handleRevisetable(scope.row)">编辑</el-button>
          <!-- <el-button @click="handleDeltable(scope.row)" type="text" size="small">删除</el-button> -->
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
      formInline: {
        business: "",
        user: ""
      },
      shopList: [],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      productIdList: [],
      loading: true
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.getSysUserList({ currentPage });
    this.getShopList();
  },
  methods: {
    parseTime,
    // 系统用户列表
    async getSysUserList(params) {
      const query = {
        ...params,
        pageSize: 10,
        sysUserName: this.formInline.user || "",
        accountNumber: "",
        shopId: this.formInline.business || ""
      };
      try {
        const ret = await api.getSysUserList(query);
        if (ret.data.code == 200 && ret.data.data) {
          this.loading = false;
          this.tableData = ret.data.data.records;
          this.total = ret.data.data.totalCount;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取商家列表
    async getShopList() {
      const query = {};
      try {
        const ret = await api.getShopList(query);
        if (ret.data.code == 200 && ret.data.data) {
          this.shopList = ret.data.data.pageData;
        } else {
          this.shopList = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 单个设置商品
    async setEnabled(query) {
      try {
        const ret = await api.setEnabled(query);
        if (ret.data.code == 200) {
          this.getSysUserList({ currentPage: this.currentPage });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    checkEnabled(val,options) {
      const query = {
        userId: options.id,
        enabled: +val
      };
      this.setEnabled(query);
    },
    // 搜索
    handleSearch(data) {
      const query = {
        currentPage: 1
      };
      this.getSysUserList(query);
    },
    // 重置
    resetForm() {
      this.formInline = {
        business: "",
        user: ""
      };
      this.getSysUserList({ currentPage: 1 });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.productList({ currentPage: val });
    },
    // 单个下架
    handleupSelling(type) {
      let query = {
        productId: type.id,
        upSelling: "0"
      };
      this.setPart(query);
    },
    // 单个删除
    handleDel(content) {
      let query = {
        productId: content.id,
        hide: "1"
      };
      this.setPart(query);
    },
    // 权限设置
    handleAuthority(options) {
       this.$router.push({
        name: "servicesAccountauthority",
         params: {
          id: options.id
        }
      });
    },
    // 添加
    handlerAddaccount() {
      this.$router.push({
        name: "servicesAddaccount"
      });
    },
    // 修改
    handleRevisetable(options) {
      this.$router.push({
        name: "servicesAddaccount",
        params: {
          id: options.id
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
        margin-left: 10px;
      }
    }
  }
  .el-input {
    width: 270px;
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
  // padding: 0 20px 0 0;
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
