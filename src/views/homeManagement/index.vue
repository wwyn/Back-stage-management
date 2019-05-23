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
            <!-- <p>{{parseTime(scope.row.createTime || '')}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="图片" width="108" align="center">
          <template slot-scope="scope">
            <img src alt>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="语音句式" width="253" align="center"></el-table-column>
        <el-table-column prop="name" label="类型" width="84" align="center"></el-table-column>
        <el-table-column prop="name" label="排序" width="106" align="center">
          <template slot-scope="scope">
            <i class="move iconfont icon-shangyi" @click="handleSort(scope.row.id,'up')"></i>
            <i class="move iconfont icon-xiayi" @click="handleSort(scope.row.id,'down')"></i>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="状态" width="103" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleRevise(scope.row)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="发布者" align="center"></el-table-column>
      </el-table>
    </div>
  </g-layout>
</template>
<script>
import menu from "@/menu";
import * as auth from "@/utils/auth";
import * as api from "@/api";
import { parseTime } from "@/utils";
export default {
  data: () => ({
    tableData: [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      }
    ],
    menu: menu.home,
    userInfo: {}
  }),
  mounted() {
    this.getCookie();
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
    async brandList(val, brandName) {
      const _query = {
        pageSize: 15,
        currentPage: val,
        name: brandName || ""
      };
      try {
        let ret = await api.brandList(_query);
        if (ret.data.code == 200) {
         
        } else {
         
        }
      } catch (err) {
        console.log(err);
      }
    },
    addBtn() {
      this.$router.push({
        name: "addhomeManagement",
        params: { type: "添加" }
      });
    },
    handleRevise() {
      this.$router.push({
        name: "addhomeManagement",
        params: { type: "修改" }
      });
    },
     handleSort() {

    },
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
  /deep/ .el-table--border th {
    background-color: #f1f1f1;
  }
}
</style>
