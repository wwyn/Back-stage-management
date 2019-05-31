<template>
  <div class="orderdeliverydetail">
    <div class="title">
      <span></span>
      配送订单-待付款
    </div>
    <el-steps :active="2" align-center>
      <el-step title="提交订单" description="2019-05-31"></el-step>
      <el-step title="支付订单" description="未支付"></el-step>
      <el-step title="商家发货" description></el-step>
      <el-step title="确认收货" description></el-step>
    </el-steps>
    <div class="orderdelivery-detail-contant">
      <div>
        <p>当前订单状态:{}</p>
        <div>
          <p @click="confirmOrder">确认接单</p>
          <p @click="invoiceModify">修改发票信息</p>
          <p @click="consigneeModify">修改收货人信息</p>
          <p>发布配送单</p>
          <p @click="orderTrack">订单跟踪</p>
          <p @click="remarksOrder">备注订单</p>
        </div>
      </div>
      <div class="table-data">
        <p>基本信息</p>
        <el-table :data="tableDataBasic" border style="width: 100%">
          <el-table-column prop="date" label="订单编号" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="用户账号" width="160" align="center"></el-table-column>
          <el-table-column prop="address" label="支付方式" width="160" align="center"></el-table-column>
          <el-table-column prop="name" label="订单来源" width="160" align="center"></el-table-column>
          <el-table-column prop="name" label="订单类型" width="160" align="center"></el-table-column>
          <el-table-column prop="name" label="配送方式" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">发票信息</p>
        <el-table :data="tableDatAinvoice" border style="width: 100%">
          <el-table-column prop="date" label="发票类型" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="发票抬头" width="280" align="center"></el-table-column>
          <el-table-column prop="address" label="发票内容" width="280" align="center"></el-table-column>
          <el-table-column prop="address" label="收票人信息" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">收货人信息</p>
        <el-table :data="tableDataUser" border style="width: 100%">
          <el-table-column prop="date" label="收货人" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="手机号" width="180" align="center"></el-table-column>
          <el-table-column prop="name" label="邮政编码" width="180" align="center"></el-table-column>
          <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">商品信息</p>
        <el-table :data="tableDataStore" border style="width: 100%">
          <el-table-column prop="date" label="商品图片" width="150" align="center">
            <template slot-scope="scope">
              <img src alt>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="价格" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="货号" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="属性" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="数量" width="130" align="center"></el-table-column>
          <el-table-column prop="address" label="小计" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">操作信息</p>
        <el-table :data="tableDataOperation" border style="width: 100%">
          <el-table-column prop="date" label="操作者" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="操作时间" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="订单状态" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="付款状态" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="发货状态" width="150" align="center"></el-table-column>
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
        <div v-if="showInvoiceModify" class="modal-box-modify">
          <div>
            <p>修改发票信息</p>
            <i class="iconfont icon-gongjutianjia" @click="modifyFormCancel"></i>
          </div>
          <div>
            <el-form
              :model="modifyForm"
              :rules="rules"
              ref="modifyForm"
              label-width="100px"
              class="demo-modifyForm"
            >
              <el-form-item label="发票类型" prop="type">
                <el-select v-model="modifyForm.type" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抬头" prop="title">
                <el-input v-model="modifyForm.title"></el-input>
              </el-form-item>
              <el-form-item label="发票内容" prop="contant">
                <el-select v-model="modifyForm.contant" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收票人手机" prop="mobile">
                <el-input v-model="modifyForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="收票人邮箱" prop="emile">
                <el-input v-model="modifyForm.emile"></el-input>
              </el-form-item>
              <el-form-item label="操作备注" prop="remark">
                <el-input type="textarea" v-model="modifyForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitModifyForm">确认</el-button>
                <el-button @click="modifyFormCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-if="showConsignee" class="modal-box-modify">
          <div>
            <p>修改收货人信息</p>
            <i class="iconfont icon-gongjutianjia" @click="consigneeFormCancel"></i>
          </div>
          <div>
            <el-form :model="consigneeForm" :rules="rules" label-width="100px">
              <el-form-item label="收货人姓名" prop="name">
                <el-input v-model="consigneeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="收货号码" prop="number">
                <el-input v-model="consigneeForm.number"></el-input>
              </el-form-item>
              <el-form-item label="邮编" prop="code">
                <el-input v-model="consigneeForm.code"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="city">
                <el-cascader
                  :props="newProps"
                  :options="cityList"
                  v-model="consigneeForm.city"
                  @change="handleCityChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="地址详情" prop="adressDetails">
                <el-input type="textarea" v-model="consigneeForm.adressDetails"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitConsigneeForm">确认</el-button>
                <el-button @click="consigneeFormCancel">取消</el-button>
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
      modifyForm: {
        type: "",
        title: "",
        contant: "",
        mobile: "",
        emile: "",
        remark: ""
      },
      consigneeForm: {
        name: "",
        number: "",
        code: "",
        city: [],
        adressDetails: ""
      },
      newProps: {
        value: "id",
        label: "name",
        children: "subclass"
      },
      cityList: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        emile: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择发票类型", trigger: "change" }
        ],
        contant: [
          { required: true, message: "请选择发票内容", trigger: "change" }
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
        adressDetails: [
          { required: true, message: "请输入地址详情", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入邮编", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6个字符", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择地址", trigger: "change" }]
      },
      showModal: false,
      showRemarksModal: false,
      showInvoiceModify: false,
      showConsignee: false
    };
  },
  mounted() {
    this.geoList();
  },
  methods: {
    // 获取地区
    async geoList() {
      const query = {
        levelType: 2
      };
      try {
        const ret = await api.geoList(query);
        console.log(ret);
        if (ret.data.code == 200) {
          this.cityList = ret.data.data;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    //   确认接单
    confirmOrder() {
      this.$confirm("是否确认接单?", "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 发票修改
    invoiceModify() {
      this.showModal = true;
      this.showInvoiceModify = true;
    },
    // 发票确认
    submitModifyForm() {
      this.showModal = false;
      this.showInvoiceModify = false;
      this.modifyForm = {
        type: "",
        title: "",
        contant: "",
        mobile: "",
        emile: "",
        remark: ""
      };
    },
    // 发票取消
    modifyFormCancel() {
      this.showModal = false;
      this.showInvoiceModify = false;
      this.modifyForm = {
        type: "",
        title: "",
        contant: "",
        mobile: "",
        emile: "",
        remark: ""
      };
    },
    // 收货人修改
    consigneeModify() {
      this.showModal = true;
      this.showConsignee = true;
    },
    // 收货人确认
    submitConsigneeForm() {
      this.showModal = false;
      this.showConsignee = false;
      this.consigneeForm = {
        name: "",
        number: "",
        code: "",
        city: [],
        adressDetails: ""
      };
    },
    // 收货人取消
    consigneeFormCancel() {
      this.showModal = false;
      this.showConsignee = false;
      this.consigneeForm = {
        name: "",
        number: "",
        code: "",
        city: [],
        adressDetails: ""
      };
    },
    // 订单追踪
    orderTrack() {
      this.$router.push({
        name: `servicesOrderDeliveryTrack`,
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
.orderdeliverydetail {
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
  .orderdelivery-detail-contant {
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


