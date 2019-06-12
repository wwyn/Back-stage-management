<template>
  <div class="classification">
    <div class="title">
      <span></span>分类管理
    </div>
    <div class="titlebox">
      <div class="classification-one" @click="addclassType('一')">新增一级分类</div>
      <div class="open-btn">
        <el-button
          type="primary"
          @click="foldList = []"
          :disabled="foldList.length === 0"
          size="small"
        >全部展开</el-button>
        <span>|</span>
        <el-button
          type="primary"
          @click="foldList = foldAllList"
          :disabled="foldList === foldAllList"
          size="small"
        >全部折叠</el-button>
      </div>
    </div>
    <el-table :data="tableListData" :row-style="toggleDisplayTr" border stripe class="init_table">
      <el-table-column
        label="分类名称"
        width="416"
        show-overflow-tooltip
        align="left"
        class="class-name"
      >
        <template slot-scope="scope">
          <p
            :style="
              `margin-left: ${scope.row.__level * 44}px;margin-top:0;margin-bottom:0; text-align:left`
            "
            :class="{active:scope.row.__level>0}"
          >
            <i
              @click="toggleFoldingStatus(scope.row)"
              class="permission_toggleFold"
              :class="toggleFoldingClass(scope.row)"
            ></i>
            {{ scope.row.categoryName }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="left" width="176" label="分类图片">
        <template slot-scope="scope">
          <div class="class-img" @mouseover="showBigImg(scope)" @mouseout="outBigImg(scope)">
            <img :src="scope.row.icon" alt>
          </div>
          <div class="showBigImg" v-if="scope.$index == bigImgIndex">
            <img :src="scope.row.icon" alt>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="168" align="left" label="移动">
        <template slot-scope="scope">
          <i v-if="scope.row.__level < 1" class="move iconfont icon-zhiding" @click="handleSort(scope.row.id,'top')"></i>
          <i class="move iconfont icon-shangyi" @click="handleSort(scope.row.id,'up')"></i>
          <i class="move iconfont icon-xiayi" @click="handleSort(scope.row.id,'down')"></i>
          <i v-if="scope.row.__level < 1" class="move iconfont icon-zhidi" @click="handleSort(scope.row.id,'bottom')"></i>
        </template>
      </el-table-column>
      <el-table-column width="136" align="left" label="数量" prop="depth"/>

      <el-table-column align="left" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.__level <= 1"
            size="mini"
            type="text"
            @click="addclassType(scope.row.__level==0?'二':'三',scope.row)"
          >新增</el-button>
          <el-button @click="handleRevise(scope.row)" size="mini" type="text">修改</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="showModal" class="modal">
      <div v-if="!isDel" class="modal-box">
        <div class="modal-title center">请添加分类及图片</div>
        <el-form ref="form" :model="form">
          <el-form-item class="class-input">
            <el-input v-model="form.classname" :placeholder="type + '级类别名称'"></el-input>
            <el-upload
              class="avatar-uploader"
              action="http://192.168.1.23:18899/sfy-resource/resource/upload"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="this.form.dialogImageUrl" :src="this.form.dialogImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="class-input">
            <el-button type="primary" @click="onSubmit(`${isAdd?'新建':'修改'}`)">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="isDel" class="modal-del">
        <p class="prompt">无法进行删除</p>
        <P class="prompt">所要删除分类存在子级目录或者商品，</P>
        <p class="prompt">请删除或移除分类内商品再试。</p>
        <p class="prompt-btn" @click="handleKnow">我知道了</p>
      </div>
    </div>
  </div>
</template>
<script>
let id = 1000;
import Vue from "vue";
import * as api from "@/api";
export default {
  data() {
    return {
      type: "",
      form: {
        code: "",
        classname: "",
        desc: "",
        dialogImageUrl: ""
      },
      pid: 0,
      reviseId: Number,
      showModal: false,
      dialogImageUrl: "",
      dialogVisible: false,
      isAdd: true,

      // 分类管理数据
      tableListData: [], // tableListData 展示数据的data
      foldList: [], // 该数组中的值 都会在列表中进行隐藏  死亡名单
      isDel: false,
      isShowBigImg: false,
      bigImgIndex: -1
    };
  },
  computed: {
    foldAllList() {
      return this.tableListData.map(x => x.__identity);
    }
  },
  filters: {
    levelFormat(value) {
      if (value > 1) return "";
      return value === 0 ? "二" : "三";
    }
  },
  mounted: function() {
    this.categoryList();
  },

  methods: {
    // 获取分类列表
    async categoryList() {
      const query = {};
      try {
        const ret = await api.categoryList(query);
        this.tableListData = this.formatConversion(
          [],
          ret.data.data.categories
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除分类
    async categoryListDel(data) {
      const _data = {
        id: data
      };
      try {
        let ret = await api.categoryListDel(_data);
        if (ret.data.code == 200) {
          this.categoryList();
        } else if (ret.data.code == 400) {
          this.showModal = true;
          this.isDel = true;
        } else if (ret.data.code == 100) {
          console.log(ret.data.msg);
        }
      } catch (err) {
        alert(err);
      }
    },
    // 新建分类
    async addProductCategory(data) {
      const options = {
        ...data,
        categoryName: this.form.classname,
        categoryCode: this.form.code,
        description: this.form.desc,
        icon: this.form.dialogImageUrl
      };
      try {
        const ret = await api.addProductCategory(options);
        console.log(ret, "新建");
        if (ret.data.code == 200) {
          this.categoryList();
          console.log("gengxin");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 移动
    async categorySort(data) {
      try {
        const ret = await api.categorySort(data);
        console.log(ret,'移动')
        if (ret.data.code == 200) {
          console.log('移动成功')
          this.categoryList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 移动
    handleSort(id, type) {
      console.log(id,type,'排序参数');
      let options = {
        categoryId: id,
        type: type
      };
      this.categorySort(options);
    },
    // 点击图片放大
    showBigImg(options) {
      this.bigImgIndex = options.$index;
    },
    outBigImg() {
      this.bigImgIndex = -1;
    },

    // 上传一级图标部分
    handleAvatarSuccess(res, file) {
      console.log(res.data[0], file, "上传的图片");
      this.form.dialogImageUrl = res.data[0];
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.response.data[0];
      this.dialogVisible = true;
    },
    //   模态框的显示，隐藏，提交
    cancel() {
      this.showModal = false;
      this.form = {
        code: "",
        classname: "",
        desc: "",
        dialogImageUrl: ""
      };
    },
    onSubmit(sign) {
      if (sign == "修改") {
        let _id_ = {
          pid: this.reviseId,
          id: this.pid
        };
        this.addProductCategory(_id_);
      } else {
        let _id_ = {
          pid: this.pid
        };
        this.addProductCategory(_id_);
      }
      this.showModal = false;
      this.form = {
        code: "",
        classname: "",
        desc: "",
        dialogImageUrl: ""
      };
    },
    // 删除提醒
    handleKnow() {
      this.showModal = false;
    },
    // 添加
    addclassType(num, content) {
      this.isAdd = true;
      this.type = num;
      this.showModal = true;
      this.isDel = false;
      if (num == "一") {
        this.pid = 0;
      }
      if (content) {
        this.pid = content.id;
      }
    },
    // 修改
    handleRevise(type) {
      console.log(type, "修改");
      this.reviseId = type.pid;
      this.isAdd = false;
      this.showModal = true;
      this.isDel = false;
      this.pid = type.id;
      if (type.depth == 0) {
        this.type = "一";
      } else if (type.depth == 1) {
        this.type = "二";
      } else if (type.depth == 2) {
        this.type = "三";
      }
      this.form = {
        code: type.depth,
        classname: type.categoryName,
        desc: type.categoryNameEn,
        dialogImageUrl: type.icon
      };
    },
    // 删除
    handleDelete(data) {
      let _id = data.id;
      this.categoryListDel(_id);
    },

    // 分类管理的逻辑

    toggleFoldingStatus(params) {
      this.foldList.includes(params.__identity)
        ? this.foldList.splice(this.foldList.indexOf(params.__identity), 1)
        : this.foldList.push(params.__identity);
    },

    toggleDisplayTr({ row, index }) {
      for (let i = 0; i < this.foldList.length; i++) {
        let item = this.foldList[i];
        // 如果foldList中元素存在于 row.__family中，则该行隐藏。  如果该行的自身标识等于隐藏元素，则代表该元素就是折叠点
        if (row.__family.includes(item) && row.__identity !== item)
          return "display:none;";
      }
      return "";
    },

    toggleFoldingClass(params) {
      return params.depth > 1
        ? "iconfont icon-fenleiguanlian"
        : this.foldList.indexOf(params.__identity) === -1
        ? "iconfont icon-gongjutianjia"
        : "iconfont icon-gongjushanchu";
    },

    formatConversion(
      parent,
      subclass,
      index = 0,
      family = [],
      elderIdentity = "x"
    ) {
      // subclass如果长度等于0，则代表已经到了最低层
      // let page = (this.startPage - 1) * 10
      if (subclass || [].length > 0) {
        subclass.map((x, i) => {
          // 设置 __level 标志位 用于展示区分层级
          Vue.set(x, "__level", index);
          // 设置 __family 为家族关系 为所有父级，包含本身在内
          Vue.set(x, "__family", [...family, elderIdentity + "_" + i]);
          // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
          Vue.set(x, "__identity", elderIdentity + "_" + i);
          parent.push(x);
          // 如果仍有子集，则进行递归
          if (x.subclass || [].length > 0)
            this.formatConversion(
              parent,
              x.subclass,
              index + 1,
              [...family, elderIdentity + "_" + i],
              elderIdentity + "_" + i
            );
        });
      }
      return parent;
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;

.classification {
  .title {
    font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Helvetica,
      NotoSansCJK-Regular, Helvetica Neue, Helvetica, Sans-serif, Arial,
      Droid Sans;
    font-size: 14px;
    color: #101010;
    padding-bottom: 10px;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: @color;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
}
\deep\ .el-table__body-wrapper {
  overflow: initial;
}
.showBigImg {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 9998;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.class-name {
  padding-left: 44px;
}
.has-gutter {
  tr {
    th:nth-child(1) {
      padding-left: 90px;
    }
  }
}
.titlebox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .open-btn {
    span {
      margin: 0 8px;
    }
    button {
      background-color: #fff;
      border: none;
      font-size: 14px;
      color: #101010;
      padding: 0;
      margin: 0;
    }
  }
}

// 分类图片
.class-img {
  width: 30px;
  height: 30px;
  border: 1px solid #e8e8e8;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.positionInput {
  input {
    border: none;
    padding: 0;
  }
}
/deep/ .el-table--enable-row-transition .el-table__body td {
  border: none;
  border-bottom: 1px solid #e8e8e8;
  padding: 7px 0;
}
.el-table td,
.el-table th {
  padding: 8px;
}
/deep/ .el-table th > .cell {
  font-size: 14px;
  color: #101010;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #fff;
}

.classification-one {
  width: 124px;
  height: 36px;
  background: #1260fb;
  border: 2px solid #1260fb;
  border-radius: 2px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  border-radius: 2px;
}
.el-button--primary.is-disabled,
.el-button--primary.is-disabled:active,
.el-button--primary.is-disabled:focus,
.el-button--primary.is-disabled:hover {
  color: #666 !important;
}
.el-table--border {
  border: none;
}
/deep/.el-table--border th {
  padding: 8px 0;
  background-color: #F1F1F1 !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
//   模态框部分
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  .modal-del {
    width: 400px;
    height: 216px;
    background: #ffffff;
    box-shadow: 0 0 1px 0 #666666;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -108px;
    margin-left: -200px;
    padding: 40px 80px;
    box-sizing: border-box;
    .prompt {
      font-size: 13px;
      color: #333333;
      text-align: center;
      line-height: 18px;
    }
    .prompt:nth-child(1) {
      font-size: 15px;
      color: #333333;
      margin-bottom: 14px;
    }
    .prompt:nth-child(3) {
      margin-bottom: 24px;
    }
    .prompt-btn {
      width: 96px;
      height: 36px;
      background: #1260fb;
      border: 2px solid #1260fb;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      margin: auto;
    }
  }
  .modal-box {
    width: 400px;
    height: 216px;
    background: #ffffff;
    box-shadow: 0 0 1px 0 #666666;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -108px;
    margin-left: -200px;
    padding: 40px 100px;
    box-sizing: border-box;

    .modal-title {
      margin-bottom: 22px;
      font-size: 14px;
      font-size: 15px;
      color: #333333;
    }
  }
  .class-input {
    margin-bottom: 22px;
    /deep/ .el-form-item__content {
      display: flex;
      .avatar-uploader {
        margin-left: 10px;
        width: 30px;
        height: 30px;
        .el-upload {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 0;
        }
      }
    }
    .el-input {
      width: 160px;
      height: 30px;
      /deep/ .el-input__inner {
        height: 30px;
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-button--primary {
    width: 68px;
    height: 36px;
    margin-left: 20px;
    background: #1260fb;
    border: none;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .el-button + .el-button {
    border-radius: 2px;
    font-size: 14px;
    color: #ffffff;
  }
}
.el-button--text {
  color: #1260fb;
}
// 上传图片
.avatar-uploader-icon {
  border: 1px dashed #999;
  font-size: 12px;
  color: #999;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-sizing: border-box;
}
.avatar {
  width: 30px;
  height: 30px;
  display: block;
  margin-top: 5px;
}
.modal .el-button + .el-button {
  width: 68px;
  height: 36px;
  background: #f1f1f1;
  border-radius: 2px;
  font-size: 14px;
  color: #101010;
  margin-left: 24px;
}
.el-upload {
  .el-upload--picture-card {
    width: 118px;
    height: 32px;
    line-height: 32px;
    background: #1260fb;
    border-radius: 2px;
    border: 1px solid #d8d8d8;
    i {
      vertical-align: middle;
      font-size: 12px;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 32px;
    height: 32px;
  }
}
.moren-image {
  width: 32px;
  height: 32px;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
}
.permission_toggleFold {
  font-size: 14px;
  margin-right: 24px;
  margin-left: 44px;
}

.el-table .cell.el-tooltip input {
  border: none;
  font-size: 20px;
}
// 移动
.move {
  font-size: 12px;
  color: #101010;
  margin: 0 10px;
}
</style>
