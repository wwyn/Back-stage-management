<template>
  <div class="storehome">
    <div class="title">
      <span></span>商家首页
    </div>
    <div class="costList">
      <div v-for="item in costList" :key="item.id">
        <i class="iconfont icon-shujuzhongxin-"></i>
        <div>
          <p>{{ item.title }}</p>
          <p>{{ item.number }}</p>
        </div>
      </div>
    </div>
    <div class="pending">
      <p>待处理事务</p>
      <div class="pendingList">
        <div v-for="item in pendingList" :key="item.index">
          <div>{{ item.name }}</div>
          <span>({{ item.number }})</span>
        </div>
      </div>
    </div>
    <div class="pending">
      <p>快捷入口</p>
      <div class="handy">
        <div>
          <i class="iconfont icon-shujuzhongxin-"></i>
          <span>添加商品</span>
        </div>
        <div>
          <i class="iconfont icon-shujuzhongxin-"></i>
          <span>订单列表</span>
        </div>
        <div>
          <i class="iconfont icon-shujuzhongxin-"></i>
          <span>交易统计</span>
        </div>
        <div>
          <i class="iconfont icon-shujuzhongxin-"></i>
          <span>财务对账</span>
        </div>
      </div>
    </div>
    <div class="pending">
      <p>系统订单</p>
      <div class="order-statistics">
        <div>
          <div>
            <p>本月订单</p>
            <p>1000</p>
            <div>
              <i class="el-icon-caret-top percentage"></i>
              <span class="percentage">10%</span>
              <span>同比上月</span>
            </div>
          </div>
          <div>
            <p>本周订单数量</p>
            <p>1000</p>
            <div>
              <i class="el-icon-caret-bottom percentage-t"></i>
              <span class="percentage-t">10%</span>
              <span>同比上月</span>
            </div>
          </div>
        </div>
        <div>
          <ve-line :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
        </div>
      </div>
    </div>
    <div class="pending">
      <p>销售统计</p>
      <div class="order-statistics">
        <div>
          <div>
            <p>本周销售总额</p>
            <p>1000</p>
            <div>
              <i class="el-icon-caret-top percentage"></i>
              <span class="percentage">10%</span>
              <span>同比上月</span>
            </div>
          </div>
          <div>
            <p>本周销售总额</p>
            <p>1000</p>
            <div>
              <i class="el-icon-caret-bottom percentage-t"></i>
              <span class="percentage-t">10%</span>
              <span>同比上月</span>
            </div>
          </div>
        </div>
        <div>
          <ve-line :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"; //注册 action 和 state
export default {
  data() {
    this.chartSettings = {
      stack: { 用户: ["下单用户"] },
      area: true
    };
    this.colors = ["#1260fb"];
    return {
      costList: [
        { title: "今日订单数", number: "200", id: 0 },
        { title: "今日订单数", number: "300", id: 1 },
        { title: "今日订单数", number: "400", id: 2 },
        { title: "今日订单数", number: "500", id: 3 }
      ],
      pendingList: [
        { name: "待发货", number: "10" },
        { name: "待发货", number: "10" },
        { name: "待发货", number: "10" },
        { name: "待发货", number: "10" },
        { name: "待发货", number: "10" },
        { name: "待发货", number: "10" }
      ],
      chartData: {
        columns: ["日期", "下单用户"],
        rows: [
          { 日期: "7/1", 下单用户: 1093 },
          { 日期: "7/2", 下单用户: 3230 },
          { 日期: "7/3", 下单用户: 2623 },
          { 日期: "7/4", 下单用户: 1423 },
          { 日期: "7/5", 下单用户: 3492 },
          { 日期: "7/6", 下单用户: 4293 }
        ]
      }
    };
  },
  methods: {}
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
  .costList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 23%;
      padding: 30px 20px;
      box-sizing: border-box;
      border: 1px solid #999;
      display: flex;
      justify-content: space-around;
      p:nth-child(2) {
        margin-top: 10px;
      }
      i {
        font-size: 34px;
        color: @color;
      }
    }
  }
  .pending {
    border: 1px solid #999;
    margin-top: 20px;
    .pendingList {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      flex-wrap: wrap;
      > div {
        width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        padding: 10px 0;
        margin-right: 30px;
        margin-bottom: 10px;
        span {
          color: red;
        }
      }
    }
    p {
      background-color: #f1f1f1;
      padding: 16px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
    }
    .handy {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > div {
        padding: 20px 10px;
        margin-right: 30px;
        margin-left: 20px;
        i {
          color: #999;
          display: block;
          font-size: 34px;
          margin-bottom: 20px;
          margin-left: 8px;
        }
      }
    }
  }
  .order-statistics {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      background-color: #fff;
      border: none;
      padding: 0 0 10px;
      text-align: center;
      color: #999;
    }
    > div:nth-child(1) {
      width: 150px;
      padding: 20px;
      box-sizing: border-box;
      > div {
        margin-top: 30px;
        p:nth-child(2) {
          font-size: 30px;
          color: #101010;
        }
        .percentage {
          color: @color;
        }
        .percentage-t {
          color: red;
        }
      }
    }
    > div:nth-child(2) {
      border-left: 1px solid #999;
      padding-top: 10px;
      flex: 1;
    }
  }
}
</style>


