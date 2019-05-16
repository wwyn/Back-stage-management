<template>
  <div class="newfreight">
    <div class="title">
      <span></span>新建运费模板
    </div>
    <div class="addfreight">
      <el-form ref="formFreight" :model="formFreight" label-width="80px">
        <el-form-item label="模版名称:">
          <el-input v-model="formFreight.name"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮:">
          <el-radio-group v-model="formFreight.freeshipping">
            <el-radio label="1">自定义运费</el-radio>
            <el-radio label="0">卖家承担运费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计价方式:">
          <el-radio-group v-model="formFreight.computed">
            <el-radio label="1">按件数</el-radio>
            <el-radio label="2">按重量</el-radio>
            <el-radio label="3">按体积</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="formFreight.freeshipping==='1'">
          <el-form-item label="配送方式:">除指定地区外，其余地区的运费采用“默认运费”</el-form-item>
          <el-form-item class="tabledata">
            <el-table
              highlight-current-row
              :data="tableData"
              border
              style="width: 100%"
              @current-change="handleCurrentChange"
            >
              <el-table-column fixed prop="address" label="运送到">
                <template slot-scope="scope" class="address">
                  <div>
                    <span v-for="(item,index) in scope.row.dtoList" :key="index">{{ item.name }},</span>
                    <span v-if="!scope.row.dtoList || scope.row.dtoList.length==0">全国(港澳台除外)</span>
                  </div>
                  <el-button
                    type="text"
                    size="small"
                    @click="editorRegion(scope.$index,scope.row.dtoList)"
                  >编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="incr" label="首件个数" width="120">
                <el-input slot-scope="scope" v-model="scope.row.incr"></el-input>
              </el-table-column>
              <el-table-column prop="incrAmount" label="首件运费" width="120">
                <el-input slot-scope="scope" v-model="scope.row.incrAmount"></el-input>
              </el-table-column>
              <el-table-column prop="initial" label="续件个数" width="120">
                <el-input slot-scope="scope" v-model="scope.row.initial"></el-input>
              </el-table-column>
              <el-table-column prop="initialAmount" label="续件运费" width="120">
                <el-input slot-scope="scope" v-model="scope.row.initialAmount"></el-input>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <div class="setfreight" @click="addCustom">为指定区域设置运费</div>
        </div>
        <div v-else>
          <el-form-item label="配送方式:">
            <p class="freeshipping-text">商家指定快递方式，卖用由卖家承担。</p>
          </el-form-item>
        </div>
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmitFreight">保存</el-button>
          <el-button @click="onCancelFreight">取消</el-button>
        </el-form-item>
      </el-form>
      <div v-if="showModal" class="modal">
        <div class="modal-box">
          <div class="flex select">
            <p>地区选择</p>
            <p @click="modalCancel">x</p>
          </div>
          <div class="city">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="(city,index) in this.cities"
                :label="JSON.stringify({
                  id: city.id,
                  name: city.name
                })"
                :key="index"
              >{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="modal-button">
            <button @click="modalCancel">关闭</button>
            <button @click="modalSubmit">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { debug } from "util";
let cityOptions = [];
export default {
  data() {
    return {
      formFreight: {
        name: "",
        freeshipping: "",
        computed: ""
      },
      tableData: [
        {
          incr: "1",
          incrAmount: "10",
          initial: "8",
          initialAmount: "1",
          dtoList: [{ name: "" }],
          regionItems: [
            {
              city: "string",
              cityId: 0,
              province: "string",
              provinceId: 0
            }
          ]
        }
      ],
      val: null,
      showModal: false,
      //   地域选择
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: true,
      checkedCities: [],
      //
      _index: 0
    };
  },
  mounted() {
    const query = {
      tempId: this.$route.params.id
    };
    this.getTemplate(query);
    this.geoList();
  },
  methods: {
    // 获取运费模板
    async getTemplate(query) {
      try {
        let ret = await api.getTemplate(query);
        if (ret.data.code == 200) {
          this.formFreight = {
            name: ret.data.data.name,
            freeshipping: ret.data.data.shopId + "",
            computed: ret.data.data.type + ""
          };
          this.tableData = ret.data.data.regions;
        } else {
          this.tableData = [];
        }
      } catch (err) {
        // alert(err)
      }
    },
    // 设置配送模板
    async setTemplate(data) {
      try {
        let ret = await api.setTemplate(data);
        if (ret.data.code == 200) {
          this.$router.push("/e-commerce-freight");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取地区
    async geoList(query) {
      try {
        let ret = await api.geoList(query);
        if (ret.data.code == 200) {
          this.cities = ret.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除区域
    async delRegion(query) {
      try {
        let ret = await api.delRegion(query);
        if (ret.data.code == 200) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 设置区域明细
    //  async setRegionItems(data) {
    //   try {
    //     let ret = await api.setRegionItems(data);
    //     console.log(ret,'设置地区明细')
    //     if (ret.data.code == 200) {
    //       console.log("设置地区成功");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    //   单选
    handleCurrentChange(val) {
      this.val = val;
    },
    //   移除
    deleteRow(index, rows) {
      if (this.$route.params.id) {
        let query = {
          tempId: this.$route.params.id,
          regionId:  rows[index].id
        }
        this.delRegion(query);
      }
      rows.splice(index, 1);
    },
    // 编辑区域
    editorRegion(index, val) {
      this._index = index;
      if (val.length != 0) {
        if (val[0].name === "全国") {
          this.checkedCities = [];
        } else {
          this.checkedCities = val.map(item => {
            return JSON.stringify({
              id: item.id,
              name: item.name
            });
          });
        }
      }
      this.showModal = true;
    },
    // 提交
    onSubmitFreight() {
      if (this.$route.params.id === undefined) {
        if (this.tableData.length === 0) {
          let arr = [
            {
              incr: "1",
              incrAmount: "0",
              initial: "1",
              limitLevel: "1",
              initialAmount: "0",
              regionItems: [
                {
                  city: "",
                  cityId: 0,
                  province: "全国",
                  provinceId: 0
                }
              ]
            }
          ];
          let data = {
            name: this.formFreight.name,
            shopId: 1,
            type: this.formFreight.freeshipping,
            valuation: this.formFreight.computed,
            regions: arr
          };
          this.setTemplate(data);
        } else {
          let arr = this.tableData;
          let data = {
            name: this.formFreight.name,
            shopId: 1,
            type: this.formFreight.freeshipping,
            valuation: this.formFreight.computed,
            regions: arr
          };
          this.setTemplate(data);
        }
      } else {
        let data = {
          id: this.$route.params.id,
          shopId: 1,
          name: this.formFreight.name,
          type: this.formFreight.freeshipping,
          valuation: this.formFreight.computed,
          regions: this.tableData
        };
        this.setTemplate(data);
      }
    },
    // 取消
    onCancelFreight() {
      this.$router.push("/e-commerce-freight");
    },
    // 隐藏模态
    modalCancel() {
      this.showModal = false;
    },
    // 提交模态框
    modalSubmit() {
      this.showModal = false;
    },
    //  添加自定义
    addCustom() {
      this.tableData.push({
        incr: "1",
        incrAmount: "10",
        initial: "1",
        limitLevel: "1",
        initialAmount: "8",
        dtoList: [],
        regionItems: [
          {
            city: "string",
            cityId: 0,
            province: "string",
            provinceId: 0
          }
        ]
      });
    },

    // 地区选择
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let values = value.map(item => {
        return JSON.parse(item);
      });
      this.tableData[this._index].dtoList = values;
      let arr = values.map(item => ({
        city: "",
        cityId: 0,
        province: item.name,
        provinceId: item.id
      }));
      this.tableData[this._index].regionItems = arr;
      let checkedCount = values.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.newfreight {
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
  .addfreight {
    font-size: 14px;
    .el-input {
      width: 280px;
      height: 40px;
    }
    .el-input__inner {
      width: 280px;
    }
    .default-freight {
      .el-input {
        width: 80px;
        height: 32px;
        /deep/ input {
          width: 80px;
          height: 32px !important;
        }
        margin: 0 10px;
      }
    }
    .setfreight {
      margin-left: 10px;
      margin-bottom: 60px;
      font-size: 14px;
      color: #1260fb;
    }
    .tabledata {
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
    }
    /deep/ .el-table td,
    .el-table th {
      padding: 0;
    }
    /deep/ .el-table--border th,
    .el-table__fixed-right-patch {
      padding: 0;
      background-color: #F1F1F1;
    }
    .btn {
      text-align: center;
      button {
        background-color: @color;
        width: 68px;
        height: 36px;
        padding: 0;
        text-align: center;
        line-height: 36px;
      }
      button:nth-child(2) {
        background: #f1f1f1;
        border-radius: 2px;
        color: #010101;
        margin-left: 26px;
      }
    }
    .el-button--text {
      color: @color;
    }
    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: @color;
    }
    /deep/ .el-radio__input.is-checked .el-radio__inner {
      border-color: @color;
      background: @color;
    }
    .freeshipping-text {
      color: @color;
    }
    /deep/ .el-table td div {
      .el-input {
        width: 90px;
      }
      input {
        width: 90px;
        border: none;
      }
    }
    /deep/ tr.hover-row > td {
      background-color: #fff;
    }
    /deep/ tr.current-row > td {
      .el-radio__inner {
        border-color: @color;
        background: @color;
        &::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
      background-color: #fff;
    }
    /deep/ .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 5, 5, 0.5);
      z-index: 999;
      .modal-box {
        background-color: #fff;
        width: 890px;
        height: 570px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -285px 0 0 -445px;
        padding: 10px;
        box-sizing: border-box;
        .city {
          padding: 30px;
          .el-checkbox {
            width: 170px;
            margin-bottom: 10px;
          }
        }
        .select {
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 20px;
          p {
            padding: 10px;
          }
        }
        .modal-button {
          text-align: right;
          padding-top: 10px;
          border-top: 1px solid #e8e8e8;
          button {
            width: 68px;
            height: 36px;
            border: none;
            border-radius: 2px;
          }
          button:nth-child(1) {
            background-color: #e8e8e8;
            color: #010101;
            margin-right: 20px;
          }
          button:nth-child(2) {
            background-color: @color;
            color: #fff;
          }
        }
      }
    }
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>


