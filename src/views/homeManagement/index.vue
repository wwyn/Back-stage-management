<template>
  <g-layout :userInfo="userInfo" :menu="menu">
    <div class="home-management">
      <div class="title">
        <span></span>LanunchScreen管理
      </div>
      <p class="add-btn" @click="addBtn">添加</p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="创建时间" width="120" align="center">
          <template slot-scope="scope">
            <p style="padding: 0 16px;">{{parseTime(scope.row.showTime || '')}}</p>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="108" align="center">
          <template slot-scope="scope">
            <img class="Lanunch-img" :src="scope.row.backgroundUrl" alt>
          </template>
        </el-table-column>
        <el-table-column prop="voiceDesc" label="语音句式" width="253" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="84" align="center"></el-table-column>
        <el-table-column prop="name" label="排序" width="106" align="center">
          <template slot-scope="scope">
            <i class="move iconfont icon-shangyi" @click="handleSort(scope.row.id,'up')"></i>
            <i class="iconfont icon-xiayi" @click="handleSort(scope.row.id,'down')"></i>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="103" align="center">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='使用中'"
              size="mini"
              type="text"
              @click="handleRevise(scope.row.bannerId)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status=='已下线'"
              size="mini"
              type="text"
              @click="handleDel(scope.row.bannerId)"
            >删除</el-button>
            <el-button
              v-if="scope.row.status==='待上线'"
              size="mini"
              type="text"
              @click="handleOnline(scope.row.bannerId)"
            >上线</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="发布者" align="center"></el-table-column>
      </el-table>
      <pagination
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </g-layout>
</template>
<script>
import menu from "@/menu";
import * as auth from "@/utils/auth";
import * as api from "@/api";
import { parseTime } from "@/utils";
import pagination from "@/components/pagination";

export default {
  data: () => ({
    tableData: [],
    menu: menu.home,
    userInfo: {},
    pageSize: 10,
    currentPage: 1,
    total: 0
  }),
  mounted() {
    this.getCookie();
    this.getBannerList({ current: 1 });
  },
  components: {
    pagination
  },
  methods: {
    parseTime,
    async getCookie() {
      try {
        let ret = await auth.getToken();
        if (ret === undefined) {
          this.$router.push({
            path: "/login"
          });
        } else {
          this.userInfo = JSON.parse(ret);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取品牌列表
    async getBannerList(query) {
      let _query = {
        ...query,
        size: 10
      };
      try {
        let ret = await api.getBannerList(_query);
        if (ret.data.code == 200) {
          this.tableData = ret.data.data.records;
          this.total = ret.data.data.total;
          console.log(ret.data.data, "列表获取成功");
        } else {
          alert("数据获取失败");
          this.tableData = [];
          this.total = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // delBanner
    async delBanner(data) {
      try {
        let ret = await api.delBanner(data);
        if (ret.data.code == 200) {
          this.getBannerList({ current: this.currentPage });
          console.log(ret.data.code);
        } else {
          alert("数据删除失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // changeStatusbanner
    async changeStatusbanner(query) {
      try {
        let ret = await api.changeStatusbanner(query);

        if (ret.data.code == 200) {
          this.getBannerList({ current: this.currentPage });
        } else {
          alert("上线失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除
    handleDel(id) {
      this.delBanner(id);
    },
    // 上线
    handleOnline(id) {
      let query = {
        bannerId: id,
        status: 1
      };
      this.changeStatusbanner(query);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBannerList({ current: val });
    },
    addBtn() {
      this.$router.push({
        name: "addhomeManagement",
        params: { bannerId: "" }
      });
    },
    handleRevise(id) {
      this.$router.push({
        name: "addhomeManagement",
        params: { bannerId: id }
      });
    },
    handleSort() {}
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.home-management {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 28px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
    span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: @color;
      margin-right: 8px;
      vertical-align: sub;
    }
  }
  .add-btn {
    width: 46px;
    height: 28px;
    background-color: @color;
    line-height: 28px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    position: absolute;
    right: 0;
    top: -5px;
  }
  .move {
    margin-right: 14px;
  }
  .Lanunch-img {
    width: 96px;
    height: 60px;
    vertical-align: middle;
    display: inline-block;
    border: 1px solid #ccc;
  }
  /deep/ .el-table--border th {
    background-color: #f1f1f1;
  }
  .el-table /deep/ .cell {
    padding: 0;
  }
}
</style>
