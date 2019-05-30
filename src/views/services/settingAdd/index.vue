<template>
  <div class="setting-add">
    <div class="title">
      <span></span>配送添加分类
    </div>
    <div class="pending">
      <p>添加分类</p>
      <div>
        <el-form
          :model="categoryForm"
          :rules="rules"
          ref="categoryForm"
          label-width="100px"
          class="demo-categoryForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="categoryForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" prop="superior">
            <el-select v-model="categoryForm.superior" placeholder="不选择分类默认为顶级分类">
              <el-option label="一级" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="categoryForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-radio-group v-model="categoryForm.show">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类描述" prop="desc">
            <el-input type="textarea" v-model="categoryForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('categoryForm')">提交</el-button>
          </el-form-item>
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
      categoryForm: {
        name: "",
        superior: "",
        sort: "",
        show: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    console.log(this.$route.params.options);
    if (this.$route.params.options) {
      this.categoryForm = {
        name: this.$route.params.options.categoryName || "",
        superior: "1",
        sort: this.$route.params.options.sortBy || "",
        show: this.$route.params.options.activate.toString(),
        desc: this.$route.params.options.description || ""
      };
    }
  },
  methods: {
    // 增删改分类
    async addProductCategory(query) {
      const data = {
        ...query,
        categoryName: this.categoryForm.name || "",
        pid: 0,
        shopId: 5,
        description: this.categoryForm.desc || "",
        sortBy: this.categoryForm.sort || "",
        activate: this.categoryForm.show || ""
      };
      try {
        const ret = await api.addProductCategory(data);
        console.log(ret);
        if (ret.data.code == 200) {
          this.$router.push({
            name: "servicesSetting"
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    submitForm() {
      if (this.$route.params.options) {
        let query = {
          id: this.$route.params.options.id
        };
        this.addProductCategory(query);
      } else {
        let query = {};
        this.addProductCategory(query);
      }
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


