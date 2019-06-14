<template>
  <div class="orderdeliverydetail">
    <div class="title">
      <span></span>
      配送订单-{{orderStatus[Status]}}
    </div>
    <div class="close" @click="handleClose">关闭</div>
    <el-steps :active="active" align-center>
      <el-step title="提交订单" description="2019-05-31"></el-step>
      <el-step title="支付订单" description="未支付"></el-step>
      <el-step title="商家发货" description></el-step>
      <el-step title="确认收货" description></el-step>
    </el-steps>
    <div class="orderdelivery-detail-contant">
      <div>
        <p style="color:red;font-size:18px;">当前订单状态: {{orderStatus[Status]}}</p>
        <div>
          <p v-if="active==2" @click="confirmOrder">确认接单</p>
          <p v-if="active==2" @click="invoiceModify">修改发票信息</p>
          <p v-if="active==2" @click="consigneeModify">修改收货人信息</p>
          <p v-if="active==3">发布配送单</p>
          <p   @click="orderTrack">订单跟踪</p>
          <p @click="remarksOrder">备注订单</p>
        </div>
      </div>
      <div class="table-data">
        <p>基本信息</p>
        <el-table :data="tableDataBasic" border style="width: 100%">
          <el-table-column prop="orderNo" label="订单编号" width="180" align="center"></el-table-column>
          <el-table-column prop="consigneeMobile" label="用户账号" width="160" align="center"></el-table-column>
          <el-table-column prop="payName" label="支付方式" width="160" align="center"></el-table-column>
          <el-table-column prop="orderSource" label="订单来源" width="160" align="center"></el-table-column>
          <el-table-column prop="orderType" label="订单类型" width="160" align="center"></el-table-column>
          <el-table-column prop="deliverStatus" label="配送方式" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">发票信息</p>
        <el-table :data="tableDatAinvoice" border style="width: 100%">
          <el-table-column prop="type" label="发票类型" width="150" align="center"></el-table-column>
          <el-table-column prop="title" label="发票抬头" width="280" align="center"></el-table-column>
          <el-table-column prop="content" label="发票内容" width="280" align="center"></el-table-column>
          <el-table-column prop="receiverName" label="收票人信息" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">收货人信息</p>
        <el-table :data="tableDataUser" border style="width: 100%">
          <el-table-column prop="consignee" label="收货人" width="180" align="center"></el-table-column>
          <el-table-column prop="consigneeMobile" label="手机号" width="180" align="center"></el-table-column>
          <el-table-column prop="zipCode" label="邮政编码" width="180" align="center"></el-table-column>
          <el-table-column prop="deliverAddress" label="收货地址" align="center"></el-table-column>
        </el-table>
        <p style="margin-top: 20px;">商品信息</p>
        <el-table :data="tableDataStore" border style="width: 100%">
          <el-table-column prop="date" label="商品图片" width="150" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumbnailsUrl" alt>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" width="190" align="center"></el-table-column>
          <el-table-column prop="price" label="价格" width="90" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="货号" width="150" align="center"></el-table-column>
          <el-table-column prop="attribute" label="属性" width="150" align="center"></el-table-column>
          <el-table-column prop="quantity" label="数量" width="130" align="center"></el-table-column>
          <el-table-column prop="address" label="小计" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.price* scope.row.quantity }}</p>
            </template>
          </el-table-column>
        </el-table>
        <p style="margin-top: 20px;">操作信息</p>
        <el-table :data="tableDataOperation" border style="width: 100%">
          <el-table-column prop="createBy" label="操作者" width="120" align="center"></el-table-column>
          <el-table-column prop="createTime" label="操作时间" width="150" align="center">
            <template slot-scope="scope">
              <p>{{parseTime(scope.row.createTime || '')}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="150" align="center">
            <template slot-scope="scope">
              <p>{{ orderStatus[scope.row.orderStatus] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="payStatus" label="付款状态" width="150" align="center">
            <template slot-scope="scope">
              <p>{{ payStatus[scope.row.payStatus] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" label="发货状态" width="150" align="center">
            <template slot-scope="scope">
              <p>{{ orderStatus[scope.row.orderStatus] }}</p>
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
            <i class="iconfont icon-gongjutianjia" @click="cancelInvoiceForm"></i>
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
                <el-select v-model="modifyForm.type" placeholder="请选择发票类型">
                  <el-option label="电子发票" value="电子"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抬头" prop="title">
                <el-input v-model="modifyForm.title"></el-input>
              </el-form-item>
              <el-form-item label="发票内容" prop="contant">
                <el-select v-model="modifyForm.contant" placeholder="请选择活动区域"></el-select>
              </el-form-item>
              <el-form-item label="收票人名称" prop="name">
                <el-input v-model="modifyForm.name"></el-input>
              </el-form-item>
              <el-form-item label="收票人手机" prop="mobile">
                <el-input v-model="modifyForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="收票人邮箱" prop="emile">
                <el-input v-model="modifyForm.emile"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitInvoiceForm">确认</el-button>
                <el-button @click="cancelInvoiceForm">取消</el-button>
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
      showConsignee: false,
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
      },
      active: 1,
    };
  },
  mounted() {
    this.geoList();
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
        name: `servicesOrderDelivery`
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
          let Nstatus = ret.data.data.orderStatus;
          if(Nstatus<=5 || Nstatus>20) {
            this.active = 1;
          } else if(Nstatus>5 &&  Nstatus<=10) {
            this.active = 2;
          } else if (Nstatus == 13) {
            this.active = 3;
          } else if (Nstatus >=15 && Nstatus<= 20) {
            this.active = 4;
          }
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
    // 确认接单
    async orderMerchantConfirm() {
      let query = {
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.orderMerchantConfirm(query);
        if (ret.data.code == 200) {
          this.$message({
            type: "success",
            message: "接单成功!"
          });
        } else {
          this.$message({
            type: "errer",
            message: ret.data.message
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 发票修改
    async orderSetInvoiceInfo() {
      let query = {
        content: this.modifyForm.contant,
        receiverMobile: this.modifyForm.mobile,
        receiverName: this.modifyForm.name,
        title: this.modifyForm.title,
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.orderSetInvoiceInfo(query);
        console.log(ret, "发票修改");
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showInvoiceModify = false;
          this.modifyForm = {
            type: "",
            title: "",
            contant: "",
            mobile: "",
            emile: "",
            name: ""
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
    // 地址修改
    async orderSetDeliveryAddress() {
      let query = {
        consignee: this.consigneeForm.name || "",
        consigneeMobile: this.consigneeForm.number || "",
        deliverAddress: this.consigneeForm.adressDetails || "",
        deliverCityId: this.consigneeForm.city[1] || "",
        deliverCityId: this.consigneeForm.city[2] || "",
        deliverProvinceId: this.consigneeForm.city[0] || "",
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.orderSetDeliveryAddress(query);
        console.log(ret, "地址修改");
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showConsignee = false;
          this.consigneeForm = {
            name: "",
            number: "",
            code: "",
            city: [],
            adressDetails: ""
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
    // 备注
    async orderRemark() {
      let query = {
        remark: this.remarksForm.remark || "",
        orderNo: this.$route.params.orderNo
      };
      try {
        const ret = await api.orderRemark(query);
        console.log(ret, "备注");
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
    //   确认接单
    confirmOrder() {
      this.$confirm("是否确认接单?", "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.orderMerchantConfirm();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消接单"
          });
        });
    },
    // 发票修改
    invoiceModify() {
      this.showModal = true;
      this.showInvoiceModify = true;
      this.modifyForm = {
        type: this.tableDatAinvoice[0].type || "",
        title: this.tableDatAinvoice[0].title || "",
        contant: this.tableDatAinvoice[0].content || "",
        mobile: this.tableDatAinvoice[0].receiverMobile || "",
        emile: this.tableDatAinvoice[0].taxNumber || "",
        name: this.tableDatAinvoice[0].receiverName || ""
      };
    },
    // 发票确认
    submitInvoiceForm() {
      this.orderSetInvoiceInfo();
    },
    // 发票取消
    cancelInvoiceForm() {
      this.showModal = false;
      this.showInvoiceModify = false;
      this.modifyForm = {
        type: "",
        title: "",
        contant: "",
        mobile: "",
        emile: "",
        name: ""
      };
    },
    // 地区选择
    handleCityChange(val) {},
    // 收货人修改
    consigneeModify() {
      this.showModal = true;
      this.showConsignee = true;
      this.consigneeForm = {
        name: this.tableDataUser[0].consignee || "",
        number: this.tableDataUser[0].consigneeMobile || "",
        code: this.tableDataUser[0].zipCode || "",
        city:
          [
            this.tableDataUser[0].deliverProvinceId,
            this.tableDataUser[0].deliverCityId,
            this.tableDataUser[0].deliverCountyId
          ] || [],
        adressDetails: this.tableDataUser[0].deliverAddress || ""
      };
    },
    // 收货人确认
    submitConsigneeForm() {
      this.orderSetDeliveryAddress();
      console.log(this.consigneeForm);
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
        params: {
          orderNo: this.$route.params.orderNo,
        }
      });
    },
    //   备注订单
    remarksOrder() {
      this.showModal = true;
      this.showRemarksModal = true;
    },
    // 备注确认
    submitResetForm() {
      this.orderRemark();
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
  img {
    width: 60px;
    vertical-align: middle;
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


