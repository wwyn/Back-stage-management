<template>
  <div class="list">
    <div class="title">
      <span></span>仓库中的商品
    </div>
    <search :formInline="formInline" @handleSearch="handleSearch" @resetForm="resetForm"></search>
    <div class="shop-tools">
      <div class="shop-batch">
        <p @click="handleBatchLower">批量上架</p>
        <p @click="handleBatchDel">批量删除</p>
      </div>
      <div class="shop-type">共{{ total }}件商品</div>
    </div>
    <brandlist :table-data="tableData" :loading="loading" @handleSelectionChange="handleSelectionChange" @handleEditor="handleEditor" @handleupSelling="handleupSelling" @handleDel="handleDel"></brandlist>
    <!-- <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div> -->
    <pagination :page-size="pageSize" :current-page="currentPage" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
  </div>
</template>
<script>
import * as api from "@/api";
import search from "@/components/search";
import brandlist from "@/components/brandlist";
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      formInline: {
        title: "",
        ID: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        minNumber: "",
        maxNumber: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      productIdList: [],
      loading: true
    };
  },

  components: {
    search,
    brandlist,
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.productList({ currentPage });
  },
  methods: {
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
    // 批量操作
    handleSelectionChange(val) {
      this.productIdList = val.map((item, index) => {
        return item.id;
      });
    },
    handleItemChange(val) {
      setTimeout(() => {}, 300);
    },
    // 批量删除
    handleBatchDel() {
      const query = {
        productIds: this.productIdList,
        hide: "1"
      };
      this.batchPart(query);
    },
    // 批量上架
    handleBatchLower() {
      const query = {
        productIds: this.productIdList,
        upSelling: "1"
      };
      this.batchPart(query);
    },
    // 单个上架
    handleupSelling(type) {
      let query = {
        productId: type.id,
        upSelling: "1"
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
    // 列表
    async productList(params) {
      const query = {
        ...params,
        shopName: this.formInline.title || "",
        productId: this.formInline.ID || "",
        productName: this.formInline.name || "",
        minPrice: this.formInline.minMoney || "",
        maxPrice: this.formInline.maxMoney || "",
        minSaleCount: this.formInline.minNumber || "",
        maxSaleCount: this.formInline.maxNumber || "",
        upSelling: "0",
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

    // 搜索
    handleSearch(data) {
      this.formInline = data;
      const query = {
        currentPage: 1
      };
      this.productList(query);
    },
    // 重置
    resetForm() {
      this.formInline = {
        title: "",
        ID: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        minNumber: "",
        maxNumber: ""
      };
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.productList({ currentPage: val });
    },

    // 编辑
    handleEditor(options) {
      this.$router.push({
        name: `eCommerceCommodity`,
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
        margin-right: 10px;
        margin-bottom: 10px;
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
  .el-select {
    margin-right: 20px;
  }
}
</style>
