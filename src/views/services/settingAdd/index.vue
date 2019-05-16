<template>
  <div class="setting-add">
    <div class="title">
      <span></span>配送添加分类
    </div>
    <div class="pending">
      <p>添加分类</p>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" prop="superior">
            <el-select v-model="ruleForm.superior" placeholder="不选择分类默认为顶级分类">
              <el-option label="一级" value="一级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-radio-group v-model="ruleForm.show">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      ruleForm: {
        name: "",
        superior: "",
        sort: "",
        show: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
        this.$router.push({
            name:'servicesSetting'
        })
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.setting-add {
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
  .pending {
    border: 1px solid #999;
    margin-top: 20px;
    p {
      background-color: #f1f1f1;
      padding: 16px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
    }
    > div {
        text-align: center;
      .el-form {
        display: inline-block;
        margin: 50px auto;
        .el-input {
          width: 300px;
        }
        .el-select {
          width: 300px;
        }
        /deep/ .el-textarea__inner {
          width: 300px;
        }
         /deep/ .el-button--primary {
            background-color: @color;
        }
      }
    }
  }
}
</style>


