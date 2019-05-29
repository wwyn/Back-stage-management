<template>
  <div class="list">
    <div class="title">
      <span></span>商家管理
    </div>
    <el-form :inline="true" :model="storeForm" class="demo-form-inline">
      <el-form-item label="输入查询">
        <el-input v-model="storeForm.user" placeholder="商家名称/联系人"></el-input>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-cascader :props="newProps" :options="cityList" v-model="storeForm.city" @change="handleCityChange"></el-cascader>
      </el-form-item>
      <el-form-item label="商家品类">
        <el-select v-model="storeForm.class" placeholder="全部">
          <el-option
            v-for="item in categoriesList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          ></el-option>
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
        <p @click="handleOpen">批量开通</p>
        <p @click="handleProhibit">批量禁用</p>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="shopName" label="商家名称" width="154"></el-table-column>
      <el-table-column prop="addressDetail" label="所在地区" width="200"></el-table-column>
      <el-table-column prop="brandName" label="商家品类" width="136"></el-table-column>
      <el-table-column prop="contact" label="联系人" width="110"></el-table-column>
      <el-table-column prop="mobile" label="联系方式" width="130"></el-table-column>
      <el-table-column label="创建时间" width="156">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.createTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <p>{{ scope.row.status == 1?'待开通':scope.row.status == 2?'已开通':'已禁用' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="148">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleRevisetable(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status != 2" @click="handleOpeningtable(scope.row)" type="text" size="small">开通</el-button>
          <el-button v-if="scope.row.status == 2" @click="handleProhibittable(scope.row)" type="text" size="small">禁用</el-button>
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
      newProps:{
        value: 'id',
        label:'name',
        children: 'subclass'
      },
      cityList:[],
      storeForm: {
        city: [],
        user: "",
        class: ""
      },
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      shopIds: [],
      loading: true,
      categoriesList: []
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.getShopList({ currentPage });
    this.getCategoriesList();
    this.geoList();
  },
  methods: {
    parseTime,
    // 获取地区
    async geoList() {
      const query = {
        levelType: 2
      };
      try {
        const ret = await api.geoList(query);
        console.log(ret);
        if (ret.data.code == 200) {
          this.cityList = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    handleCityChange(val) {
      console.log(val)
    },
    // 批量设置商品列表
    async shopBatchChecked(data) {
      try {
        const ret = await api.shopBatchChecked(data);
        if (ret.data.code == 200) {
          this.getShopList({ currentPage: this.currentPage });
        } else {
          console.log("设置列表失败");
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
    // 商户列表
    async getShopList(params) {
      const query = {
        ...params,
        name: this.storeForm.user || "",
        categoryId: this.storeForm.class || "",
        pageSize: 10
      };
      try {
        const ret = await api.getShopList(query);
        console.log(ret);
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
    // 删除商户
    async shopDel(query) {
      try {
        const ret = await api.shopDel(query);
        console.log(ret);
        if (ret.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getShopList({ currentPage: this.currentPage });
        } else {
          alert("商户删除失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 单个开通或者禁用
    async shopChecked(query) {
      try {
        const ret = await api.shopChecked(query);
        if (ret.data.code == 200) {
          this.getShopList({ currentPage: this.currentPage });
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    // 多选
    handleSelectionChange(val) {
      let arr = val.map(item => {
        return item.id
      })
      console.log(arr)
      this.shopIds = arr;
    },
    // 单个删除
    handleDeltable(options) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.shopDel({ id: options.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 单个开通
    handleOpeningtable(options) {
      this.$confirm("是否为客户开通服务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let query = {
            shopId: options.id,
            checked: 2
          }
          this.shopChecked(query)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消开通"
          });
        });
    },
    // 单个禁用
    handleProhibittable(options) {
      this.$confirm("是否为客户禁用服务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let query = {
            shopId: options.id,
            checked: 3
          }
          this.shopChecked(query)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消禁用"
          });
        });
    },

    // 搜索
    handleSearch(data) {
      console.log(this.storeForm,'搜索')
      const query = {
        regions: this.storeForm.city || '',
        name: this.storeForm.user || '',
        categoryId: this.storeForm.class || '',
        currentPage: 1
      };
      this.getShopList(query);
    },
    // 重置
    resetForm() {
      this.storeForm = {
        city: [],
        user: "",
        class: ""
      };
    },
    // 批量删除
    handleBatchDel() {
      const query = {
        shopIds: this.shopIds,
        checked: 0
      };
      this.shopBatchChecked(query);
    },
    // 批量开通
    handleOpen() {
      const query = {
        shopIds: this.shopIds,
        checked: 2
      };
      this.shopBatchChecked(query);
    },
    // 批量禁用
    handleProhibit() {
      const query = {
        shopIds: this.shopIds,
        checked: 3
      };
      this.shopBatchChecked(query);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getShopList({ currentPage: val });
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
    width: 220px;
    height: 40px;
    margin-right: 20px;
  }
  .el-cascader {
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
  padding: 0 10px;
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
