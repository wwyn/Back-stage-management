<template>
  <div class="ordercoupondetail">
    <div class="title">
      <span></span>
      服务券码订单详情-{{orderStatus[Status]}}
    </div>
    <div class="close" @click="handleClose">关闭</div>
    <el-steps :active="1" align-center>
      <el-step title="提交订单" description="2019-05-31"></el-step>
      <el-step title="支付订单" description="未支付"></el-step>
      <el-step title="确认消费" description></el-step>
    </el-steps>
    <div class="ordercoupon-detail-contant">
      <div>
        <p style="color:red;font-size:18px;">当前订单状态: {{orderStatus[Status]}}</p>
        <div>
          <p @click="confirmConsume">确认消费</p>
          <p @click="couponVerify">验证券码</p>
          <p @click="remarksOrder">备注订单</p>
        </div>
      </div>
      <div class="table-data">
        <p>基本信息</p>
        <el-table :data="tableDataBasic" border style="width: 100%">
          <el-table-column prop="orderNo" label="订单编号" width="200" align="center"></el-table-column>
          <el-table-column prop="consigneeMobile" label="用户账号" width="200" align="center"></el-table-column>
          <el-table-column prop="payName" label="支付方式" width="180" align="center"></el-table-column>
          <el-table-column prop="orderSource" label="订单来源" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">用户信息</p>
        <el-table :data="tableDataUser" border style="width: 100%">
          <el-table-column prop="consignee" label="用户姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="consigneeMobile" label="手机号" width="180" align="center"></el-table-column>
          <el-table-column width="180" align="center"></el-table-column>
          <el-table-column align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">商品信息</p>
        <el-table :data="tableDataStore" border style="width: 100%">
          <el-table-column prop="date" label="商品图片" width="150" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumbnailsUrl" alt>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="price" label="价格" width="250" align="center"></el-table-column>
          <el-table-column prop="quantity" label="数量" width="130" align="center"></el-table-column>
          <el-table-column label="合计" width="130" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.price* scope.row.quantity }}</p>
            </template>
          </el-table-column>
        </el-table>
        <p style="margin-top: 20px;">操作信息</p>
        <el-table :data="tableDataOperation" border style="width: 100%">
          <el-table-column prop="createBy" label="操作者" width="160" align="center"></el-table-column>
          <el-table-column prop="createTime" label="操作时间" width="180" align="center">
            <template slot-scope="scope">
              <p>{{parseTime(scope.row.createTime || '')}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="160" align="center">
            <template slot-scope="scope">
              <p>{{ orderStatus[scope.row.orderStatus] }}</p>
            </template>
          </el-table-column>
          <el-table-column label="付款状态" width="160" align="center">
            <template slot-scope="scope">
              <p>{{ payStatus[scope.row.payStatus] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <div v-if="showRemarksModal" class="modal-box-remarks">
          <div>
            <p>备注订单</p>
            <i class="iconfont icon-gongjutianjia" @click="remarkFormCancel"></i>
          </div>
          <div>
            <el-form
              :model="remarksForm"
              :rules="rules"
              ref="remarksForm"
              label-width="100px"
              class="demo-remarksForm"
            >
              <el-form-item label="操作备注" prop="remark">
                <el-input type="textarea" v-model="remarksForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitRemarkForm">确认</el-button>
                <el-button @click="remarkFormCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
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
      tableDataBasic: [],
      tableDatAinvoice: [],
      tableDataUser: [],
      tableDataStore: [],
      tableDataOperation: [],
      remarksForm: {
        remark: ""
      },
      rules: {
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }]
      },
      showModal: false,
      showRemarksModal: false,
      Status: "",
      payStatus: {
        "-1": "无效",
        "0": "待支付",
        "1": "部分支付",
        "2": "已支付"
      },
      orderStatus: {
        "-1": "无效",
        "0": "已创建",
        "5": "已确认",
        "10": "已支付",
        "13": "商户确认",
        "15": "已发货",
        "20": "已完成",
        "25": "已取消",
        "30": "退款中",
        "35": "已退款"
      },
      deliverStatus: {
        "-1": "无效",
        "0": "待配送",
        "1": "配送中",
        "2": "配送完成"
      }
    };
  },
  mounted() {
    if (this.$route.params.orderNo) {
      let query = {
        orderNo: this.$route.params.orderNo
      };
      this.getOrderDetail(query);
      this.getOrderLogs(query);
    }
  },
  methods: {
    parseTime,
    //   关闭页面
    handleClose() {
      this.$router.push({
        name: `servicesOrderCoupon`
      });
    },
    // 获取订单详情
    async getOrderDetail(query) {
      try {
        const ret = await api.getOrderDetail(query);
        console.log(ret, "订单详情");
        if (ret.data.code == 200 && ret.data.data) {
          this.Status = ret.data.data.orderStatus;
          let arrBasic = [];
          let arrInvoice = [];
          arrBasic.push(ret.data.data);
          arrInvoice.push(ret.data.data.orderInvoice);
          this.tableDatAinvoice = arrInvoice;
          this.tableDataStore = ret.data.data.orderItems;
          this.tableDataBasic = arrBasic;
          this.tableDataUser = arrBasic;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 确认消费
    async getMyOrderCode() {
      const query = {
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.getMyOrderCode(query);
        console.log(ret, "确认消费");
        if (ret.data.code == 200) {
          this.$message({
            type: "success",
            message: "消费成功!"
          });
        } else {
          this.$message({
            type: "info",
            message: ret.data.message
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取操作日志
    async getOrderLogs(query) {
      try {
        const ret = await api.getOrderLogs(query);
        console.log(ret, "操作日志");
        if (ret.data.code == 200) {
          this.tableDataOperation = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 备注
    async orderRemark() {
      let query = {
        remark: this.remarksForm.remark || "",
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.orderRemark(query);
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showRemarksModal = false;
          this.remarksForm = {
            contant: ""
          };
        } else {
          this.$message({
            type: "info",
            message: ret.data.message
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    //   确认消费
    confirmConsume() {
      this.$confirm("是否确认消费?", "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.getMyOrderCode();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 验证券码
    couponVerify() {},
    //   备注订单
    remarksOrder() {
      this.showModal = true;
      this.showRemarksModal = true;
    },
    // 备注确认
    submitRemarkForm() {
      this.orderRemark();
    },
    //   备注取消
    remarkFormCancel() {
      this.showModal = false;
      this.showRemarksModal = false;
      this.remarksForm = {
        contant: ""
      };
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.ordercoupondetail {
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
  .close {
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid #f1f1f1;
    padding: 6px 14px;
    background-color: @color;
    color: #fff;
    border-radius: 2px;
  }
  .ordercoupon-detail-contant {
    margin-top: 20px;
    border: 1px solid #999;
    > div:nth-child(1) {
      background-color: #f1f1f1;
      padding: 10px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        p:nth-child(1) {
          background-color: @color;
          color: #fff;
          border: 1px solid #f1f1f1;
        }
        p {
          border: 1px solid #999;
          background-color: #fff;
          padding: 10px 20px;
          margin-left: 10px;
          border-radius: 2px;
        }
      }
    }
    > .table-data {
      padding: 30px;
      box-sizing: border-box;
      > p {
        font-size: 16px;
        margin-bottom: 20px;
        //   margin-top: 20px;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 35, 35, 0.3);
    z-index: 99;
    .modal-box {
      background-color: #fff;
      border: 1px solid #999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .modal-box-remarks {
        > div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          background-color: #f1f1f1;
          padding: 20px;
          box-sizing: border-box;
        }
        > div:nth-child(2) {
          margin: 30px;
          /deep/ .el-textarea__inner {
            width: 500px;
            height: 100px;
          }
        }
      }
      .modal-box-modify {
        > div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          background-color: #f1f1f1;
          padding: 20px;
          box-sizing: border-box;
        }
        > div:nth-child(2) {
          margin: 30px;
          /deep/ .el-textarea__inner {
            width: 300px;
            height: 100px;
          }
          /deep/ .el-select .el-input__inner {
            width: 300px;
          }
          /deep/ .el-cascader .el-input,
          .el-cascader .el-input__inner {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>


