<template>
  <div class="brandlist">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :data="tableData"
      :row="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="87" align="center"></el-table-column>
      <el-table-column prop="productName" label="商品">
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
      <el-table-column prop="salePrice" label="折扣价" width="108"></el-table-column>
      <el-table-column prop="stock" label="库存" width="94"></el-table-column>
      <el-table-column prop="saleCount" label="销量" width="94"></el-table-column>
      <el-table-column label="最后编辑时间" width="150">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.updateTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="118">
        <template slot-scope="scope">
          <el-button @click="handleEditor(scope.row)" type="text" size="small">编辑</el-button>
          <el-button
            @click="handleupSelling(scope.row)"
            type="text"
            size="small"
          >{{ sell?'下架':'上架' }}</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { parseTime } from "@/utils";

export default {
  name: "brandlist",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    sell: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
     
    };
  },
  methods: {
    parseTime,
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleEditor(options) {
      this.$emit("handleEditor", options);
    },
    handleupSelling(options) {
      this.$emit("handleupSelling", options);
    },
    handleDel(options) {
      this.$emit("handleDel", options);
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
/deep/ .el-table th > .cell {
  font-size: 14px;
  color: #101010;
}
/deep/ .el-table .cell {
  padding: 0 !important;
  .el-button {
    color: @color;
    text-align: center;
    margin-right: 10px;
  }
}
/deep/ .el-table th {
  background-color: #f1f1f1;
  padding: 10px 0;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgba(232, 232, 232, 0.5);
}
.shop-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .shop-img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
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
.el-button + .el-button {
  margin-left: 0px;
}
</style>


