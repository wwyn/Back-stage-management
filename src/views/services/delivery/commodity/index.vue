<template>
  <div class="storecommodity">
    <div class="title">
      <span></span>配送商品管理
    </div>
    <div class="storetype">
      <div
        v-for="(item,index) in storetype"
        :key="index"
        :class="{active:count===index}"
        @click="hendleType(index)"
      >{{ item.name }}({{item.number}})</div>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="输入搜索">
        <el-input v-model="formInline.user" placeholder="商品名称/商品货号"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="formInline.business" placeholder="全部">
          <el-option
            v-for="item in businessList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">查询结果</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="shop-tools">
      <div class="shop-type">
        <p class="add" @click="handlerAddsort">添加</p>
      </div>
      <div class="shop-batch">
        <p @click="handleBatchLower">批量下架</p>
        <p @click="handleBatchUp">批量上架</p>
        <p @click="handleBatchDel">批量删除</p>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :data="tableproductList"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="productCode" label="编号" width="120" align="center"></el-table-column>
      <el-table-column label="商品图片" width="106" align="center">
        <template slot-scope="scope">
          <img class="thumbnailsUrl" :src="scope.row.logo" alt>
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品名称" width="170" align="center"></el-table-column>
      <el-table-column prop="salePrice" label="价格" width="126" align="center"></el-table-column>
      <el-table-column prop="packFee" label="打包费" width="96" align="center"></el-table-column>
      <el-table-column prop="typeName" label="类别" width="90" align="center"></el-table-column>
      <el-table-column label="规格" width="90" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.upSelling==1?'是':'否' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="116" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.status==2?'审核通过':'未通过' }}</p>
          <el-button @click="handleDetail(scope.row)" type="text" size="small">审核详情</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEditBtn(scope.row)">编辑</el-button>
          <el-button
            style="margin-left:0px"
            v-if="scope.row.upSelling==0"
            type="text"
            size="small"
            @click="handleupSelling(scope.row)"
          >上架</el-button>
          <el-button
            style="margin-left:0px"
            v-if="scope.row.upSelling==1"
            type="text"
            size="small"
            @click="handledownSelling(scope.row)"
          >下架</el-button>
          <el-button @click="handleDelBtn(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <div class="modal" v-if="showModal">
      <div class="box">
        <div>
          <p>审核详情</p>
          <i class="iconfont icon-gongjutianjia" @click="hendleclose"></i>
        </div>
        <el-table :data="detailTableData" border style="width: 100%">
          <el-table-column prop="createTime" label="审核时间" width="160" align="center">
            <template slot-scope="scope">
              <div>{{ parseTime(scope.row.createTime) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createBy" label="审核人员" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="审核结果" width="120" align="center"></el-table-column>
          <el-table-column prop="content" label="反馈" width="220" align="center"></el-table-column>
        </el-table>
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
      storetype: [
        { name: "全部商品", number: 10000 },
        { name: "已上架", number: 10000 },
        { name: "未上架", number: 10000 },
        { name: "待审核", number: 10000 },
        { name: "未通过", number: 10000 }
      ],
      detailTableData: [],
      count: 0,
      formInline: {
        business: "",
        user: ""
      },
      businessList: [],
      tableproductList: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      productIdList: [],
      loading: true,
      showModal: false
    };
  },
  components: {
    pagination
  },
  mounted: function() {
    let currentPage = this.currentPage;
    this.productList({ currentPage });
    this.categoryList();
  },
  methods: {
    hendleType(index) {
      this.count = index;
    },
    parseTime,
    // 商品分类列表
    async categoryList() {
      const query = {
        shopId: 5,
        pid: 0
      };
      try {
        const ret = await api.categoryList(query);
        this.businessList = ret.data.data.categories;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 配送列表
    async productList(params) {
      const query = {
        ...params,
        upSelling: 2,
        shopName: this.formInline.user || "",
        bigCategoryId: this.formInline.business || "",
        pageSize: 10,
        virtual: 0
      };
      try {
        const ret = await api.productList(query);
        console.log(ret, "配送列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.loading = false;
          this.tableproductList = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        } else {
          this.loading = false;
          this.tableproductList = [];
          this.total = 0;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 审核详情
    async getLogList(query) {
      try {
        const ret = await api.getLogList(query);
        console.log(ret, "审核详情");
        if (ret.data.code == 200 && ret.data.data) {
          this.detailTableData = ret.data.data;
        } else {
          this.detailTableData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 批量设置商品列表
    async batchPart(data) {
      try {
        const ret = await api.batchPart(data);
        console.log(ret, "批量设置");
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
        console.log(ret, "shezhidangeshangpin");
        if (ret.data.code == 200) {
          this.productList({ currentPage: this.currentPage });
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    handleSelectionChange(val) {
      this.productIdList = val;
    },
    // 搜索
    handleSearch(data) {
      const query = {
        currentPage: 1
      };
      this.productList(query);
    },
    // 重置
    handleReset() {
      this.formInline = {
        business: "",
        user: ""
      };
      const query = {
        currentPage: 1
      };
      this.productList(query);
    },
    // 单个删除
    handleDelBtn(options) {
      const query = {
        productId: options.id,
        status: 0
      };
      this.setPart(query);
    },
    // 批量删除
    handleBatchDel() {
      let ids = this.productIdList.map(item => {
        return item.id;
      });
      const query = {
        productIds: ids,
        status: 0
      };
      this.batchPart(query);
    },
    // 单个上架
    handleupSelling(type) {
      let query = {
        productId: type.id,
        upSelling: 1
      };
      this.setPart(query);
    },

    // 批量上架
    handleBatchUp() {
      let ids = this.productIdList.map(item => {
        return item.id;
      });
      const query = {
        productIds: ids,
        upSelling: 1
      };
      this.batchPart(query);
    },
    // 单个下架
    handledownSelling(type) {
      const query = {
        productId: type.id,
        upSelling: 0
      };
      this.setPart(query);
    },
    // 批量下架
    handleBatchLower() {
      let ids = this.productIdList.map(item => {
        return item.id;
      });
      const query = {
        productIds: ids,
        upSelling: 0
      };
      this.batchPart(query);
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.productList({ currentPage: val });
    },

    // 编辑
    handleEditBtn(options) {
      this.$router.push({
        name: `eCommerceCommodity`,
        params: {
          id: options.id
        }
      });
    },
    // 添加
    handlerAddsort() {
      this.$router.push({
        name: "servicesDeliveryCommoditysort"
      });
    },
    // 审核详情
    handleDetail(options) {
      this.showModal = true;
      const query = {
        logType: "check_product",
        target: options.id
      };
      this.getLogList(query);
    },
    hendleclose() {
      this.showModal = false;
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.storecommodity {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 10px;
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
  .demo-form-inline {
    margin-top: 20px;
  }
  // 品牌商标
  .brandImg {
    width: 30px;
    height: 30px;
    vertical-align: middle;
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
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(143, 143, 143, 0.5);
    z-index: 999;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #fff;
      > div {
        margin-bottom: 10px;
      }
      p {
        background-color: #f1f1f1;
        padding: 20px;
      }
      i {
        float: right;
        margin-top: -35px;
        margin-right: 20px;
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
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
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


