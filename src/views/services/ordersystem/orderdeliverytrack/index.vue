<template>
  <div class="orderdeliverytrack">
    <div class="title">
      <span></span>
      配送订单-订单跟踪
    </div>
    <div class="orderdeliverytrack-contant">
      <div>
        <p>订单跟踪</p>
        <p @click="closeOrder">关闭</p>
      </div>
      <div>
        <p>派单员:张三</p>
        <p>联系电话: 13333333333</p>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },
  methods: {
    closeOrder() {
      this.$router.push({
        name: `servicesOrderDeliveryDetail`
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.orderdeliverytrack {
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
  .orderdeliverytrack-contant {
    margin-top: 20px;
    border: 1px solid #999;
    > div:nth-child(1) {
      padding: 10px 20px;
      background-color: #f1f1f1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p:nth-child(2) {
        padding: 4px 10px;
        border: 1px solid #999;
        background-color: @color;
        color: #fff;
        border-radius: 2px;
      }
    }
    > div:nth-child(2) {
      padding: 30px;
      box-sizing: border-box;
      p {
        margin: 20px 0;
      }
    }
  }
}
</style>


