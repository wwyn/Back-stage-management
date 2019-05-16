<template>
  <div class="storehome">
    <div class="title">
      <span></span>配送商品分类
    </div>
    <div class="shop-tools">
      <div class="shop-type">
        <p class="add" @click="handlerAddsort">添加</p>
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
      <el-table-column type="index" label="编号" width="180" align="center">
        <el-input></el-input>
      </el-table-column>
      <el-table-column prop="brandName" label="分类名称" width="180" align="center"></el-table-column>
      <el-table-column prop="brandName" label="级别" width="180" align="center"></el-table-column>
      <el-table-column prop="brandName" label="是否显示" width="180" align="center"></el-table-column>
      <el-table-column prop="createTime" label="排序" width="150" align="center">
        <el-input></el-input>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="handleDeltable(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      tableData: []
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    handlerAddsort() {
      this.$router.push({
        name:'servicesSettingAdd'
      })
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.storehome {
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
  border-left: 1px solid #f1f1f1;
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


