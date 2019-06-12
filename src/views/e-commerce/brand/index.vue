<template>
  <div class="brand">
    <div class="title">
      <span></span>品牌管理
    </div>
    <div v-if="showTableList">
      <div class="brabd-header">
        <div class="addBrand" @click="handleAddBrand">新建品牌</div>
        <el-input placeholder="请输入内容" v-model="inputSearch"  @keyup.enter.native="searchBrand" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchBrand" @keyup.enter="searchBrand"></el-button>
        </el-input>
      </div>
      <el-table :data="tableList" border style="width: 100%">
        <el-table-column type="expand" fixed prop="date" width="80" align="right">
          <template slot-scope="scope">
            <div class="details">
              <p>品牌ID:{{ scope.row.brandCode }}</p>
              <p>品牌名称:{{ scope.row.brandName }}</p>
              <p>所属公司:{{ scope.row.company }}</p>
            </div>
            <div class="details-type">
              所属类目:
              <span v-for="(item,index) in scope.row.types" :key="index">{{ item }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="54"></el-table-column>
        <el-table-column prop="brandCode" label="品牌ID" width="91"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" width="126"></el-table-column>
        <el-table-column label="品牌商标" width="96">
          <template slot-scope="scope">
            <img class="brandImg" :src="scope.row.logo" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="company" label="所属公司" width="206"></el-table-column>
        <el-table-column label="创建时间" width="156">
          <template slot-scope="scope">
            <p>{{parseTime(scope.row.createTime || '')}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="productCount" label="商品数量" width="106"></el-table-column>
        <el-table-column fixed="right" label="操作" width="148">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleRevisetable(scope.row)">修改</el-button>
            <el-button @click="handleDeltable(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    <pagination :page-size="pageSize" :current-page="currentPage" :total="total" @handleCurrentChange="handleCurrentChange" ></pagination>
    </div>
    <div v-if="!showTableList">
      <el-form :inline="true" :model="formAddBrand" class="demo-form-inline">
        <el-form-item label="品牌名称:">
          <el-input v-model="formAddBrand.name" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="所属公司:">
          <el-input v-model="formAddBrand.company" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌商标:" class="brand-trademark" style="display:block">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.1.23:18899/sfy-resource/resource/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeImgUpload"
            v-model="formAddBrand.imageUrl"
          >
            <img v-if="this.formAddBrand.imageUrl" :src="this.formAddBrand.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="经营类目:" style="width:100%">
          <el-cascader
            :props="props"
            :options="categoryList"
            class="cascader"
            @change="typeFormList"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="brandFromSubmit">
          <el-button type="primary" @click="brandFromSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <el-tag v-for="(tag,index) in names" :key="index" closable @close="delTag(index)">{{ tag.typeName }}</el-tag>
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
      inputSearch: "",
      tableList: [],
      showTableList: true,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      vals: [],
      formAddBrand: {
        name: "",
        company: "",
        imageUrl: ""
      },
      categoryList: [],
      props: {
        label: "typeName",
        value: "id",
        children: "subclass"
      },
      names: [],
      ids: [],
      isAdd: true,
      brandId: "",
      createTime: ""
    };
  },
   components: {
    pagination
  },
  mounted() {
    this.brandList(this.currentPage);
  },
  methods: {
    parseTime,
    // 获取品牌列表
    async brandList(val, brandName) {
      const _query = {
        pageSize: 15,
        currentPage: val,
        name: brandName || ""
      };
      try {
        let ret = await api.brandList(_query);
        if (ret.data.code == 200) {
          this.tableList = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        } else {
          this.tableList = [];
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 搜索品牌列表
    searchBrand() {
      const name = this.inputSearch.trim();
      this.brandList(1, name);
    },
    // 新建(修改)品牌列表
    async brandSet(query) {
      let id = this.isAdd ? "" : this.brandId;
      const _data = {
        ...query,
        id
      };
      try {
        let ret = await api.brandSet(_data);
        if (ret.data.code == 200) {
          this.brandList(this.currentPage);
        } else {
          alert("操作失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取品牌详情
     async getById(query) {
      try {
        let ret = await api.getById(query);
        if (ret.data.code == 200) {
          this.formAddBrand= {
            name: ret.data.data.brandName || '',
            company:ret.data.data.company || '',
            imageUrl: ret.data.data.logo || '',
          }
          this.names = ret.data.data.types || [];
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 新建品牌列表
    handleAddBrand() {
      this.isAdd = true;
      this.showTableList = false;
      this.typeList();
    },
    // 删除品牌列表
    async brandDel(query) {
      try {
        let ret = await api.brandDel(query);
        if (ret.data.code == 200) {
          this.brandList(this.currentPage);
        } else {
          alert("删除失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除品牌类表
    handleDeltable(options) {
      this.brandDel({ id: options.id });
    },
    // 修改品牌列表
    handleRevisetable(options) {
      this.isAdd = false;
      this.brandId = options.id;
      this.showTableList = false;
      let query = {
        id: options.id,
      }
      this.getById(query);
      this.typeList();
    },
    // 获取品牌类目
    async typeList(query) {
      try {
        let ret = await api.typeList(query);
        this.categoryList = ret.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 分页管理
    handleCurrentChange(val) {
      this.brandList(val);
    },
    // 上传商标
    handleImgSuccess(res, file) {
      this.formAddBrand.imageUrl = res.data[0];
    },
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpeg";
      const extension1 = testmsg === "png";
      const extension2 = testmsg === "jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension1 && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg,jpeg,png格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning"
        });
      }
      return (extension || extension1 || extension2) && isLt2M;
    },
    // 连级选择
    typeFormList(value) {
      value.reduce((arr, item) => {
        const target = arr.find(t => t.id === item);
        this.names.push({
        id: target.id,
         typeName:target.typeName});
        this.ids.push(target.id);
        return target.subclass;
      }, this.categoryList);
    },
    // 标签删除
    delTag(index) {
      this.names.splice(index, 1);
      this.ids.splice(index, 1);
    },
    // 保存新建品牌
    brandFromSubmit() {
      const query = {
        brandName: this.formAddBrand.name,
        company: this.formAddBrand.company,
        logo: this.formAddBrand.imageUrl,
        typeIds: this.ids
      };
      this.brandSet(query);
      (this.formAddBrand = {
        name: "",
        company: "",
        imageUrl: ""
      }),
        (this.names = []),
        (this.showTableList = true);
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.brand {
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
  .brabd-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    .addBrand {
      width: 96px;
      height: 36px;
      background: #1260fb;
      border: 2px solid #1260fb;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      line-height: 36px;
    }
  }
  /deep/ .el-button--text {
    color: @color;
  }
  //   新建品牌部分
  /deep/ .el-form--inline .el-form-item {
    margin-bottom: 40px;
    input {
      width: 360px;
      height: 40px;
    }
  }
  /deep/ .el-form--inline .el-form-item:nth-child(1) {
    margin-right: 90px;
  }
  /deep/ .el-cascader .el-icon-arrow-down {
    color: #999;
  }
  .cascader {
    width: 482px;
    height: 40px;
    /deep/ input {
      width: 482px !important;
      height: 40px !important;
    }
  }
  .brandFromSubmit {
    position: absolute;
    top: -10px;
    right: 0;
    width: 46px;
    height: 28px;
    margin-bottom: 0;
    margin-right: 0;
    button {
      width: 46px;
      height: 28px;
      padding: 0;
      background-color: @color;
      text-align: center;
      line-height: 28px;
      border-radius: 2px;
    }
  }

  //   搜索框样式
  /deep/ .el-input-group {
    width: 298px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #999999;
    border-radius: 2px;
    input {
      border: none;
    }
    .el-input-group__append {
      border: none;
    }
    button {
      border: none;
      background-color: #fff;
    }
    i {
      color: #999;
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
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
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
    background: #F1F1F1;
  }
  .el-table th,
  /deep/ .el-table tr {
    height: 45px;
  }
  //   上传图片
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 32px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
// 三级联动
.el-cascader-menu {
  width: 233px;
}
.el-tag {
  margin-right: 20px;
  background: #f1f1f1;
  border: 2px solid #f1f1f1;
  border-radius: 2px;
  font-size: 14px;
  color: #101010;
}
.el-tag .el-icon-close {
  color: #101010;
}
// 详情
.details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;
  font-size: 14px;
  color: #101010;
  margin-left: 134px;
  p {
    margin-right: 100px;
  }
}
.details-type {
  padding-bottom: 50px;
  margin-left: 134px;
}
// 品牌商标
.brandImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.brand-trademark {
  /deep/ .el-form-item__content {
    width: 102px;
    height: 102px;
  }
} 
</style>
