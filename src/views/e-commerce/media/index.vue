<template>
  <div class="media">
    <div class="title">
      <span></span>多媒体库
    </div>
    <div class="memory">全部文件（已用1600M/20G）</div>
    <div class="tools">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
        :on-success="handleSuccess"
      >
        <el-button slot="trigger" size="small" type="success" @click="submitUpload">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" @click="delUpload">删除文件</el-button>
      </el-upload>
    </div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="(item,index) in fileimgList" :label="item" :key="index">
        <div class="media-img">
          <img :src="item.url" alt>
        </div>
        <span class="media-title">{{ item.name }}</span>
      </el-checkbox>
    </el-checkbox-group>
     <el-pagination
      class="current-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="100"
      layout="total, prev, pager, next, jumper"
      :total="20">
    </el-pagination>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      fileimgList:[
        { name:'图片',url:'http://editor.static.cceato.com/editor/static/cceatio/summer-island1.png',id:1},
        { name:'图片2',url:'http://editor.static.cceato.com/editor/static/cceatio/summer-gelato.png',id:2},
        { name:'图片3',url:'http://editor.static.cceato.com/editor/static/cceatio/summer-sea.png',id:3},
        { name:'图片4',url:'http://editor.static.cceato.com/editor/static/cceatio/summer-amusement.png',id:4}],
      isIndeterminate: true,
      ids:[],
      currentPage: 1,
    };
  },
  methods: {
    // 上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 删除文件
    delUpload() {
      let ids = this.checkedCities.map(item => {
        return item.id
      })
    },
    // 文件上传
    handleSuccess(response, file, fileList) {
      this.fileimgList.push({
         name: file.name, url: response.data[0]
      })
    },
    // 多选
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.fileimgList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      this.ids = value.map(item => {
        return item.id
      })
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.fileimgList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.fileimgList.length;
    },
    // 分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.media {
  font-size: 14px;
  overflow: hidden;
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
      vertical-align: text-bottom;
    }
  }
  .memory {
    margin: 30px 0;
  }
  .tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      padding: 8px 16px;
      border: none;
      background-color: #F1F1F1;
      box-sizing: border-box;
    }
    button:nth-child(1) {
      background-color: @color;
      margin-right: 10px;
      color: #fff;
    }
  }
  .media-img {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px solid #F1F1F1;
    margin-bottom: 6px;
    line-height: 120px;
    text-align: center;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .media-title {
    display: inline-block;
    width: 120px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  /deep/ .el-checkbox {
    margin-right: 16px;
  } 
  /deep/ .el-checkbox__label {
    padding-left: 0;
  }
  /deep/ .el-checkbox__input {
    position: absolute;
    top: 0;
    left: 0;
  }
  /deep/ .el-checkbox__input.is-indeterminate {
    position: relative;
    margin-right: 10px;
  }
  /deep/ .el-checkbox-group {
    margin-top: 23px;
  }
  /deep/ .el-upload-list {
    display: none;
  }
  // 分页
  .current-page {
    margin-top: 44px;
    text-align: center;
  }
  /deep/ .el-pagination__editor.el-input {
    margin: 0 10px;
  }
}
</style>


