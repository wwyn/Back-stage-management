<template>
  <div class="dispose">
    <div class="title">
      <span></span>APP配置
    </div>
    <div class="contant">
      <p>首页广告配置</p>
      <div>
        <p @click="haneldeBannerAdd">添加banner</p>
        <el-table
          v-loading="bannerLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableBannerData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号" width="110" align="center"></el-table-column>
          <el-table-column prop="title" label="广告名称" width="160" align="center"></el-table-column>
          <el-table-column label="广告图片" width="110" align="center">
            <template slot-scope="scope">
              <img class="brandImg" :src="scope.row.appFileUrl" alt>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="170" align="center">
            <template slot-scope="scope">
              <p>{{ parseTime(scope.row.beginShowTime) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="170" align="center">
            <template slot-scope="scope">
              <p>{{ parseTime(scope.row.endShowTime) }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="上线/下线" width="110" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.status.toString()"
                active-value="1"
                inactive-value="0"
                active-color="#1260fb"
                @change="handleBrandChange($event,scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleBannerEditor(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleBannerTop(scope.row)">置顶</el-button>
              <el-button @click="handleDelBanner(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="contant">
      <p>商家分类配置</p>
      <div>
        <p @click="haneldeTypeAdd">添加分类</p>
        <el-table
          v-loading="typeLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableTypeData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号" width="150" align="center"></el-table-column>
          <el-table-column label="分类图片" width="150" align="center">
            <template slot-scope="scope">
              <img class="brandImg" :src="scope.row.icon" alt>
            </template>
          </el-table-column>
          <el-table-column prop="categoryName" label="分类名称" width="180" align="center"></el-table-column>
          <el-table-column prop="brandName" label="是否显示" width="150" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.status.toString()"
                active-value="1"
                inactive-value="0"
                active-color="#1260fb"
                @change="handleTypeChange($event,scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sortBy" label="分类排序" width="150" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleTypeEditor(scope.row)">编辑</el-button>
              <el-button @click="handleDelType(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="contant">
      <p>品牌商家直供配置</p>
      <div>
        <p @click="haneldeSelectStore">选择商家</p>
        <el-table
          v-loading="storeLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableStoreData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="商家名称" width="280" align="center"></el-table-column>
          <el-table-column label="是否推荐" width="180" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.status.toString()"
                active-value="1"
                inactive-value="0"
                active-color="#1260fb"
                @change="handleStoreChange($event,scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sortBy" label="排序" width="150" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDelStore(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="contant">
      <p>甄选推荐配置</p>
      <div>
        <p @click="haneldeSelectStoreVip">选择商家</p>
        <el-table
          v-loading="VIPstoreLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :data="tableVIPStoreData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="商家名称" width="280" align="center"></el-table-column>
          <el-table-column prop="brandName" label="是否推荐" width="180" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.status.toString()"
                active-value="1"
                inactive-value="0"
                active-color="#1260fb"
                @change="handleVipStoreChange($event,scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sortBy" label="排序" width="150" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDelVipStore(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-box">
        <div v-if="showType" class="modal-type">
          <p>添加分类</p>
          <div>
            <el-form
              :model="typeForm"
              :rules="rules"
              ref="typeForm"
              label-width="100px"
              class="demo-typeForm"
            >
              <el-form-item label="类型名称" prop="name">
                <el-input v-model="typeForm.name"></el-input>
                <p class="tips">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</p>
              </el-form-item>
              <el-form-item label="分类图标" prop="file">
                <el-upload
                  class="upload-demo"
                  action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="是否显示" prop="show">
                <el-switch
                  v-model="typeForm.show"
                  active-value="1"
                  inactive-value="0"
                  active-color="#1260fb"
                ></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitTypeForm">确认</el-button>
                <el-button @click="cancelTypeForm">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-if="showStore" class="modal-store">
          <p>选择品牌</p>
          <div>
            <el-input placeholder="请输入商家名称" v-model="searchStore" class="input-with-select">
              <el-button @click="handleSearchStore" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-table
              :data="storeList"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column prop="shopName" label="品牌名称" width="380"></el-table-column>
              <el-table-column type="selection"></el-table-column>
            </el-table>
            <pagination
              :page-size="pageSize"
              :current-page="currentPage"
              :total="total"
              @handleCurrentChange="handleCurrentChange"
            ></pagination>
            <div v-if="isVip" class="btn">
              <el-button type="primary" @click="submitSelectStore">确认</el-button>
              <el-button @click="cancelSearchStore">取消</el-button>
            </div>
            <div v-if="!isVip" class="btn">
              <el-button type="primary" @click="submitSelectVipStore">确认</el-button>
              <el-button @click="cancelSearchStore">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import { parseTime } from "@/utils";
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      bannerLoading: false,
      typeLoading: false,
      storeLoading: false,
      VIPstoreLoading: false,
      tableBannerData: [],
      tableTypeData: [],
      tableStoreData: [],
      storeList: [],
      tableVIPStoreData: [],
      typeForm: {
        name: "",
        img: "",
        show: "0"
      },
      rules: {
        name: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        file: [
          { required: true, message: "请选择上传广告图片", trigger: "change" }
        ]
      },
      fileList: [],
      typeId: "",
      showModal: false,
      showType: false,
      searchStore: "",
      showStore: true,
      shopIds: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isVip: Boolean,
    };
  },
  components: {
    pagination
  },
  mounted() {
    this.getPageList();
    this.getCategoriesList();
    this.getVipShops();
    this.getCheckShops();
  },
  methods: {
    parseTime,
    //   广告配置
    // 获取广告列表
    async getPageList() {
      const query = {
        position: "home_banner"
      };
      try {
        const ret = await api.getPageList(query);
        console.log(ret, "广告列表");
        if (ret.data.code == 200 && ret.data.data) {
          this.bannerLoading = false;
          this.tableBannerData = ret.data.data.pageData;
        } else {
          this.bannerLoading = false;
          this.tableBannerData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 置顶
    async setTop(data) {
      try {
        const ret = await api.setTop(data);
        if (ret.data.code == 200) {
          this.getPageList();
        } else {
          alert("置顶失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除
    async removeById(data) {
      try {
        const ret = await api.removeById(data);
        if (ret.data.code == 200) {
          this.getPageList();
        } else {
          alert("删除失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 上下线
    async setStatus(data) {
      try {
        const ret = await api.setStatus(data);
        if (ret.data.code == 200) {
          this.getPageList();
        } else {
          alert("上下线");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 添加banner
    haneldeBannerAdd() {
      this.$router.push({
        name: "servicesAdverthome"
      });
    },
    // 上下线
    handleBrandChange(val, options) {
      const query = {
        id: options.id,
        status: +val
      };
      this.setStatus(query);
    },
    //编辑
    handleBannerEditor(options) {
      this.$router.push({
        name: "servicesAdverthome",
        params: {
          id: options.id
        }
      });
    },
    // 置顶
    handleBannerTop(options) {
      let data = {
        id: options.id
      };
      this.setTop(data);
    },
    // 删除
    handleDelBanner(options) {
      let data = {
        id: options.id
      };
      this.removeById(data);
    },
    //   分类配置
    // 获取商家分类列表
    async getCategoriesList() {
      const query = {
        module: "shop"
      };
      try {
        const ret = await api.getCategoriesList(query);
        console.log(ret, "商家分类");
        if (ret.data.code == 200 && ret.data.data) {
          this.typeLoading = false;
          this.tableTypeData = ret.data.data;
        } else {
          this.typeLoading = false;
          this.tableTypeData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 是否显示
    async setShow(query) {
      try {
        const ret = await api.setShow(query);
        console.log(ret, "是否显示");
        this.getCategoriesList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 添加分类
    async categoriesSet(query) {
      let _query = {
        ...query,
        pid: 0,
        icon: this.typeForm.img || "",
        categoryName: this.typeForm.name || "",
        status: this.typeForm.show || "",
        module: "shop"
      };
      try {
        const ret = await api.categoriesSet(_query);
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showType = false;
          this.showStore = false;
          this.typeId = "";
          this.typeForm = {
            name: "",
            img: "",
            show: "0"
          };
        }
        console.log(ret, "添加分类");
        this.getCategoriesList();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除分类
    async categoriesRemove(query) {
      try {
        const ret = await api.categoriesRemove(query);
        if (ret.data.code == 200) {
          this.getCategoriesList();
        } else {
          alert("分类删除失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 获取分类详情
    async getCategoriesById(query) {
      try {
        const ret = await api.getCategoriesById(query);
        if (ret.data.code == 200) {
          this.typeId = ret.data.data.id;
          this.fileList = [{ name: "分类图标", url: ret.data.data.icon }];
          this.typeForm = {
            name: ret.data.data.categoryName || "",
            img: ret.data.data.icon || "",
            show: ret.data.data.status.toString() || "0"
          };
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 是否显示
    handleTypeChange(val, options) {
      const query = {
        id: options.id,
        status: +val
      };
      this.setShow(query);
    },
    // 添加分类
    haneldeTypeAdd() {
      this.showModal = true;
      this.showType = true;
      this.showStore = false;
    },
    // 添加分类确认
    submitTypeForm() {
      if (this.typeId !== "") {
        let query = {
          id: this.typeId
        };
        this.categoriesSet(query);
      } else {
        this.categoriesSet({});
      }
    },
    // 添加分类取消
    cancelTypeForm() {
      this.showModal = false;
      this.showType = false;
       this.showStore = false;
      this.typeId = "";
      this.typeForm = {
        name: "",
        img: "",
        show: "0"
      };
    },
    //   编辑分类
    handleTypeEditor(options) {
      this.showModal = true;
      this.showType = true;
      this.showStore = false;
      let query = {
        id: options.id
      };
      this.getCategoriesById(query);
    },
    // 删除分类
    handleDelType(options) {
      let query = {
        id: options.id
      };
      this.categoriesRemove(query);
    },
    handleSuccess(file, fileList) {
      this.typeForm.img = file.data[0];
      console.log(file.data[0]);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 品牌商家
    // 商家列表
    async getShopList(query) {
      try {
        const ret = await api.getShopList(query);
        console.log(ret,'商家列表')
        if (ret.data.code == 200 && ret.data.data) {
          this.storeList = ret.data.data.pageData;
          this.total = ret.data.data.totalCount;
        } else {
          this.storeList = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 品牌商家列表
    async getVipShops(query) {
      try {
        const ret = await api.getVipShops(query);
        if (ret.data.code == 200 && ret.data.data) {
          this.storeLoading = false;
          this.tableStoreData = ret.data.data;
        } else {
          this.typeLoading = false;
          this.tableStoreData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 移除推荐
    async recommendRemove(query) {
      try {
        const ret = await api.recommendRemove(query);
        if (ret.data.code == 200) {
          this.getVipShops();
        } else {
          console.log("移除失败");
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 设置推荐
    async setRecommend(query,val) {
      try {
        const ret = await api.setRecommend(query);
        if (ret.data.code == 200) {
          if(val == 1) {
            this.getVipShops();
          } else {
            this.getCheckShops();
          }
          
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 选择品牌商家
    async addVipShops(query) {
      try {
        const ret = await api.addVipShops(query);
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showStore = false;
          this.showType = false;
          this.shopIds = [];
          this.getVipShops();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 移除推荐
    handleDelStore(options) {
      const query = {
        id: options.id
      };
      this.recommendRemove(query);
    },
    // 是否推荐
    handleStoreChange(val, options) {
      let query = {
        id: options.id,
        status: +val
      };
      this.setRecommend(query,'1');
    },
    // 选择商家
    haneldeSelectStore() {
      this.showModal = true;
      this.showStore = true;
      this.showType = false;
      this.isVip = true;
      this.getShopList({ vip: 1 });
    },
    handleSelectionChange(val) {
      this.shopIds = val.map(item => {
        return item.id;
      });
    },
    // 搜索商家
    handleSearchStore() {
      let query = {
        vip: 1,
        name: this.searchStore,
        currentPage: 1,
      };
      this.getShopList(query);
    },
    // 选择确认
    submitSelectStore() {
      let query = {
        shopIds: this.shopIds
      };
      this.addVipShops(query);
    },
    // 取消选择
    cancelSearchStore() {
      this.showModal = false;
      this.showStore = false;
      this.showType = false;
      this.shopIds = [];
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    // 甄选商家
    // 获取列表
    async getCheckShops(query) {
      try {
        const ret = await api.getCheckShops(query);
        console.log(ret,'甄选列表')
        if (ret.data.code == 200 && ret.data.data) {
          this.VIPstoreLoading = false;
          this.tableVIPStoreData = ret.data.data;
        } else {
          this.VIPstoreLoading = false;
          this.tableVIPStoreData = [];
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 选择甄选
    async addCheckShops(query) {
      try {
        const ret = await api.addCheckShops(query);
        if (ret.data.code == 200) {
          this.showModal = false;
          this.showStore = false;
          this.showType = false;
          this.shopIds = [];
          this.getCheckShops();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 选择确认
    submitSelectVipStore() {
      let query = {
        shopIds: this.shopIds
      };
      this.addCheckShops(query);
    },
    // 甄选推荐
    handleVipStoreChange(val,options) {
      let query = {
        id: options.id,
        status: +val
      };
      this.setRecommend(query,'0');
    },

    // 删除
    handleDelVipStore(options) {
      const query = {
        id: options.id
      };
      this.recommendRemove(query);
    },
    // 选择商家
    haneldeSelectStoreVip() {
      this.showModal = true;
      this.showStore = true;
      this.showType = false;
      this.isVip = false;
      this.getShopList({ vip: 0 });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.dispose {
  font-size: 14px;
  position: relative;
  .title {
    font-size: 14px;
    color: #101010;
    margin-bottom: 10px;
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
  .contant {
    border: 1px solid #999;
    margin-bottom: 10px;
    > p {
      background-color: #f1f1f1;
      border-bottom: 1px solid #999;
      padding: 20px;
      box-sizing: border-box;
    }
    > div {
      padding: 30px;
      box-sizing: border-box;
      > p {
        display: inline-block;
        background-color: @color;
        color: #fff;
        border-radius: 2px;
        padding: 8px 10px;
        margin-bottom: 10px;
      }
      .brandImg {
        width: 50px;
        //   height: 60px;
        vertical-align: middle;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(32, 32, 32, 0.3);
    width: 100%;
    height: 100%;
    z-index: 99;
    .modal-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border: 1px solid #999;
      .modal-type {
        > p {
          background-color: #f1f1f1;
          padding: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #999;
        }
        > div {
          padding: 30px 90px;
          box-sizing: border-box;
          p {
            color: #999;
            font-size: 12px;
          }
        }
      }
      .modal-store {
        > p {
          background-color: #f1f1f1;
          padding: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #999;
        }
        > div {
          padding: 30px;
          box-sizing: border-box;
          p {
            color: #999;
            font-size: 12px;
          }
        }
        .el-input {
          margin-bottom: 20px;
        }
        .btn {
          margin-top: 20px;
          text-align: right;
        }
      }
    }
  }
}
</style>


