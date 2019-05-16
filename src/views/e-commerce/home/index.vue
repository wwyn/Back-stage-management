<template>
  <div class="home">
    <div class="title"><span></span>订单来源构成</div>
    <div class="home-order">
      <div class="order-box mr">
        <div class="title">付款订单数</div>
        <ve-pie :data="chartData"></ve-pie>
      </div>
      <div class="order-box">
        <div class="title">付款订单数</div>
        <ve-pie :data="chartData"></ve-pie>
      </div>
    </div>
    <div class="title"><span></span>商品类目销售分析</div>
    <div class="home-order">
      <div class="order-box mr">
        <div class="title">付款订单数</div>
        <ve-pie :data="chartData"></ve-pie>
      </div>
      <div class="order-box">
        <div class="title">付款订单数</div>
        <ve-pie :data="chartData"></ve-pie>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["类型", "访问用户"],
        rows: [
          { 类型: "app", 访问用户: 1393 },
          { 类型: "微信", 访问用户: 3530 },
          { 类型: "小程序", 访问用户: 2923 },
          { 类型: "pc", 访问用户: 1723 },
          { 类型: "pad端", 访问用户: 3792 },
          { 类型: "其他", 访问用户: 4593 }
        ]
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "上方元管理系统"
    },
    menu: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260FB;
.home {
  font-size: 14px;
  overflow: hidden;
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
      vertical-align: text-bottom;
    }
}
.home-order {
  border: 1px solid #979797;
  border-radius: 6px;
  padding: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
  .order-box {
    padding: 20px;
    border: 1px solid #979797;
    border-radius: 6px;
    width: 50%;
    text-align: center;
    .title {
      margin-bottom: 20px;
    }
  }
  .mr {
    margin-right: 116px;
  }
  .ve-pie {
    height: 330px !important;
  }
}
}

</style>
