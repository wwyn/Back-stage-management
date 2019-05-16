<template>
  <div>
    <el-form :inline="true" :model="formInline" ref="formInline" class="classform">
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="formInline.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品ID" prop="ID" class="input-one">
        <el-input v-model="formInline.ID" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="name" class="input-one">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" class="input-two">
        <el-input v-model="formInline.minMoney" placeholder="￥"></el-input>
        <span>-</span>
        <el-input v-model="formInline.maxMoney" placeholder="￥"></el-input>
      </el-form-item>
      <el-form-item label="商品销量" class="input-two input-one">
        <el-input v-model="formInline.minNumber" placeholder="请输入"></el-input>
        <span>-</span>
        <el-input v-model="formInline.maxNumber" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item class="query">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "search",
  props: {
    formInline: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
        
    };
  },
  methods:{
      handleSearch() {
          this.$emit("handleSearch", this.formInline)
      },
      resetForm() {
          this.$emit("resetForm", 'formInline')
      }
  }
};
</script>
<style lang="less" scoped>
.classform {
  .input-one {
    margin-left: 34px;
  }
  .input-two {
    .el-input {
      width: 120px;
      height: 40px;
    }
    span {
      margin: 0 10px;
    }
  }
  .el-radio-group {
    margin-bottom: 22px;
  }
}
.query {
  position: absolute;
  right: 0;
  .el-button {
    width: 80px;
    background: #f1f1f1;
    border: 1px solid #999999;
    border-radius: 2px;
    height: 40px;
    color: #010101;
  }
  .el-button--primary {
    margin-right: 20px;
  }
}
.el-input {
  width: 270px;
  height: 40px;
}
.el-form-item {
    margin-right: 0;
}
</style>


