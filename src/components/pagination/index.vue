<template>
  <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
  </div>
</template>
<script>
export default {
    name:'pagination',
    props: {
        pageSize: {
        type: Number,
        },
        currentPage: {
        type: Number,
        },
        total: {
        type: Number,
        }
  },
  methods: {
      handleCurrentChange(val) {
          this.$emit("handleCurrentChange",val)
      }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
  .el-pagination {
    margin-top: 40px;
    text-align: center;
    color: #101010;
  }
  /deep/ .el-pagination__total {
    color: #101010;
  }
  /deep/ .el-pagination__jump {
    color: #101010;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #fff;
    border: 1px solid #fff;
    color: @color;
  }
  .el-pagination__editor.el-input .el-input__inner {
    width: 50px;
    height: 28px;
  }
  /deep/ .el-pagination__editor.el-input {
    width: 50px;
    margin: 0 10px;
  }
  .el-pagination span.el-pagination__sizes {
    display: none;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fff;
    border-color: #fff;
  }
  /deep/ .el-pagination.is-background .btn-next,.el-pagination.is-background .el-pager li {
    background-color: #fff;
    color: #101010;
  }
  /deep/ .el-pagination.is-background .btn-prev,.el-pagination.is-background .el-pager li {
     background-color: #fff;
    color: #101010;
  }
</style>


