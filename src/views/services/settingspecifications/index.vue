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
          <el-table-column prop="name" label="规格名称" width="100"></el-table-column>
          <el-table-column prop="amount1" width="100" label="规格值 1"></el-table-column>
          <el-table-column prop="amount2" width="100" label="规格值 2"></el-table-column>
          <el-table-column prop="amount3" width="100" label="规格值 3"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      showAddnorms: false,
      formAddnorms: {
        name: "",
      },
      dynamicTags: [],
      tableData: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    addnormsBtn() {
      this.showAddnorms = true;
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
    hendleAddnorms() {
      console.log(this.formAddnorms, this.dynamicTags, "添加规格");
      this.showAddnorms = false;
      this.formAddnorms = {
        name: "",
      };
      this.dynamicTags = [];
    },
    hendleCancelnorms() {
      this.showAddnorms = false;
      this.formAddnorms = {
        name: "",
      };
      this.dynamicTags = [];
      console.log("取消");
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
    > p {
      background-color: #f1f1f1;
      padding: 16px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
    }
    > div {
      padding: 20px;
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
}
</style>

