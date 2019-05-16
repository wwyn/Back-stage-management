<template>
  <div>
    <div v-if="!addCategory" class="classification">
      <div class="title">
        <span></span>类目管理
      </div>
      <div class="titlebox">
        <div class="classification-one" @click="addclassType('一')">新增一级类目</div>
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
      <el-table :data="tableListData" border :row-style="toggleDisplayTr" stripe class="init_table">
        <el-table-column
          label="类目名称"
          width="492"
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
              {{ scope.row.typeName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="268" align="left" label="移动">
          <template slot-scope="scope">
            <i
              v-if="scope.row.__level < 1"
              class="move iconfont icon-zhiding"
              @click="handleSort(scope.row.id,'top')"
            ></i>
            <i class="move iconfont icon-shangyi" @click="handleSort(scope.row.id,'up')"></i>
            <i class="move iconfont icon-xiayi" @click="handleSort(scope.row.id,'down')"></i>
            <i
              v-if="scope.row.__level < 1"
              class="move iconfont icon-zhidi"
              @click="handleSort(scope.row.id,'bottom')"
            ></i>
          </template>
        </el-table-column>
        <el-table-column width="136" align="left" label="数量" prop="pid"/>

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
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="showModal" class="modal">
        <div class="modal-del">
          <p class="prompt">无法进行删除</p>
          <P class="prompt">所要删除分类存在子级目录或者商品，</P>
          <p class="prompt">请删除或移除分类内商品再试。</p>
          <p class="prompt-btn" @click="handleKnow">我知道了</p>
        </div>
      </div>
    </div>
    <div v-if="addCategory" class="category">
      <div class="category-title">
        <div class="title">
          <span></span>类目管理
        </div>
      </div>
      <div class="category-select">
        <div class="active">
          <i class="iconfont icon-xinjianleimutianchong"></i>
          新建类目名称
        </div>
        <div class="leimu">
          <i class="iconfont icon-cebianzhedie"></i>
        </div>
        <div class="active">
          <i v-if="addName" class="iconfont icon-xinjianleimuweitianchong"/>
          <i v-if="!addName" class="iconfont icon-xinjianleimutianchong"/>
          新建类目规格
        </div>
        <div class="leimu">
          <i class="iconfont icon-cebianzhedie"></i>
        </div>
        <div class="active">
          <i v-if="addAttribute || showCategory" class="iconfont icon-xinjianleimutianchong"/>
          <i v-if="!(addAttribute || showCategory)" class="iconfont icon-xinjianleimuweitianchong"/>
          新建类目属性
        </div>
      </div>
      <div v-if="addName" class="category-add">
        <div class="category-type">
          <el-form
            :inline="true"
            :label-position="labelPosition"
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="新建一级类目">
              <el-input v-model="form.categoryInput" placeholder="请输入名称" :disabled="isAddThree"></el-input>
              <i
                v-if="!isAddTwo && isAddTwo2"
                class="category-icon iconfont icon-gongjushanchu"
                @click="addTwo(form.categoryInput)"
              ></i>
              <i v-if="isAddTwo" class="category-icon-arrow iconfont icon-jingyingleimuzhankai"></i>
            </el-form-item>

            <el-form-item class="addTwo" v-if="isAddTwo" label="新建二级类目">
              <el-input v-model="form.categoryInputTwo" placeholder="请输入名称" :disabled="isAddThree"></el-input>
              <i
                v-if="!isAddThree && isAddTwo2"
                class="category-icon iconfont icon-gongjushanchu"
                @click="addThree"
              ></i>
              <i
                v-if="(!isAddThree && isShowdel)"
                class="category-icon-del iconfont icon-gongjutianjia"
                @click="delTwo"
              ></i>
              <i v-if="isAddThree" class="category-icon-arrow iconfont icon-jingyingleimuzhankai"></i>
            </el-form-item>
            <el-form-item class="addTwo" v-if="isAddThree" label="新建三级类目">
              <el-input v-model="form.categoryInputThree" placeholder="请输入名称"></el-input>
              <i
                v-if="isShowdel && isAddTwo2"
                class="category-icon-del left iconfont icon-gongjutianjia"
                @click="delThree"
              ></i>
            </el-form-item>
            <el-form-item class="category-btn">
              <el-button @click="cancelCategory">取消</el-button>
              <el-button @click="nextStep">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="showStandard" class="addStandard">
        <div class="addStandard-title">
          <span>规格工具</span>（点击预览规格工具效果；双击对应模版添加至规格设置中）
        </div>
        <div class="standard-tool">
          <div
            v-for="(item,index) in toolsListdefault"
            :key="index"
            @dblclick="addToolColor(item)"
            @click="showColorImg"
          >
            {{ item.spec }}
            <img v-if="isshowColorImg" src="../../../assets/image/timg.jpg" alt>
          </div>
          <div @dblclick="addCustom">自定义</div>
        </div>
        <div class="addStandard-title">
          规格所在类目:
          <span v-if="this.form.categoryInput">{{this.form.categoryInput}}</span>
          <span v-if="this.form.categoryInputTwo">{{'>'+this.form.categoryInputTwo}}</span>
          <span v-if="this.form.categoryInputThree">{{'>'+this.form.categoryInputThree}}</span>
        </div>
        <div class="addStandard-title">
          <span>规格设置</span>（此规格将作为用户购买商品时规格选择项）
        </div>
        <div class="addStandard-content">
          <div v-for="(item,index) in toolsList" :key="index">
            {{item}}
            <i class="iconfont icon-gongjutianjia" @click="delTool(item)"></i>
          </div>
        </div>
        <div class="addStandard-content-custom">
          <div v-for="(item,index) in toolsListcustomize" :key="index">
            <div class="addStandard-content-custom-title">
              {{ item.spec }}
              <!-- 删除自定义的规格 -->
              <i class="iconfont icon-gongjutianjia" @click="delCustom(item.id)"></i>
            </div>
            <div
              class="addStandard-content-custom-con"
              v-for="(item,index) in item.values"
              :key="index"
            >
              {{ item.value }}
              <i
                class="iconfont icon-gongjutianjia"
                @click="delCustomNumber(item.id)"
              ></i>
            </div>
            <!-- <div class="addStandard-content-custom-btn">+</div> -->
          </div>
        </div>
        <el-form
          v-if="isaddCustom"
          v-for="(item,index1) in formCustomList"
          :key="index1"
          :inline="true"
          :model="formCustomList[index1]"
          class="form-custom"
        >
          <el-form-item class="custom-input custom-name">
            <el-input v-model="item.formCustom.name" placeholder="请输入规格名称"></el-input>
            <i class="iconfont icon-gongjutianjia" @click="delToolName(index1)"></i>
            <div class="custom-title">
              <p>自定义规格</p>
              <p @click="submitCustom(index1)">保存</p>
            </div>
          </el-form-item>
          <div style="flex:1">
            <el-form-item
              class="custom-input"
              v-for="(_item,index2) in item.formCustom.customList"
              :key="index2"
              v-model="item.formCustom"
            >
              <el-input v-model="item.formCustom.customList[index2]" :placeholder="_item"></el-input>
              <i class="iconfont icon-gongjutianjia" @click="delToolNumber(index1,index2)"></i>
            </el-form-item>

            <el-form-item class="custom-btn">
              <el-button @click="customBtn(index1)">
                <i class="iconfont icon-gongjushanchu"></i>
              </el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="category-btn-two">
          <button>取消</button>
          <button @click="prevStepCustom">上一步</button>
          <button @click="goNextStep">下一步</button>
        </div>
      </div>
      <div v-if="addAttribute" class="attribute">
        <div class="addStandard-title">
          <span>属性工具</span>（点击预览属性工具效果；点击“+”号添加工具至属性设置中）
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :inline="true"
          :model="formAttribute"
          class="attributeform"
        >
          <el-form-item label="输入空白框">
            <i class="position iconfont icon-gongjushanchu" @click="addInput"></i>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="内容选择器">
            <i class="position iconfont icon-gongjushanchu" @click="addSelect"></i>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="时间选择器">
            <i class="position iconfont icon-gongjushanchu"></i>
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="addStandard-title">
          属性所在类目:
          <span class="span" v-if="this.form.categoryInput">{{this.form.categoryInput}}</span>
          <span class="span" v-if="this.form.categoryInputTwo">{{'>'+this.form.categoryInputTwo}}</span>
          <span
            class="span"
            v-if="this.form.categoryInputThree"
          >{{'>'+this.form.categoryInputThree}}</span>
        </div>
        <div class="addStandard-title">
          <span>属性设置</span>（此属性将作为商品的属性内容）
        </div>
        <div class="attr-list" v-for="(item,index) in attrList" :key="index">
          <div>
            {{ item.attributeName }}
            <i
              class="iconfont icon-gongjutianjia i"
              @click="delAttrName(item.id)"
            ></i>
          </div>
          <div class="attr-list-box">
            <div v-for="(item,index) in item.values" :key="index">{{ item }}</div>
          </div>
        </div>
        <el-form
          :inline="true"
          class="demo-form-inline"
          v-for="(item,index) in attrFormList"
          :key="item.id"
          v-if="showInput"
        >
          <el-form-item class="attr-input">
            <el-input v-model="item.attrForm.name" placeholder="请输入文字"></el-input>
            <i class="iconfont icon-gongjutianjia i" @click="delAttrInput(index)"></i>
            <div class="attr-title">
              <p>空白输入框</p>
              <i
                @click="necessaryBtn(index)"
                v-if="!item.attrForm.select"
                class="iconfont icon-bixuanxiang"
              ></i>
              <i
                @click="necessaryBtn(index)"
                v-else
                class="iconfont icon-bixuanxiang-gouxuan gouxuan"
              ></i>
              <p @click="submitAttrInput(index)">保存</p>
            </div>
          </el-form-item>
          <el-form-item class="attr-textarea">
            <el-input v-model="item.attrForm.text" type="textarea" placeholder="可填写预设文字"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-for="(item,index1) in selectFromList"
          :key="item.id"
          :inline="true"
          style="display:flex"
        >
          <el-form-item class="select-input" v-if="showSelect">
            <el-input v-model="item.selectFrom.name" placeholder="请输入规格名称"></el-input>
            <i class="iconfont icon-gongjutianjia i" @click="delSelectName(index1)"></i>
            <div class="custom-title">
              <p>内容选择器</p>
              <i
                class="iconfont icon-bixuanxiang"
                @click="selectBtn(index1)"
                v-if="!item.selectFrom.select"
              ></i>
              <i
                class="iconfont icon-bixuanxiang-gouxuan gouxuan"
                v-else
                @click="selectBtn(index1)"
              ></i>
              <p @click="submitselectBtn(index1)">保存</p>
            </div>
          </el-form-item>
          <div style="flex:1" v-if="showSelect">
            <el-form-item
              class="select-input"
              v-for="(_item,index2) in item.selectFrom.selectList"
              :key="index2"
              v-model="item.selectFrom"
            >
              <el-input v-model="item.selectFrom.selectList[index2]" :placeholder="_item"></el-input>
              <i class="iconfont icon-gongjutianjia i" @click="delattrBtn(index1,index2)"></i>
            </el-form-item>
            <el-form-item class="custom-btn">
              <el-button @click="attrBtn(index1)"><i class="iconfont icon-gongjushanchu"></i></el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="category-btn-two">
          <button>取消</button>
          <button @click="prevStep">上一步</button>
          <button @click="previewCategotry">预览</button>
          <button @click="preservationCategotry">保存</button>
        </div>
      </div>
      <div v-if="showCategory" class="preview">
        <div class="addStandard-title">
          规格所在类目:
          <span v-if="this.form.categoryInput">{{this.form.categoryInput}}</span>
          <span v-if="this.form.categoryInputTwo">{{'>'+this.form.categoryInputTwo}}</span>
          <span v-if="this.form.categoryInputThree">{{'>'+this.form.categoryInputThree}}</span>
        </div>
        <div class="preview-list" v-for="(item,index ) in previewList" :key="index">
          <div>{{ item.name }}:</div>
          <div class="preview-child" v-for="(itemT,index2 ) in item.list" :key="index2">{{ itemT}}</div>
        </div>
        <div class="category-btn-two">
          <button @click="returnEdit">返回编辑</button>
          <button @click="preservationCategotry">保存</button>
        </div>
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
      pid: 0,
      reviseId: Number,
      showModal: false,
      dialogImageUrl: "",
      // 分类管理数据
      tableListData: [], // tableListData 展示数据的data
      foldList: [], // 该数组中的值 都会在列表中进行隐藏  死亡名单
      // 类目部分
      labelPosition: "top",
      form: {
        categoryInput: "",
        categoryInputTwo: "",
        categoryInputThree: ""
      },
      addCategory: false,
      isAddTwo: false,
      isAddThree: false,
      isShowdel: true,
      addName: true,
      showStandard: false,
      toolsListdefault: [],
      toolsListcustomize: [],
      toolsList: [],
      formCustomList: [
        {
          formCustom: {
            name: "",
            customList: ["输入文字"]
          }
        }
      ],
      isaddCustom: false,
      addAttribute: false,
      formAttribute: {},
      isRevise: "",
      standardId: Number,
      attrFormList: [
        {
          attrForm: {
            name: "",
            text: "",
            select: false
          }
        }
      ],
      showInput: false,
      selectFromList: [
        {
          selectFrom: {
            name: "",
            selectList: ["输入文字"],
            select: false
          }
        }
      ],
      showSelect: false,
      showCategory: false,
      previewList: [
        { name: "品牌1", list: ["佳能1", "乐视1", "三星1"] },
        { name: "品牌2", list: ["佳能2", "乐视2", "三星2"] },
        { name: "品牌3", list: ["佳能3", "乐视3", "三星3"] }
      ],
      attrList: [],
      isshowColorImg: false,
      // 修改bug
      isAddTwo2: true
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
    this.typeList();
  },

  methods: {
    // 获取类目列表
    async typeList() {
      const query = {};
      try {
        const ret = await api.typeList(query);
        this.tableListData = this.formatConversion([], ret.data.data);
      } catch (e) {
        console.log(e.message);
      }
    },
    // 类目排序
    async typeSort(query) {
      try {
        const ret = await api.typeSort(query);
        if (ret.data.code == 200) {
          this.typeList();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除类目
    async typeDel(data) {
      const _data = {
        id: data
      };
      try {
        let ret = await api.typeDel(_data);
        if (ret.data.code == 200) {
          this.typeList();
        } else if (ret.data.code == 400) {
          this.showModal = true;
          // this.isDel = true;
        } else if (ret.data.code == 100) {
          console.log(ret.data.msg);
        }
      } catch (err) {
        alert(err);
      }
    },
    // 新建修改类目
    async typeSet(data) {
      const options = {
        ...data
      };
      try {
        const ret = await api.typeSet(options);
        this.pid = ret.data.data.id;
        this.standardId = ret.data.data.id;
        if (ret.data.code == 200) {
          this.typeList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取规格
    async getSpecs(query) {
      let _type = query.typeId;
      try {
        const ret = await api.getSpecs(query);
        if (_type === 0) {
          this.toolsListdefault = ret.data.data || [];
        } else if (_type != 0) {
          this.toolsListcustomize = ret.data.data || [];
        }
        if (ret.data.code == 200) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 保存自定义规格
    async addSpecValue(query) {
      try {
        const ret = await api.addSpecValue(query);
        if (ret.data.code == 200) {
          this.getSpecs({ typeId: this.standardId, shopId: 1, refValue: 0 });
          this.isaddCustom = false;
        } else if (ret.data.code == 400) {
          alert(ret.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除自定义规格名称
    async delSpec(query) {
      try {
        const ret = await api.delSpec(query);
        if (ret.data.code == 200) {
          this.getSpecs({ typeId: this.standardId, shopId: 1, refValue: 0 });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除自定义规格数值
    async delSpecValue(query) {
      try {
        const ret = await api.delSpecValue(query);
        if (ret.data.code == 200) {
          this.getSpecs({ typeId: this.standardId, shopId: 1, refValue: 0 });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取默认属性
    async getAttrs(query) {
      try {
        const ret = await api.getAttrs(query);
        this.attrList = ret.data.data;
        if (ret.data.code == 200) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 保存自定义属性
    async setAttrValue(query) {
      try {
        const ret = await api.setAttrValue(query);
        if (ret.data.code == 200) {
          this.getAttrs({ typeId: this.standardId, shopId: 0 });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除自定义属性
    async delAttr(query) {
      try {
        const ret = await api.delAttr(query);
        if (ret.data.code == 200) {
          this.getAttrs({ typeId: this.standardId, shopId: 1 });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 删除自定义属性值
    async delAttrValue(query) {
      try {
        const ret = await api.delAttrValue(query);
        if (ret.data.code == 200) {
          this.getAttrs({ typeId: this.standardId, shopId: 1 });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 移动
    async setCategoryList(data) {
      try {
        const ret = await api.upSelling(data);
        if (ret.data.code == 200) {
          this.categoryList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 移动
    handleSort(id, type) {
      let options = {
        typeId: id,
        type: type
      };
      this.typeSort(options);
    },
    // 删除提醒
    handleKnow() {
      this.showModal = false;
    },
    // 新建
    addclassType(num, content) {
      this.isRevise = "新建";
      this.addCategory = true;
      if (num == "一") {
        this.pid = 0;
      } else if (num == "二") {
        this.form.categoryInput = content.bigName;
        this.isAddTwo = true;
        this.isShowdel = false;
      } else if (num == "三") {
        this.form.categoryInput = content.bigName;
        this.form.categoryInputTwo = content.middleName;
        this.isAddTwo = true;
        this.isAddThree = true;
        this.isShowdel = false;
      }
      if (content) {
        this.pid = content.id;
      }
    },
    // 修改
    handleRevise(type) {
      this.isRevise = "修改";
      this.addCategory = true;
      if (type.__level == "0") {
        this.isAddTwo2 = false;
      }
      if (type.__level == "1") {
        this.isAddTwo2 = false;
        this.isAddTwo = true;
        this.isShowdel = false;
      } else if (type.__level == "2") {
        this.isAddTwo2 = false;
        this.isAddTwo = true;
        this.isShowdel = false;
        this.isAddThree = true;
      }
      this.reviseId = type.id;
      this.pid = type.pid;
      this.form = {
        categoryInput: type.bigName,
        categoryInputTwo: type.middleName,
        categoryInputThree: type.smallName
      };
    },
    // 删除
    handleDelete(data) {
      let _id = data.id;
      this.typeDel(_id);
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
    },
    // 取消新建类目
    cancelCategory() {
      this.$router.go(0);
    },
    // 新建类目部分
    // 一级
    addTwo(options) {
      let query = {
        ...options,
        pid: this.pid,
        typeName: this.form.categoryInput
      };
      this.typeSet(query).then(() => {
        this.getSpecs({ typeId: 0, shopId: 0, refValue: 0 });
        this.getSpecs({ typeId: this.standardId, shopId: 0, refValue: 0 });
      });
      this.isAddTwo = true;
    },
    // 二级
    addThree(options) {
      let query = {
        ...options,
        pid: this.pid,
        typeName: this.form.categoryInputTwo
      };
      this.typeSet(query).then(() => {
        this.getSpecs({ typeId: 0, shopId: 0, refValue: 0 });
        this.getSpecs({ typeId: this.standardId, shopId: 0, refValue: 0 });
      });
      this.isAddThree = true;
    },
    // 删除分类
    delTwo() {
      this.isAddTwo = false;
      this.form.categoryInputTwo = "";
    },
    delThree() {
      this.isAddThree = false;
      this.form.categoryInputThree = "";
    },
    // 下一步1
    nextStep() {
      let _type = this.isRevise;
      if (_type === "新建") {
        if (this.form.categoryInputTwo === "") {
          this.addName = false;
          this.showStandard = true;
          this.addTwo();
        } else if (this.form.categoryInputThree === "") {
          this.addName = false;
          this.showStandard = true;
          this.addThree();
        } else {
          let query = {
            pid: this.pid,
            typeName: this.form.categoryInputThree
          };
          this.typeSet(query).then(() => {
            this.getSpecs({ typeId: 0, shopId: 0, refValue: 0 });
            this.getSpecs({
              typeId: this.standardId,
              shopId: 0,
              refValue: 0
            }).then(() => {
              this.addName = false;
              this.showStandard = true;
            });
          });
        }
      } else if (_type === "修改") {
        if (this.form.categoryInput && !this.form.categoryInputTwo) {
          this.addName = false;
          this.showStandard = true;
          let query = {
            id: this.reviseId,
            typeName: this.form.categoryInput
          };
          this.typeSet(query).then(() => {
            this.getSpecs({ typeId: 0, shopId: 0 });
            this.getSpecs({ typeId: this.standardId, shopId: 0 }).then(() => {
              this.addName = false;
              this.showStandard = true;
            });
          });
        } else if (
          this.form.categoryInputTwo &&
          !this.form.categoryInputThree
        ) {
          this.addName = false;
          this.showStandard = true;
          let query = {
            id: this.reviseId,
            typeName: this.form.categoryInputTwo
          };
          this.getSpecs({ typeId: 0, shopId: 0 });
          this.typeSet(query).then(() => {
            this.getSpecs({ typeId: this.standardId, shopId: 0 }).then(() => {
              this.addName = false;
              this.showStandard = true;
            });
          });
        } else if (
          this.form.categoryInput &&
          this.form.categoryInputTwo &&
          this.form.categoryInputThree
        ) {
          let query = {
            id: this.reviseId,
            typeName: this.form.categoryInputThree
          };
          this.typeSet(query).then(() => {
            this.getSpecs({ typeId: 0, shopId: 0 });
            this.getSpecs({ typeId: this.standardId, shopId: 0 }).then(() => {
              this.addName = false;
              this.showStandard = true;
            });
          });
        }
      }
    },
    // 双击添加规格颜色
    addToolColor(options) {
      let query = {
        hasImage: 1, //统一规格 hasImage
        id: 0,
        refId: 1,
        shopId: 0,
        spec: "颜色",
        typeId: this.standardId,
        values: []
      };
      this.addSpecValue(query);
    },
    // 点击查看颜色值
    showColorImg() {
      this.isshowColorImg = !this.isshowColorImg;
    },
    // 删除规格
    delTool(options) {
      let _index = this.toolsList.findIndex(item => item === options);
      this.toolsList.splice(_index, 1);
    },
    // 自定义规格
    addCustom() {
      if (!this.isaddCustom) {
        this.isaddCustom = true;
        this.formCustomList = [
          {
            formCustom: {
              name: "",
              customList: [""]
            }
          }
        ];
      }
    },
    // 添加规格数值
    customBtn(options) {
      this.formCustomList[options].formCustom.customList.push("");
    },
    // 删除自定义规格
    delCustom(options) {
      this.delSpec({ id: options });
    },
    // 删除自定义规格数值
    delCustomNumber(options) {
      this.delSpecValue({ id: options });
    },
    // 删除规格数值
    delToolNumber(id1, id2) {
      this.formCustomList[id1].formCustom.customList.splice(id2, 1);
    },
    // 删除规格名称
    delToolName(options) {
      this.formCustomList.splice(options, 1);
    },
    // 自定义规格保存
    submitCustom(index) {
      let _content = this.formCustomList[index].formCustom;
      let query = {
        hasImage: 0,
        id: 0,
        refId: 0,
        shopId: 0,
        spec: _content.name,
        typeId: this.standardId,
        values: _content.customList
      };
      this.addSpecValue(query);
    },
    // 上一步（1）
    prevStepCustom() {
      this.addName = true;
      this.showStandard = false;
    },
    // 下一步（2）
    goNextStep() {
      this.showStandard = false;
      this.addAttribute = true;
      if (this.form.categoryInputTwo === "") {
        this.getAttrs({ typeId: this.standardId });
      } else if (this.form.categoryInputThree === "") {
        this.getAttrs({ typeId: this.standardId });
      } else {
        this.getAttrs({ typeId: this.standardId });
      }
    },
    // 上一步（3）
    prevStep() {
      this.showStandard = true;
      this.addAttribute = false;
    },
    // 属性部分
    // 添加input
    addInput() {
      if (!this.showInput) {
        this.showInput = true;
      } else {
        this.attrFormList.push({
          attrForm: {
            name: "",
            select: false,
            text: ""
          }
        });
      }
    },
    // 删除input
    delAttrInput(index) {
      this.attrFormList.splice(index, 1);
    },
    // 必选按钮
    necessaryBtn(index) {
      this.attrFormList[index].attrForm.select = !this.attrFormList[index]
        .attrForm.select;
    },
    // 输入框保存
    submitAttrInput(index) {
      const query = {
        valueType: 2,
        required: this.attrFormList[index].attrForm.select ? 1 : 0,
        attribute: this.attrFormList[index].attrForm.name,
        shopId: 0,
        values: [this.attrFormList[index].attrForm.text],
        typeId: this.standardId
      };
      this.setAttrValue(query);
      this.attrFormList = [
        {
          attrForm: {
            name: "",
            text: "",
            select: false
          }
        }
      ];
    },
    // 添加自定义选择属性
    addSelect() {
      if (!this.showSelect) {
        this.showSelect = true;
      } else {
        this.selectFromList.push({
          selectFrom: {
            name: "",
            selectList: ["请输入文字"],
            select: false
          }
        });
      }
    },
    // 必选按钮
    selectBtn(index) {
      this.selectFromList[index].selectFrom.select = !this.selectFromList[index]
        .selectFrom.select;
    },
    // 自定义选择属性保存
    submitselectBtn(index) {
      const query = {
        valueType: 0,
        required: this.selectFromList[index].selectFrom.select ? 1 : 0,
        attribute: this.selectFromList[index].selectFrom.name,
        shopId: 0,
        values: this.selectFromList[index].selectFrom.selectList,
        typeId: this.standardId
      };
      this.setAttrValue(query);
      this.selectFromList = [
        {
          selectFrom: {
            name: "",
            selectList: ["输入文字"],
            select: false
          }
        }
      ];
    },
    // 添加属性子类
    attrBtn(index) {
      console.log(index, this.selectFromList[index]);
      this.selectFromList[index].selectFrom.selectList.push("请写文字");
    },
    // 删除默认属性名称
    delAttrName(index) {
      this.delAttr({ id: index });
      this.getAttrs({ typeId: this.standardId, shopId: 1 });
    },
    // 删除属性值
    delattrBtn(index1, index2) {
      this.selectFromList[index1].selectFrom.selectList.splice(index2, 1);
    },
    // 删除自定义选择属性
    delSelectName(index) {
      this.selectFromList.splice(index, 1);
    },
    // 返回编辑
    returnEdit() {
      this.showStandard = true;
      this.addAttribute = true;
      this.showCategory = false;
      this.showStandard = false;
    },

    // 保存（最后）
    preservationCategotry() {
      this.$router.go(0);
    },
    // 预览（最后）
    previewCategotry() {
      this.showStandard = false;
      this.addAttribute = false;
      this.showCategory = true;
    }
  }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
/deep/ .el-table thead {
  background-color: #f1f1f1;
}
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
.positionInput {
  input {
    border: none;
    padding: 0;
  }
}
.el-table--enable-row-transition .el-table__body td {
  border: none;
  border-bottom: 1px solid #e8e8e8;
  padding: 8px;
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
/deep/ .el-table--border th,
.el-table__fixed-right-patch {
  background-color: #f1f1f1 !important;
  padding: 8px 0;
}
/deep/ .el-table td,
.el-table th {
  padding: 8px 0;
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
// 类目部分
.category {
  .leimu {
    i {
      font-size: 12px;
      color: #101010;
    }
  }
  position: relative;
  .active {
    color: @color;
    i {
      color: @color !important;
      margin-right: 10px;
    }
  }
  .category-title {
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 28px;
    padding-bottom: 10px;
    .title {
      font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Helvetica,
        NotoSansCJK-Regular, Helvetica Neue, Helvetica, Sans-serif, Arial,
        Droid Sans;
      font-size: 14px;
      color: #101010;
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
  .category-select {
    width: 1070px;
    height: 40px;
    background-color: #f1f1f1;
    font-size: 14px;
    color: #101010;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 40px;
    span {
      font-size: 14px;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: text-bottom;
      border: 1px solid #101010;
      box-sizing: border-box;
      text-align: center;
      line-height: 20px;
      color: #f1f1f1;
    }
  }
  .category-add {
    .el-form {
      text-align: center;
      .el-form-item {
        text-align: left;
        input {
          width: 160px;
          height: 32px;
          border: 2px solid #101010;
          border-radius: 0;
          padding: 12px;
          box-sizing: border-box;
        }
        input:focus {
          border: 2px solid @color;
        }
        label {
          line-height: 30px;
          height: 30px;
          padding: 0;
          font-size: 13px;
          color: #999999;
        }
      }
      .category-icon {
        position: absolute;
        top: 0;
        right: -36px;
        font-size: 20px;
        color: @color;
      }
      .category-icon-arrow {
        position: absolute;
        top: 0;
        right: -36px;
        font-size: 20px;
      }
      .category-icon-del {
        position: absolute;
        top: 0;
        right: -66px;
        font-size: 20px;
        color: @color;
      }
      .left {
        right: -36px;
      }
      .addTwo {
        margin-left: 38px;
        .label {
          margin-left: 38px;
        }
      }
      .category-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        button {
          background-color: #fff;
          border: none;
          padding: 0;
        }
        button:nth-child(2) {
          background-color: @color;
          color: #fff;
          width: 60px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          margin-left: 20px;
          border-radius: 2px;
        }
      }
    }
  }
  .category-btn-two {
    position: absolute;
    top: -10px;
    right: 0;
    button {
      border: none;
      padding: 0;
      background-color: #fff;
    }
    button:nth-child(2) {
      background: #999999;
      border-radius: 2px;
      color: #fff;
      width: 60px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin-left: 20px;
      border-radius: 2px;
    }
    button:nth-child(3) {
      background-color: @color;
      color: #fff;
      width: 60px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin-left: 20px;
      border-radius: 2px;
    }
    button:nth-child(4) {
      background-color: @color;
      color: #fff;
      width: 60px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin-left: 20px;
      border-radius: 2px;
    }
  }

  .addStandard {
    .addStandard-content {
      > div {
        width: 160px;
        height: 40px;
        margin-right: 40px;
        text-align: center;
        line-height: 40px;
        background: #f1f1f1;
        border-radius: 2px;
        margin-top: 20px;
        position: relative;
      }
      > div:nth-child(1) {
        margin-top: -14px;
      }
    }
    .standard-tool {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 40px;
      position: relative;
      > div {
        width: 160px;
        height: 40px;
        margin-right: 40px;
        text-align: center;
        line-height: 40px;
        background: #f1f1f1;
        border-radius: 2px;
      }
      img {
        width: 200px;
        vertical-align: middle;
        position: absolute;
        top: 53px;
        left: 0;
      }
    }
    .custom-name {
      input {
        background-color: #f1f1f1;
      }
    }
    .custom-btn {
      button {
        width: 180px;
        height: 40px;
        text-align: center;
        margin-top: 20px;
        background: #ffffff;
        border: 2px solid #1260fb;
        border-radius: 2px;
      }
    }
  }
  .addStandard-title {
    font-weight: 500;
    font-size: 14px;
    color: #101010;
    margin-bottom: 26px;
    .span {
      font-weight: 600;
    }
    .span:nth-child(1) {
      margin-left: 10px;
    }
    span {
      font-size: 14px;
      color: #101010;
      font-weight: 500;
    }
  }
  .attribute {
    .el-input {
      width: 180px;
      height: 40px;
      margin-right: 40px;
    }
    .position {
      position: absolute;
      top: -50px;
      right: 40px;
    }
  }
  .form-custom {
    display: flex;
    .custom-input {
      width: 180px;
      height: 40px;
      margin-right: 16px;
      text-align: center;
      line-height: 40px;
      background: #f1f1f1;
      border-radius: 2px;
      margin-top: 20px;
      input {
        text-align: center;
      }
      i {
        position: absolute;
        top: -10px;
        right: -10px;
        color: #999;
        background-color: #fff;
        width: 18px;
        height: 18px;
        line-height: 18px;
      }
      .custom-title {
        width: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #666666;
        p:nth-child(2) {
          color: @color;
        }
        p:nth-child(3) {
          color: @color;
        }
      }
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 180px;
  }
  .attr-input {
    width: 180px;
    .i {
     position: absolute;
      top: -10px;
      right: 30px;
      background-color: #fff;
      text-align: center;
      width: 18px;
      height: 18px;
      line-height: 18px;
      color: #999;
    }
    .attr-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      color: #666;
      .gouxuan {
        color: @color;
      }
      i {
        color: #666;
      }
      p:nth-child(3) {
        color: @color !important;
      }
    }
  }
  .attr-textarea {
    width: 400px;
    height: 40px;
    /deep/ textarea {
      width: 400px;
      height: 40px;
      margin-left: 20px;
    }
  }
  .select-input {
    width: 180px;
    height: 40px;
    margin-right: 16px;
    text-align: center;
    line-height: 40px;
    background: #f1f1f1;
    border-radius: 2px;
    margin-top: 20px;
    input {
      text-align: center;
    }
    .i {
      width: 18px;
      height: 18px;
      position: absolute;
      top: -10px;
      right: 30px;
      line-height: 18px;
      background-color: #fff;
      color: #999;
    }
    .custom-title {
      width: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #666666;
      .gouxuan {
        color: @color;
      }
      p:nth-child(3) {
        color: @color;
      }
    }
  }
  .custom-btn {
    margin-left: 20px;
    button {
      width: 180px;
      height: 40px;
      text-align: center;
      margin-top: 20px;
      background: #ffffff;
      border: 2px solid @color;
      border-radius: 2px;
      padding: 0;
      color: @color;
    }
  }
  // 预览
  .preview {
    .category-btn-two {
      position: absolute;
      top: 0;
      right: 0;
      button {
        border: none;
        padding: 0;
        background-color: #fff;
      }
      button:nth-child(1) {
        background: #999999;
        border-radius: 2px;
        color: #fff;
        width: 74px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        margin-left: 20px;
        border-radius: 2px;
      }
      button:nth-child(2) {
        background: @color;
        border-radius: 2px;
        color: #fff;
        width: 60px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        margin-left: 20px;
        border-radius: 2px;
      }
    }
  }
  .preview-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > div {
      font-size: 14px;
      color: #101010;
      margin-bottom: 20px;
    }
    .preview-child {
      width: 200px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #f1f1f1;
      margin-left: 10px;
    }
  }
  // 自定义规格样式
  .addStandard-content-custom {
    > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;
      line-height: 40px;
      // margin-bottom: 20px;
    }

    .addStandard-content-custom-title {
      position: relative;
      width: 180px;
      height: 40px;
      background: #f1f1f1;
      border-radius: 2px;
      margin-right: 20px;
      margin-bottom: 20px;
      i {
        color: #999;
        position: absolute;
        top: -20px;
        right: -10px;
      }
    }
    .addStandard-content-custom-con {
      position: relative;
      width: 180px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #f1f1f1;
      border-radius: 2px;
      margin-right: 16px;
      margin-bottom: 20px;
      i {
        width: 18px;
        height: 18px;
        position: absolute;
        top: -10px;
        right: -10px;
        line-height: 18px;
        background-color: #fff;
        color: #999;
      }
    }
    .addStandard-content-custom-btn {
      width: 180px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid @color;
      color: @color;
      margin-left: 16px;
    }
  }
  .attr-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .i {
      position: absolute;
      top: -20px;
      right: -10px;
      width: 18px;
      height: 18px;
      background-color: #fff;
      color: #999;
    }
    .attr-list-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 0%;
      flex-wrap: wrap;
      div {
        width: 180px;
        height: 40px;
        background: #fff;
        border-radius: 2px;
        margin-right: 20px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #f1f1f1;
        margin-bottom: 20px;
        position: relative;
      }
    }
    > div:nth-child(1) {
      width: 180px;
      height: 40px;
      background: #f1f1f1;
      border-radius: 2px;
      margin-right: 20px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #f1f1f1;
      margin-bottom: 20px;
      position: relative;
    }
  }
  /deep/ .el-form--inline .el-form-item__label {
    color: #101010;
  }
}
/deep/ .el-table td,
.el-table th {
  border-right: none;
}

.move {
  font-size: 12px;
  color: #101010;
  margin: 0 10px;
}
</style>
