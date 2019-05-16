<template>
  <div class="freight">
    <div class="title">
      <span></span>运费模板
    </div>
    <div class="freight-telement">
      <div class="add-newtelement" @click="goNewfreight">新建运费模板</div>
      <div class="telement-box" v-for="(item,index) in templateList" :key="index">
        <div class="telement-title">
          <div>{{ item.name }}</div>
          <div class="telement-tool">
            <div>{{ parseTime(item.updateTime) }}</div>
            <div class="telement-operation">
              <span @click="reviseFreight(item.id)">修改</span>
              <span @click="delFreight(item.id)">删除</span>
            </div>
          </div>
        </div>
        <el-table :data="item.regions" border style="width: 100%">
          <el-table-column label="快递方式" width="149">
              <p slot-scope>快递</p>
          </el-table-column>
          <el-table-column label="运送到" >
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.dtoList" :key="index">{{ item.name }},</span>
                <span v-if="!scope.row.dtoList || scope.row.dtoList.length==0">全国(港澳台除外)</span>
              </template>
          </el-table-column>
          <el-table-column prop="incr" label="首件(个)" width="120"></el-table-column>
          <el-table-column prop="incrAmount" label="运费(元)" width="120"></el-table-column>
          <el-table-column prop="initial" label="首件(个)" width="120"></el-table-column>
          <el-table-column prop="initialAmount" label="运费(元)" width="120"></el-table-column>
        </el-table>
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
      templateList:[],
    };
  },
  mounted() {
    this.getTemplates();
  },
  methods: {
    parseTime,
    // 获取模板列表
    async getTemplates() {
      const query = {
        shopId: 1
      };
      try {
        let ret = await api.getTemplates(query);
        if (ret.data.code == 200) {
          this.templateList = ret.data.data;
        } else {
          this.templateList = [];
        }
      } catch (err) {
      }
    },
    // 删除配送模板
    async delTemplate(query) {
      try {
        let ret = await api.delTemplate(query);
        if (ret.data.code == 200) {
          this.getTemplates();
        } else {
          alert("删除失败")
        }
      } catch (err) {
      }
    },
    //   新建运费模板
    goNewfreight() {
      this.$router.push("/e-commerce-newfreight");
    },
    // 修改运费模板
    reviseFreight(id) {
      this.$router.push({
        name: "eCommerceNewFreight",
        params: {
          id,
        }
      });
    },
    // 删除运费模板列表
    delFreight(id) {
      const query = {
        tempId: id
      };
      this.delTemplate(query)
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.freight {
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
  .freight-telement {
    .add-newtelement {
      width: 124px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #1260fb;
      border: 2px solid #1260fb;
      border-radius: 2px;
      color: #fff;
      margin-bottom: 28px;
    }
    .telement-box {
      margin-bottom: 20px;
      .telement-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border: 1px solid #e8e8e8;
        border-bottom: none;
        .telement-tool {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .telement-operation {
            margin-left: 50px;
            span {
              color: @color;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
.has-gutter tr th:nth-child(1) {
  padding-left: 20px;
}
/deep/ .el-table .cell {
  padding-left: 20px !important;
}
</style>


