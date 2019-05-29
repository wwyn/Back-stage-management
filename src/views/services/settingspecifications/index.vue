<template>
  <div class="settingspecifications">
    <div class="title">
      <span></span>规格设置
    </div>
    <div class="pending">
      <p>规格设置</p>
      <div>
        <p @click="addnormsBtn">添加规格</p>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="item in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          />
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleNormsEdit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleNormsDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <p @click="addbatchingBtn">添加配料</p>
      </div>
      <div v-if="batchingTableData.length>0">
        <div class="dis-f">
          <p>配料名称</p>
          <p v-for="item in batchingTableData" :key="item.id">{{ item.name }}</p>
        </div>
        <div class="dis-f">
          <p>价格</p>
          <p v-for="item in batchingTableData" :key="item.id">{{ item.price }}</p>
        </div>
        <div class="dis-f tools">
          <p>操作</p>
          <p v-for="item in batchingTableData" :key="item.id">
            <el-button size="mini" @click="handleBatchingEdit(item.id)">编辑</el-button>
            <el-button size="mini" @click="handleBatchingDelete(item.id)">删除</el-button>
          </p>
        </div>
      </div>
    </div>
    <div v-if="showAddnorms" class="addnorms-modal">
      <div>
        <p>添加商品规格</p>
        <el-form :model="formAddnorms" label-width="80px" class="demo-form-inline">
          <el-form-item label="规格名称:">
            <el-input v-model="formAddnorms.name" placeholder="规格名称"></el-input>
          </el-form-item>
          <el-form-item label="规格值:">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 规格值</el-button>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button type="primary" @click="hendleAddnorms">确定</el-button>
            <el-button @click="hendleCancelnorms">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="showAddbatching" class="addnorms-modal">
      <div>
        <p>添加配料</p>
        <el-form
          :model="formAddbatching"
          :inline="true"
          label-width="80px"
          class="demo-form-inline"
        >
          <div v-for="(item,index) in batchingList" :key="index">
            <el-form-item label="配料名称:">
              <el-input v-model="item.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="配料值:">
              <el-input v-model="item.price" placeholder="价格"></el-input>
            </el-form-item>
          </div>
          <div v-if="showAddbatchingBtn">
            <el-form-item style="text-align: right;">
              <el-button type="primary" @click="addBatchingClick">添加配料</el-button>
            </el-form-item>
          </div>
          <div style="text-align: right;">
            <el-form-item style="text-align: right;">
              <el-button
                v-if="!showAddbatchingBtn"
                type="primary"
                @click="hendleRevisebatching"
              >修改确定</el-button>
              <el-button v-if="showAddbatchingBtn" type="primary" @click="hendleAddbatching">确定</el-button>
              <el-button @click="hendleCancelbatching">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      showAddnorms: false,
      showAddbatching: false,
      showAddbatchingBtn: true,
      tableData: [],
      columns: [],
      formAddnorms: {
        name: ""
      },
      formAddbatching: {
        name: "",
        price: ""
      },
      normsId: "",
      batchingList: [{ name: "", price: "" }],
      dynamicTags: [],
      specsTableData: [],
      batchingTableData: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  mounted() {
    this.getSpecsByShopId();
    this.getParts();
  },
  methods: {
    // 设置规格
    async setSpecValue(query) {
      try {
        const ret = await api.setSpecValue(query);
        if (ret.data.code == 200) {
          console.log("设置规格成功");

          this.showAddnorms = false;
          this.formAddnorms = {
            name: ""
          };
          this.dynamicTags = [];
          this.getSpecsByShopId();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除规格
    async delSpec(query) {
      try {
        const ret = await api.delSpec(query);
        if (ret.data.code == 200) {
          console.log("删除规格成功");
          this.getSpecsByShopId();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取规格列表
    async getSpecsByShopId() {
      const query = {
        shopId: 5
      };
      try {
        const ret = await api.getSpecsByShopId(query);
        console.log(ret, "获取规格列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.tableData = ret.data.data;
          const max = Math.max(
            ...this.tableData.map(item => item.values.length)
          );
          // 构建table数据
          this.columns = [{ label: "规格名称", prop: "specName" }];
          for (let i = 1; i <= max; i++) {
            this.columns.push({ label: `规格值${i}`, prop: `value${i}` });
          }          
          this.tableData.forEach(item => {
            const values = item.values.reduce(
              (obj, child, i) =>
                Object.assign(obj, { [`value${i + 1}`]: child.value }),
              {}
            );
            this.tableData.push({
              specName: item.spec,
              id: item.id,
              ...values
            });
          });
        } else {
          this.tableData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取规格值
    async getSpec(query) {
      try {
        const ret = await api.getSpec(query);
        if (ret.data.code == 200 && ret.data.data) {
          this.formAddnorms.name = ret.data.data.spec;
          this.normsId = ret.data.data.id;
          let arr = ret.data.data.values.map(item => {
            return item.value;
          });
          this.dynamicTags = arr;
        } else {
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取配料列表
    async getParts() {
      const query = {
        shopId: 5
      };
      try {
        const ret = await api.getParts(query);
        console.log(ret, "获取配料列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.batchingTableData = ret.data.data;
        } else {
          this.batchingTableData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 设置配料
    async setParts(query) {
      try {
        const ret = await api.setParts(query);
        if (ret.data.code == 200) {
          this.showAddbatching = false;
          this.showAddbatchingBtn = true;
          this.batchingList = [{ name: "", price: "" }];
          this.getParts();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 批量设置配料
    async batchAddParts(query) {
      try {
        const ret = await api.batchAddParts(query);
        if (ret.data.code == 200) {
          this.showAddbatching = false;
          this.batchingList = [{ name: "", price: "" }];
          this.getParts();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除配料
    async removeParts(query) {
      try {
        const ret = await api.removeParts(query);
        console.log(ret, "删除配料成功");
        if (ret.data.code == 200) {
          console.log("删除配料成功");
          this.getParts();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除配料
    handleBatchingDelete(id) {
      let query = {
        id,
        shopId: 5
      };
      this.removeParts(query);
    },
    // 获取配料详情
    async getPart(query) {
      try {
        const ret = await api.getPart(query);
        if (ret.data.code == 200) {
          console.log(ret.data.data, "获取配料详情");
          this.batchingList = [
            {
              name: ret.data.data.name,
              price: ret.data.data.price,
              id: ret.data.data.id
            }
          ];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑配料
    handleBatchingEdit(id) {
      this.showAddbatching = true;
      this.showAddbatchingBtn = false;
      this.getPart({ id: id });
    },
    // 配料修改确认
    hendleRevisebatching() {
      let query = {
        id: this.batchingList[0].id,
        name: this.batchingList[0].name,
        price: this.batchingList[0].price,
        shopId: 5
      };
      this.setParts(query);
    },
    // 添加规格按钮
    addnormsBtn() {
      this.normsId = "";
      this.showAddnorms = true;
    },
    // 编辑规格
    handleNormsEdit(options) {
      this.showAddnorms = true;
      let query = {
        id: options.id
      };
      this.getSpec(query);
    },
    // 删除规格
    handleNormsDelete(options) {
      let query = {
        id: options.id
      };
      this.delSpec(query);
    },
    // 设置规格
    hendleAddnorms() {
      if (this.normsId) {
        let query = {
          id: this.normsId,
          shopId: 5,
          spec: this.formAddnorms.name || "",
          values: this.dynamicTags || []
        };
        this.setSpecValue(query);
      } else {
        let query = {
          shopId: 5,
          spec: this.formAddnorms.name || "",
          values: this.dynamicTags || []
        };
        this.setSpecValue(query);
      }
    },
    hendleCancelnorms() {
      this.showAddnorms = false;
      this.formAddnorms = {
        name: ""
      };
      this.dynamicTags = [];
      console.log("取消");
    },
    // 添加配料按钮
    addbatchingBtn() {
      this.showAddbatching = true;
    },
    // 设置配料
    hendleAddbatching() {
      console.log(this.batchingList, "添加配料");
      let query = {
        values: this.batchingList,
        shopId: 5
      };
      this.batchAddParts(query);
    },
    hendleCancelbatching() {
      this.showAddbatching = false;
      this.batchingList = [{ name: "", price: "" }];
    },
    addBatchingClick() {
      this.batchingList.push({ name: "", price: "" });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.settingspecifications {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 28px;
    padding-bottom: 10px;
    border-bottom: 1px solid #999;
    span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: @color;
      margin-right: 8px;
      vertical-align: sub;
    }
  }
  .pending {
    border: 1px solid #999;
    margin-top: 20px;
    padding: 0 0 20px;
    > p {
      background-color: #f1f1f1;
      padding: 16px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
    }
    > div {
      padding: 20px 20px 0;
      box-sizing: border-box;
      > p {
        display: inline-block;
        background-color: @color;
        color: #fff;
        padding: 10px 20px;
        border-radius: 2px;
      }
    }
  }
  .addnorms-modal {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(143, 143, 143, 0.5);
    > div {
      width: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 2px;
      form {
        padding: 20px;
        box-sizing: border-box;
      }
      p {
        padding: 16px 20px;
        box-sizing: border-box;
        background-color: #f1f1f1;
      }
      .el-input {
        width: 100px;
        height: 40px;
        /deep/ input {
          width: 100px;
          height: 40px;
        }
      }
    }
    .el-tag {
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px dashed #999;
      margin-bottom: 20px;
      color: @color;
      margin-right: 10px;
    }
    .el-tag /deep/ .el-icon-close {
      color: @color;
    }
    .el-tag + .el-tag {
      height: 40px;
      line-height: 40px;
      margin-right: 10px;
      background-color: #fff;
    }
    .button-new-tag {
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
      width: 100px;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: top;
    }
    .el-button--primary {
      background-color: @color;
      color: #fff;
    }
  }
  .tools {
    p {
      border-bottom: 1px solid #ebeef5;
    }
  }
  .dis-f {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p:nth-child(1) {
      border-left: 1px solid #ebeef5;
    }
    p {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
    }
    .el-button {
      border: none;
      color: @color;
      padding: 0;
    }
  }
  table {
    .el-button {
      border: none;
      color: @color;
    }
  }
}
</style>

