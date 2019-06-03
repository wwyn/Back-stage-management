<template>
  <div class="ordercoupondetail">
    <div class="title">
      <span></span>
      服务券码订单详情-待付款
    </div>
    <div class="close" @click="handleClose">关闭</div>
    <el-steps :active="1" align-center>
      <el-step title="提交订单" description="2019-05-31"></el-step>
      <el-step title="支付订单" description="未支付"></el-step>
      <el-step title="确认消费" description></el-step>
    </el-steps>
    <div class="ordercoupon-detail-contant">
      <div>
        <p>当前订单状态:{}</p>
        <div>
          <p @click="confirmConsume">确认消费</p>
          <p @click="remarksOrder">备注订单</p>
        </div>
      </div>
      <div class="table-data">
        <p>基本信息</p>
        <el-table :data="tableDataBasic" border style="width: 100%">
          <el-table-column prop="date" label="订单编号" width="200" align="center"></el-table-column>
          <el-table-column prop="name" label="用户账号" width="200" align="center"></el-table-column>
          <el-table-column prop="address" label="支付方式" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="订单来源" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">用户信息</p>
        <el-table :data="tableDataUser" border style="width: 100%">
          <el-table-column prop="date" label="用户姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="手机号" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label width="180" align="center"></el-table-column>
          <el-table-column prop="address" label align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">商品信息</p>
        <el-table :data="tableDataStore" border style="width: 100%">
          <el-table-column prop="date" label="商品图片" width="150" align="center">
            <template slot-scope="scope">
              <img src alt>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="name" label="价格" width="250" align="center"></el-table-column>
          <el-table-column prop="name" label="预定时间" width="250" align="center"></el-table-column>
          <el-table-column prop="address" label="数量" width="130" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">操作信息</p>
        <el-table :data="tableDataOperation" border style="width: 100%">
          <el-table-column prop="date" label="操作者" width="160" align="center"></el-table-column>
          <el-table-column prop="name" label="操作时间" width="180" align="center"></el-table-column>
          <el-table-column prop="address" label="订单状态" width="160" align="center"></el-table-column>
          <el-table-column prop="address" label="付款状态" width="160" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <div v-if="showRemarksModal" class="modal-box-remarks">
          <div>
            <p>备注订单</p>
            <i class="iconfont icon-gongjutianjia" @click="resetFormCancel"></i>
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
                <el-button type="primary" @click="submitResetForm">确认</el-button>
                <el-button @click="resetFormCancel">取消</el-button>
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
      showRemarksModal: false
    };
  },
  mounted() {},
  methods: {
    //   关闭页面
    handleClose() {
      this.$router.push({
        name: `servicesOrderCoupon`
      });
    },
    //   确认消费
    confirmConsume() {
      this.$confirm("是否确认消费?", "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "消费成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消消费"
          });
        });
    },
    //   备注订单
    remarksOrder() {
      this.showModal = true;
      this.showRemarksModal = true;
    },
    // 备注确认
    submitResetForm() {
      console.log(this.remarksForm);
      this.showModal = false;
      this.showRemarksModal = false;
      this.remarksForm = {
        contant: ""
      };
    },
    //   备注取消
    resetFormCancel() {
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


