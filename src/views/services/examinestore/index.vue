<template>
  <div class="store-examine">
    <div class="title">
      <span></span>商家审核
    </div>
    <el-form :inline="true" :model="examineForm" class="demo-form-inline">
      <el-form-item label="商家名称">
        <el-input v-model="examineForm.name" placeholder="商家名称"></el-input>
      </el-form-item>
      <el-form-item label="商家分类">
        <el-select v-model="examineForm.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-batch">
        <p>数据列表</p>
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
      <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
      <el-table-column prop="brandName" label="商家名称" width="160" align="center"></el-table-column>
      <el-table-column prop="brandName" label="所在地区" width="180" align="center"></el-table-column>
      <el-table-column prop="brandName" label="联系人" width="140" align="center"></el-table-column>
      <el-table-column prop="brandName" label="联系方式" width="140" align="center"></el-table-column>
      <el-table-column label="创建时间" width="140" align="center">
        <template slot-scope="scope">
          <p>{{parseTime(scope.row.createTime || '')}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="brandName" label="状态" width="120" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleLooktable(scope.row)">查看订单</el-button>
          <el-button type="text" size="small" @click="handleExaminetable(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <div>
          <p>商家审核</p>
          <i @click="onExamineFormCancel" class="iconfont icon-gongjutianjia"></i>
        </div>
        <div>
          <el-form ref="storeExamineForm" :model="storeExamineForm" label-width="80px" >
            <el-form-item label="商家名称">
                <p>{{ storeExamineForm.storeName }}</p>
              <!-- <el-input v-model="storeExamineForm.storeName"></el-input> -->
            </el-form-item>
            <el-form-item label="商家审核">
              <el-radio-group v-model="storeExamineForm.examine">
                <el-radio label="审核通过"></el-radio>
                <el-radio label="审核不通过"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="反馈详情">
              <el-input type="textarea" v-model="storeExamineForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onExamineFormSubmit">确定</el-button>
              <el-button @click="onExamineFormCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { parseTime } from "@/utils";
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      examineForm: {
        name: "",
        type: ""
      },
      storeExamineForm: {
        storeName: "哈哈哈哈",
        examine: "",
        desc: ""
      },
      options: [],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      productIdList: [],
      loading: true,
      showModal: false,
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.productList({ currentPage });
    this.getShoptypes();
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
        shopName: this.examineForm.title || "",
        productId: this.examineForm.ID || "",
        productName: this.examineForm.name || "",
        minPrice: this.examineForm.minMoney || "",
        maxPrice: this.examineForm.maxMoney || "",
        minSaleCount: this.examineForm.minNumber || "",
        maxSaleCount: this.examineForm.maxNumber || "",
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
    // 获取商家类型
    async getShoptypes(data) {
      try {
        const ret = await api.getShoptypes(data);
        if (ret.data.code == 200 && ret.data.data) {
          console.log(ret, "fenlei");
          this.options = ret.data.data;
        } else {
          this.options = [];
        }
      } catch (e) {
        console.log(e.message);
      }
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
      this.examineForm = {
        city: "",
        user: "",
        class: ""
      };
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.productList({ currentPage: val });
    },
    // 查看订单
    handleLooktable(options) {
      this.$router.push({
        name: `servicesStoreAdd`,
        params: {
          id: options.id
        }
      });
    },
    // 审核
    handleExaminetable(options) {
        this.showModal = true;
    },
    // 审核确认
    onExamineFormSubmit() {
        console.log(this.storeExamineForm,'审核表单')

    },
    // 审核取消
    onExamineFormCancel() {
       this.showModal = false; 
        this.storeExamineForm=  {
        storeName: "",
        examine: "",
        desc: ""
      }
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.store-examine {
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
    p {
      margin: 20px 0;
      font-size: 16px;
    }
  }
  .el-input {
    width: 220px;
    height: 40px;
    margin-right: 16px;
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
  //   模态框部分
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(32, 32, 32, 0.3);
    z-index: 99;
    .modal-box {
      background-color: #fff;
      border: 1px solid #999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > div:nth-child(1) {
        padding: 20px;
        box-sizing: border-box;
        background-color: #f1f1f1;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      > div:nth-child(2) {
        padding: 20px 40px;
        /deep/ .el-textarea__inner {
            width: 400px;
            height: 100px;
        }
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
