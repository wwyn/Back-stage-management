<template>
  <div class="list">
    <div class="title">
      <span></span>服务商家订单管理
    </div>
    <el-form :inline="true" :model="storeForm" class="demo-form-inline">
      <el-form-item label="输入查询">
        <el-input v-model="storeForm.user" placeholder="用户名/姓名"></el-input>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-select v-model="storeForm.city" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家品类">
        <el-select v-model="storeForm.class" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-type">
        <p class="add" @click="handlerAddstore">添加</p>
      </div>
      <div class="shop-batch">
        <p @click="handleBatchLower">批量开通</p>
        <p @click="handleBatchLower">批量禁用</p>
        <p @click="handleBatchDel">批量删除</p>
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
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" label="商家名称" width="154" ></el-table-column>
      <el-table-column prop="brandName" label="所在地区" width="200" ></el-table-column>
      <el-table-column prop="brandName" label="商家品类" width="136"></el-table-column>
      <el-table-column prop="brandName" label="联系人" width="110"></el-table-column>
      <el-table-column prop="brandName" label="联系方式" width="130"></el-table-column>
      <el-table-column label="创建时间" width="156">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.createTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="upSelling" label="状态" width="90"></el-table-column>
      <el-table-column label="操作" width="148">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleRevisetable(scope.row)">编辑</el-button>
          <el-button @click="handleOpeningtable(scope.row)" type="text" size="small">开通</el-button>
          <el-button @click="handleProhibittable(scope.row)" type="text" size="small">禁用</el-button>
          <el-button @click="handleDeltable(scope.row)" type="text" size="small">删除</el-button>
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
      storeForm: {
        city: "",
        user: "",
        class:''
      },
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
    this.productList({ currentPage });
  },
  methods: {
    parseTime,
    // 批量设置商品列表
    async batchPart(data) {
      try {
        const ret = await api.batchPart(data);
        if (ret.data.code == 200) {
          this.productList({ currentPage: this.currentPage });
        } else {
          console.log("设置列表失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 列表
    async productList(params) {
      const query = {
        ...params,
        shopName: this.storeForm.title || "",
        productId: this.storeForm.ID || "",
        productName: this.storeForm.name || "",
        minPrice: this.storeForm.minMoney || "",
        maxPrice: this.storeForm.maxMoney || "",
        minSaleCount: this.storeForm.minNumber || "",
        maxSaleCount: this.storeForm.maxNumber || "",
        upSelling: "1",
        pageSize: 10
      };
      try {
        const ret = await api.productList(query);
        if (ret.data.code == 200 && ret.data.data) {
          this.loading = false;
          this.tableData = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 单个设置商品
    async setPart(query) {
      try {
        const ret = await api.setPart(query);
        if (ret.data.code == 200) {
          this.productList({ currentPage: this.currentPage });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 单个删除
    handleDeltable(options) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    //   this.brandDel({ id: options.id });
    },
    // 开通
    handleOpeningtable() {
        this.$confirm('是否为客户开通服务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '开通成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消开通'
          });          
        }); 
    },
     // 禁用
    handleProhibittable() {
        this.$confirm('是否为客户禁用服务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        }); 
    },

    // 搜索
    handleSearch(data) {
      const query = {
        currentPage: 1
      };
      this.productList(query);
    },
    // 重置
    resetForm() {
      this.storeForm = {
        city: "",
        user: "",
        class:''
      };
    },
    // 批量删除
    handleBatchDel() {
      const query = {
        productIds: this.productIdList,
        hide: "1"
      };
      this.batchPart(query);
    },
    // 批量下架
    handleBatchLower() {
      const query = {
        productIds: this.productIdList,
        upSelling: "0"
      };
      this.batchPart(query);
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
    // 编辑
    handleRevisetable(options) {
      this.$router.push({
        name: `servicesStoreAdd`,
        params: {
          id: options.id
        }
      });
    },
    // 添加
    handlerAddstore() {
      this.$router.push({
        name: "servicesStoreAdd"
      });
    },
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
    width: 220px;
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
  padding: 0 20px 0 0;
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
