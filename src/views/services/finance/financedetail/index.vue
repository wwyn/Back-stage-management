<template>
  <div class="finan-detail">
    <div class="title">
      <span></span>对账详情
    </div>
    <p class="goback" @click="goFinanceBill">返回</p>
    <div class="finan-detail-contant">
      <p>对账信息</p>
      <div>
        <p>订单信息</p>
        <div>
          <div v-for="item in orderList" :key="item.name">
            <p>{{ item.name }}</p>
            <p>{{ item.val }}</p>
          </div>
        </div>
        <p style="margin-top: 20px;">对账信息</p>
        <div>
          <div v-for="item in finanList" :key="item.name">
            <p>{{ item.name }}</p>
            <p>{{ item.val }}</p>
          </div>
          <div v-if="unusual">
            <p>处理备注</p>
            <p>
              <el-input v-model="remarks" placeholder="请输入内容"></el-input>
            </p>
          </div>
        </div>
        <p v-if="unusual" class="manage">冲正处理</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unusual: false,
      remarks: "",
      orderList: [
        { name: "订单编号", val: "20190531" },
        { name: "订单金额", val: "20190531" },
        { name: "支付方式", val: "20190531" },
        { name: "支付时间", val: "20190531" }
      ],
      finanList: [
        { name: "对账状态", val: "已冲正" },
        { name: "对账人员", val: "admin" },
        { name: "对账时间", val: "20190531" },
        { name: "处理备注", val: "20190531" }
      ]
    };
  },
  methods: {
    goFinanceBill() {
      this.$router.push({
        name: `servicesFinanceBill`
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.finan-detail {
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
  .goback {
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #f1f1f1;
    background-color: @color;
    color: #fff;
    position: absolute;
    top: -6px;
    right: 0;
    text-align: center;
    border-radius: 4px;
  }
  .finan-detail-contant {
    margin-top: 20px;
    border: 1px solid #999;
    > p {
      background-color: #f1f1f1;
      padding: 20px;
      box-sizing: border-box;
      border-block: 1px solid #999;
    }
    > div {
      padding: 30px;
      box-sizing: border-box;
      > p {
        font-size: 18px;
        margin-bottom: 20px;
        //   margin-top: 20px;
      }
      > div {
        > div:nth-last-child(1) {
          border: 1px solid #f1f1f1;
        }
        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border: 1px solid #f1f1f1;
          border-bottom: none;
          > p {
            padding: 20px;
          }
          > p:nth-child(1) {
            width: 200px;
            text-align: right;
            border-right: 1px solid #f1f1f1;
          }
        }
      }
      .manage {
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          background-color: @color;
          border-radius: 4px;
          margin-top: 20px;
          text-align: center;
          color: #fff;
          margin-left: 500px;
      }
    }
  }
}
</style>


