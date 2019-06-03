<template>
  <div class="dispose">
    <div class="title">
      <span></span>APP配置
    </div>
    <div class="contant">
      <p>首页广告配置</p>
      <div>
        <p @click="haneldeBannerAdd">添加banner</p>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableBannerData"
          border
          style="width: 100%"
        >
          <el-table-column prop="brandName" label="编号" width="150" align="center"></el-table-column>
          <el-table-column prop="brandName" label="广告名称" width="180" align="center"></el-table-column>
          <el-table-column label="广告图片" width="120" align="center">
            <template slot-scope="scope">
              <img class="brandImg" :src="scope.row.logo" alt>
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="开始时间" width="130" align="center"></el-table-column>
          <el-table-column prop="brandName" label="结束时间" width="130" align="center"></el-table-column>
          <el-table-column prop="券码" label="上线/下线" width="130" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleBannerEditor">编辑</el-button>
              <el-button type="text" size="small" @click="handleBannerTop">置顶</el-button>
              <el-button @click="handleDelBanner(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="contant">
      <p>商家分类配置</p>
      <div>
        <p @click="haneldeTypeAdd">添加分类</p>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableTypeData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号" width="150" align="center"></el-table-column>
          <el-table-column label="分类图片" width="150" align="center">
            <template slot-scope="scope">
              <img class="brandImg" :src="scope.row.icon" alt>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="分类名称" width="180" align="center"></el-table-column>
          <el-table-column prop="brandName" label="是否显示" width="150" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="1"
                inactive-value="0"
                active-color="#1260fb"
                @change="handleTypeChange($event,scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sortBy" label="分类排序" width="150" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleTypeEditor(scope.row)">编辑</el-button>
              <el-button @click="handleDelType(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { parseTime } from "@/utils";

export default {
  data() {
    return {
      loading: false,
      tableBannerData: [],
      tableTypeData: [],
      a:'1'
    };
  },
  mounted() {
    this.getPageList();
    this.getCategoriesList();
  },
  methods: {
    //   广告配置
    // 获取广告列表
    async getPageList() {
      const query = {
        position: "home_banner"
      };
      try {
        const ret = await api.getPageList(query);
        if (ret.data.code == 200 && ret.data.data.pageData) {
          this.loading = false;
          this.tableBannerData = ret.data.data.pageData;
        } else {
          this.loading = false;
          this.tableBannerData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 添加banner
    haneldeBannerAdd() {},
    //编辑
    handleBannerEditor() {},
    // 置顶
    handleBannerTop() {},
    // 删除
    handleDelBanner() {},
    //   分类配置
    // 获取商家分类列表
    async getCategoriesList() {
      const query = {
        module: "shop"
      };
      try {
        const ret = await api.getCategoriesList(query);
        console.log(ret, "商家分类");
        if (ret.data.code == 200 && ret.data.data) {
          this.loading = false;
          this.tableTypeData = ret.data.data;
        } else {
          this.loading = false;
          this.tableTypeData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 是否显示
    async setShow(query) {
      try {
        const ret = await api.setShow(query);
        console.log(ret, "是否显示");
        // this.getCategoriesList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 是否显示
    handleTypeChange(val,options) {
        const query = {
            id: options.id,
            status: val
        }
        this.setShow(query);
    },
    // 添加分类
    haneldeTypeAdd() {},
    //   编辑分类
    handleTypeEditor() {},
    // 删除分类
    handleDelType() {}
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.dispose {
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
  .contant {
    border: 1px solid #999;
    margin-bottom: 10px;
    > p {
      background-color: #f1f1f1;
      border-bottom: 1px solid #999;
      padding: 20px;
      box-sizing: border-box;
    }
    > div {
      padding: 30px;
      box-sizing: border-box;
      > p {
        display: inline-block;
        background-color: @color;
        color: #fff;
        border-radius: 2px;
        padding: 8px 10px;
        margin-bottom: 10px;
      }
      .brandImg {
        width: 50px;
        //   height: 60px;
        vertical-align: middle;
      }
    }
  }
}
</style>


