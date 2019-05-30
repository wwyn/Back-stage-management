<template>
  <div class="finan-cestatis">
    <div class="title">
      <span></span>综合统计
    </div>
    <div class="finan-contant">
      <div class="finan-head">
        <p>综合统计</p>
        <div>
          <p>导出数据</p>
          <p
            v-for="(item,index) in timeList"
            :key="index"
            :class="{ active: count==index }"
            @click="switchTime(index)"
          >{{ item }}</p>
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getTime"
          ></el-date-picker>
        </div>
      </div>
      <p>订单统计</p>
      <div>
        <el-table :data="cestatisTableData" border style="width: 100%">
          <el-table-column prop="type" label="类型" width="500" align="center"></el-table-column>
          <el-table-column prop="cost" label="金额" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      timeList: ["全部", "30天", "90天"],
      count: 0,
      data: "",
      cestatisTableData: [
        {
          cost: "￥10000",
          type: "销售总额"
        },
        {
          cost: "￥10000",
          type: "无效订单总数(关闭或取消)"
        }
      ]
    };
  },
  methods: {
    switchTime(index) {
      this.count = index;
    },
    getTime() {
        console.log(this.data)
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.finan-cestatis {
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
  .finan-contant {
    border: 1px solid #999;
    .finan-head {
      background-color: #f1f1f1;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #999;
      > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .active {
          background-color: @color;
          color: #fff;
        }
        p:nth-child(1) {
          margin-right: 10px;
          border-right: 1px solid #999;
        }
        p {
          background-color: #fff;
          border: 1px solid #999;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          box-sizing: border-box;
          border-right: none;
        }
        .el-range-editor.el-input__inner {
          height: 30px;
          line-height: 30px;
          color: #101010;
          /deep/ .el-range__icon {
            line-height: 24px;
          }
          /deep/ .el-range-separator {
            line-height: 24px;
          }
        }
      }
    }
    > p {
      font-size: 18px;
      padding: 20px 20px 0;
      box-sizing: border-box;
    }
    > div {
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>


