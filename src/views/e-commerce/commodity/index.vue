<template>
    <div>
        <div class="commodity">
            <div class="title">
                <span></span>商品发布
            </div>
            <div class="message-box">
                <div class="typevals">
                    当前类目:
                    <span v-for="(val,index) in selected" :key="index">{{ val }}></span>
                    <el-button type="primary" @click="switchType">切换类目</el-button>
                </div>
                <!-- 基本信息 -->
                <div>
                    <div class="basic">基本信息</div>
                    <el-form
                            :inline="true"
                            :model="basicForm"
                            :rules="rules"
                            ref="basicForm"
                            label-width="130px"
                            class="demo-basicForm"
                    >
                        <el-form-item label="商品标题" prop="name">
                            <el-input v-model="basicForm.name" placeholder="最多可输入30个汉字（60个字符）"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader
                                    v-model="basicForm.shopList"
                                    :props="props"
                                    :options="shopCategoryList"
                                    class="cascader"
                                    change-on-select
                                    @change="handleItemChange"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="商品品牌" class="brand-code" prop="brand">
                            <el-select placeholder="请选择" v-model="basicForm.brand">
                                <el-option
                                        v-for="(item,index) in getbrandList"
                                        :key="index"
                                        :label="item.brandName"
                                        :value="JSON.stringify({item})"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品编码" class="brand-code brand-code-label">
                            <el-input v-model="basicForm.code"></el-input>
                        </el-form-item>
                        <div class="type-category-title">
                            类目属性
                            <span>填写错误的商品属性，可能会引起商品下架，影响正常销售，请认真准确填写。</span>
                        </div>
                        <el-form-item>
                            <template>
                                <div class="type-category">
                                    <el-form ref="categoryForm" label-width="80px">
                                        <el-form-item
                                                v-for="(item,index) in attrList"
                                                :key="index"
                                                :label="item.attributeName"
                                        >
                                            <el-input
                                                    v-if="item.valueType === 2"
                                                    v-model="item.valueName"
                                                    placeholder="请输入内容"
                                            ></el-input>
                                            <el-select v-if="item.valueType === 0" v-model="item.value" placeholder="请选择">
                                                <el-option
                                                        v-for="(val,idx) in item.values"
                                                        :key="idx"
                                                        :label="val"
                                                        :value="val"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 购物信息 -->
                <div>
                    <div>购物信息</div>
                    <el-form :model="shoppingForm" :rules="rules">
                        <div v-for="(item,index1) in specificationList" :key="index1">
                            <div class="essential">
                                {{ item.spec }}
                                <span v-if="item.spec=='颜色'">选择标准色可增加搜索机会，标准颜色还可填写颜色备注信息（偏深、偏亮等）！</span>
                            </div>
                            <div v-if="item.spec=='颜色'">
                                <div v-for="(addColor,index) in item.contents" :key="index">
                                    <el-form-item class="color-category">
                                        <el-select
                                                v-model="addColor.valueId"
                                                placeholder="选择颜色"
                                                @change="handleAddColor(item)"
                                        >
                                            <el-option
                                                    v-for="(itemcolor,index) in item.values"
                                                    :key="index"
                                                    :label="itemcolor.value"
                                                    :value="itemcolor.id"
                                            />
                                        </el-select>
                                        <el-input v-model="addColor.valueName" placeholder="备注（偏深或者偏浅）"></el-input>
                                        <el-upload
                                                class="avatar-uploader"
                                                action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
                                                :show-file-list="false"
                                                :on-remove="handleRemove"
                                                :beforeUpload="beforeAvatarUpload"
                                                :on-success="(res, file) => handleAvatarSuccess(res, file, addColor)"
                                        >
                                            <img v-if="addColor.imageUrl" :src="addColor.imageUrl" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                        <el-button @click="delColor(index1,index)" icon="el-icon-delete"></el-button>
                                    </el-form-item>
                                </div>
                            </div>
                            <div v-else>
                                <el-form-item class="size-category">
                                    <el-input v-model="item.text" placeholder="自定义输入值"></el-input>
                                    <el-button type="primary" @click="handleAddCustom(item)">添加</el-button>
                                </el-form-item>
                                <div class="size-select">
                                    <el-checkbox-group v-model="item.contents">
                                        <el-checkbox
                                                v-for="(itemsize) in item.values"
                                                :key="itemsize.id"
                                                :label="JSON.stringify({
                                                    valueId: itemsize.id,
                                                    valueName: itemsize.value,
                                                    specId: item.id || '',
                                                    specName: item.spec|| '',
                                                })"
                                        >
                                            {{ itemsize.value }}
                                            <i
                                                    v-if="itemsize.shopId === 1"
                                                    class="el-icon-delete"
                                                    @click.prevent="delDefaultValue(itemsize.id)"
                                            ></i>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                        <div class="essential">
                            商品规格
                            <span>在标题栏中输入或选择内容可以进筛选和批量填充</span>
                        </div>
                        <el-form-item style="margin-left: 130px;width: 800px;">
                            <el-table
                                    :data="tabelList"
                                    border
                                    style="width: 800px"
                                    :span-method="objectSpanMethod"
                            >
                                <el-table-column
                                        v-for="(item,index) in columns"
                                        :label="item.specName"
                                        :key="index"
                                >
                                    <template slot-scope="scope">
                                        <p>{{ scope.row[item.specId || ''].valueName }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="数量" class="shop-text">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.stock"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="销售价" class="shop-text">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.salePrice"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="成本价" class="shop-text">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.costPrice" type="number"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <div class="price-style">
                            <el-form-item label="市场价" prop="market">
                                <el-input v-model="shoppingForm.market"></el-input>
                            </el-form-item>
                            <el-form-item label="折扣价" prop="sale">
                                <el-input v-model="shoppingForm.sale"></el-input>
                            </el-form-item>
                            <el-form-item label="成本价" prop="cost">
                                <el-input v-model="shoppingForm.cost"></el-input>
                            </el-form-item>
                            <el-form-item label="总数量" prop="number">
                                <el-input v-model="shoppingForm.number"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <!-- 图文详情 -->
                <div>
                    <div>图文详情</div>
                    <el-form :model="imagetextForm">
                        <div class="shopping-img">
                            商品图片
                            <span>图片大小不能超过2M，建议上传不小于800*800分辨率的图片(最多6张)</span>
                        </div>
                        <el-form-item class="upload-shopping-img">
                            <template>
                                <el-upload
                                        class="shoppingimg"
                                        action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
                                        :file-list="shopImageList"
                                        list-type="picture-card"
                                        :limit="6"
                                        :beforeUpload="beforeShoppingImgUpload"
                                        :on-success="handleShoppingImgSuccess"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="shopImageVisible">
                                    <img width="100%" height="auto" :src="shopImageUrl" alt>
                                </el-dialog>
                            </template>
                        </el-form-item>
                        <div class="shopping-img">
                            商品视频
                            <span>此处可使用1:1尺寸的视频，建议视频时长在60秒内，格式MP4，内容突出产品1到2个核心卖点。</span>
                        </div>
                        <el-form-item class="upload-shopping-img">
                            <el-upload
                                    class="avatar-uploader el-upload--text"
                                    :action="uploadUrl"
                                    :show-file-list="false"
                                    :on-success="handleVideoSuccess"
                                    :before-upload="beforeUploadVideo"
                                    :on-progress="uploadVideoProcess"
                            >
                                <video
                                        v-if="videoForm.Video !='' && videoFlag == false"
                                        :src="videoForm.Video"
                                        class="avatar"
                                        controls="controls"
                                >您的浏览器不支持视频播放
                                </video>
                                <i
                                        v-else-if="videoForm.Video =='' && videoFlag == false"
                                        class="el-icon-plus avatar-uploader-icon"
                                ></i>
                                <el-progress
                                        v-if="videoFlag == true"
                                        type="circle"
                                        :percentage="videoUploadPercent"
                                        style="margin-top:30px;"
                                ></el-progress>
                            </el-upload>
                            <el-dialog :visible.sync="videoVisible">
                                <img width="100%" :src="videoImageUrl" alt>
                            </el-dialog>
                        </el-form-item>
                        <div class="essential">
                            商品详情
                            <span>建议此处上传宽度为800px的图片，单张图片高度不要超过600px,单张图片大小不要超过1M.</span>
                        </div>
                        <div>
                            <el-upload
                                    class="avatar-uploader--quill"
                                    style="visibility: hidden;"
                                    action="http://192.168.1.23:8899/resource-service-v1/resource/upload"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError"
                                    :before-upload="beforeUploadQuill">
                            </el-upload>
                            <quill-editor
                                    v-model="content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                            />
                        </div>
                    </el-form>
                </div>
                <!-- 物流信息 -->
                <div>
                    <div class="basic">物流信息</div>
                    <div class="essential">
                        <span style="color: red;margin-right:4px;margin-left:0">*</span>物流配送
                        <span>为提升消费者的购物体验，请选择此商品要使用的运费模版</span>
                    </div>
                    <el-select v-model="logistics" placeholder="请选择" class="logistics-temp">
                        <el-option
                                v-for="item in freightTemplateList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <!-- 其他 -->
                <div>
                    <div class="basic">其他信息</div>
                    <div class="essential">
                        售后服务
                        <span>提升消费者购物体验，提供售后服务方案</span>
                    </div>
                    <el-checkbox-group v-model="afterService" class="logistics-temp">
                        <el-checkbox label="hasInvoice">提供发票</el-checkbox>
                        <el-checkbox label="canReturn">退换货承诺（购买本商品，若存在质量问题或与描述不符，需要主动提供退换货服务并承担来回邮费）</el-checkbox>
                        <el-checkbox label="afterSales">服务承诺（购买本商品，若存在质量问题或与描述不符，需要主动提供退换货服务并承担来回邮费）</el-checkbox>
                    </el-checkbox-group>
                </div>
                <!-- 提交 -->
                <div class="btn">
                    <el-button class="lookover" @click="goWarehouse">放入仓库</el-button>
                    <el-button class="submit" type="primary" @click="goRelease">立即上架</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
function initClass(arr) {
    arr.forEach(item => {
        if (item.subclass && item.subclass.length < 1) {
            item.subclass = null;
            return;
        } else if (item.subclass) {
            initClass(item.subclass);
        }
    });
}

import * as api from "@/api";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
]

export default {
    data() {
        return {
            id: 0,
            selected: [],
            // 基本信息
            basicForm: {
                code: "",
                name: "",
                brand: "",
                shopList: [],
                shopListval: []
            },
            props: {
                label: "categoryName",
                value: "id",
                children: "subclass"
            },
            shopCategoryList: [],
            getbrandList: [],
            // 类目属性
            attrList: [],
            // 购物信息
            shoppingForm: {
                market: "",
                sale: "",
                cost: "",
                number: ""
            },
            specificationList: [],
            tableData: [],
            // 图文
            imagetextForm: {},
            shopImageVisible: false,
            shopImageUrl: "",
            shopImageUrlList: [],
            uploadUrl: "http://192.168.1.23:8899/resource-service-v1/resource/upload",
            videoImageUrl: "",
            videoVisible: false,
            videoFlag: false,
            videoUploadPercent: 0,
            videoForm: {
                videoUploadId: "",
                Video: ""
            },
            shopImageList: [],

            // 富文本编辑器
            content: "",
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
                placeholder: '',
                theme: 'snow',  // or 'bubble'
                modules: {
                    toolbar: {
                        container: toolbarOptions,  // 工具栏
                        handlers: {
                            'image': function(value) {
                                if (value) {
                                    // 触发input框选择图片文件
                                    document.querySelector('.avatar-uploader--quill input').click()
                                } else {
                                    this.quill.format('image', false);
                                }
                            }

                        }
                    }
                }
            },
            // 物流信息
            logistics: "",
            freightTemplateList: "",
            // 其他
            afterService: [],

            rules: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { min: 1, max: 60, message: "长度在 1 到 60 个字符", trigger: "blur" }
                ],
                brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
                market: [
                    { required: true, message: "请输入销售价格", trigger: "blur" }
                ],
                number: [{ required: true, message: "请输入数量", trigger: "blur" }]
            },

            zidingyiList: [],
            tabelList: [],
        };
    },

    computed: {
        list() {
            const list = this.specificationList
                             .map(item => {
                                 return item.contents
                                            .map(c => (typeof c === "string" ? JSON.parse(c) : c))
                                            .filter(c => c.valueId);
                             })
                             .filter(item => item.length > 0);

            return list;
        }
        ,
        columns() {
            if (this.tabelList.length <= 0) {
                return [];
            }
            return Object.values(this.tabelList[0]).filter(
                item => typeof item === "object"
            );
        }
    }
    ,

    watch: {
        list() {
            const result = this.list.reduce((result, arr) => {
                if (result.length <= 0) {
                    return arr.map(item => ({
                        [item.specId || ""]: item
                    }));
                }
                return result
                .map(item =>
                    arr.map(c => Object.assign({}, item, { [c.specId || ""]: c }))
                )
                .flat(1);
            }, []);

            result.map((item, index) => {
                const cache = this.tabelList[index] || {
                    stock: "",
                    costPrice: "",
                    salePrice: ""
                };
                return {
                    ...item,
                    stock: cache.stock,
                    costPrice: cache.costPrice,
                    salePrice: cache.salePrice
                };
            });

            this.tabelList = result;
        }
    }
    ,

    components: {
        quillEditor
    }
    ,
    mounted() {
        console.log(this.$route.params.id, "商品ID");
        this.selected = JSON.parse(localStorage.getItem("typeid")).selected;
        this.typeval = JSON.parse(localStorage.getItem("typeid")).typeval;
        this.brandList();
        this.categoryList();
        this.getAttrs({
            typeId: this.typeval
        });
        let query = {
            typeId: this.typeval,
            shopId: 1,
            refValue: 1
        };
        this.getSpecs(query);
        this.getTemplates();
        if (this.$route.params.id) {
            let query = {
                id: this.$route.params.id
            };
            this.getProductDetail(query);
        }
    }
    ,
    methods: {
        // 获取分类列表
        async categoryList() {
            const query = {};
            try {
                const ret = await
                    api.categoryList(query);
                const newArr = ret.data.data.categories;
                initClass(newArr);
                this.shopCategoryList = newArr;
            }
            catch (e) {
                console.log(e.message);
            }
        }
        ,
        // 获取品牌列表
        async brandList() {
            const query = {};
            try {
                const ret = await
                    api.brandList(query);
                if (ret.data.code == 200) {
                    this.getbrandList = ret.data.data.pageData;
                } else {
                    console.log("品牌列表获取失败");
                }
            }
            catch (e) {
                console.log(e.message);
            }
        }
        ,
        // 获取类目属性
        async getAttrs(query) {
            try {
                const ret = await
                    api.getAttrs(query);
                if (ret.data.code == 200) {
                    this.attrList = ret.data.data;
                } else {
                    console.log("获取属性失败");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        // 获取规格
        async getSpecs(query) {
            try {
                const ret = await
                    api.getSpecs(query);
                if (ret.data.code == 200 && ret.data.data) {
                    this.specificationList = ret.data.data.map(item => {
                        return {
                            ...item,
                            // 这里需要修改
                            contents:
                                item.spec === "颜色"
                                    ? [
                                        {
                                            specId: item.id || "",
                                            specName: item.spec || "",
                                            valueId: "",
                                            valueName: "",
                                            imageUrl: ""
                                        }
                                    ]
                                    : []
                        };
                    });
                    console.log(ret, "获取规格成功");
                } else {
                    this.specificationList = [];
                    console.log(ret, "获取规格失败");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        // 添加自定义规格值
        async addSpecValue(query) {
            try {
                const ret = await
                    api.addSpecValue(query);
                console.log(ret, "添加规格值");
                if (ret.data.code == 200) {
                    console.log(ret, "添加规格值成功");
                    let query = {
                        typeId: this.typeval,
                        shopId: 1
                    };
                    this.getSpecs(query);
                } else {
                    console.log("添加规格值失败");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        // 获取模板列表
        async getTemplates() {
            const query = {
                shopId: 1
            };
            try {
                let ret = await
                    api.getTemplates(query);
                console.log(ret);
                if (ret.data.code == 200) {
                    console.log("模板列表获取成功");
                    this.freightTemplateList = ret.data.data;
                } else {
                    this.freightTemplateList = [];
                }
            }
            catch (err) {
                alert(err);
            }
        }
        ,
        // 商品发布
        async setProductDetail(data) {
            try {
                let ret = await
                    api.setProductDetail(data);
                console.log(ret);
                if (ret.data.code == 200) {
                    console.log("发布成功");
                    this.$router.push("/e-commerce-selllist");
                } else {
                    console.log("发布失败");
                }
            }
            catch (err) {
                alert(err);
            }
        }
        ,
        // 获取商品详情
        async getProductDetail(query) {
            try {
                let ret = await
                    api.getProductDetail(query);
                if (ret.data.code == 200) {
                    let content = ret.data.data;
                    console.log(content, "商品详情获取成功");
                    this.id = content.id;

                    this.selected = [content.categoryName]; //类目名字
                    this.typeval = content.categoryId; //类目id
                    this.basicForm.name = content.productName; //商品标题
                    // this.specificationList = content.productItems;//规格列表
                    this.content = content.description; //商品详情
                    this.typeval = content.typeId; //类目id
                    this.basicForm.brand = content.brandName; //品牌名称
                    // this.basicForm.shopList.push(content.categoryId || ""); //分类id
                    // this.basicForm.shopListval.push(content.categoryName || ""); //分类名称
                    this.logistics = content.deliveryTemplateId; //模板id
                    this.shopImageList = content.mainImages.map(item => ({ url: item })); //商品图组
                    // this.attrList = content.productAttrs; //商品属性
                    this.basicForm.code = content.productCode || ""; //商品编码
                    this.videoImageUrl = content.flashUrl || ""; //视频地址
                    if (content.canReturn && content.canReturn == 1) {
                        this.afterService.push("canReturn");
                    } //是否退货1退0否
                    if (content.hasInvoice && content.hasInvoice == 1) {
                        this.afterService.push("hasInvoice");
                    } //是否发票1是0否
                    if (content.afterSales && content.afterSales == 1) {
                        this.afterService.push("afterSales");
                    } //售后服务1是0否
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        // 删除自定义规格值
        async delSpecValue(query) {
            try {
                const ret = await
                    api.delSpecValue(query);
                console.log(ret, "删除规格值");
                if (ret.data.code == 200) {
                    console.log(ret, "删除添加规格值成功");
                    let query = {
                        typeId: this.typeval,
                        shopId: 1
                    };
                    this.getSpecs(query);
                } else {
                    console.log("删除规格值失败");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        ,
        // 删除自定义规格值
        delDefaultValue(index) {
            const query = {
                id: index
            };
            this.delSpecValue(query);
        }
        ,
        // 切换类目
        switchType() {
            this.$router.push("/e-commerce-publish");
        }
        ,
        // 商品分类
        handleItemChange(value) {
            this.basicForm.shopListval = [];
            this.basicForm.shopList = [];
            value.reduce((arr, item) => {
                const target = arr.find(t => t.id === item);
                this.basicForm.shopListval.push(target.categoryName);
                this.basicForm.shopList.push(target.id);
                return target.subclass;
            }, this.shopCategoryList);
        }
        ,

        // 删除颜色列表
        delColor(index1, index) {
            this.specificationList[index1].contents.splice(index, 1);
        }
        ,
        // 上传颜色图标
        handleAvatarSuccess(res, file, item) {
            console.log(res, file, "上传的图片");
            item.imageUrl = res.data[0];
        }
        ,
        beforeAvatarUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "jpeg";
            const extension1 = testmsg === "png";
            const extension2 = testmsg === "jpg";
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!extension && !extension1 && !extension2) {
                this.$message({
                    message: "上传文件只能是 jpg,jpeg,png格式!",
                    type: "warning"
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: "上传文件大小不能超过 2MB!",
                    type: "warning"
                });
            }
            return (extension || extension1 || extension2) && isLt2M;
        }
        ,
        handleRemove(file, fileList) {
            console.log(file, fileList);
        }
        ,
        // 添加自定义规格值
        handleAddCustom(option) {
            console.log(option, "获取自定义规格的详情");
            let query = {
                hasImage: 0,
                id: option.id,
                refId: option.refId,
                shopId: 1,
                spec: option.spec,
                typeId: this.typeval, //当前类目id
                values: [option.text]
            };
            this.addSpecValue(query);
            this.shoppingForm.addcustom = "";
        }
        ,
        // 上传商品图片
        handleShoppingImgSuccess(response, file, fileList) {
            console.log(response, file, fileList, "上传商品图片成功");
            this.shopImageUrlList = fileList.map(item => item.response.data[0]);
            this.shopImageUrl = response.data[0];
            // this.shopImageVisible = true;
        }
        ,
        handleShoppingImgRemove(file, fileList) {
            console.log(file, fileList, "删除商品图片");
            this.shopImageUrlList = fileList.map(item => item.response.data[0]);
        }
        ,
        beforeShoppingImgUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "jpeg";
            const extension1 = testmsg === "png";
            const extension2 = testmsg === "jpg";
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!extension && !extension1 && !extension2) {
                this.$message({
                    message: "上传文件只能是 jpg,jpeg,png格式!",
                    type: "warning"
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: "上传文件大小不能超过 2MB!",
                    type: "warning"
                });
            }
            return (extension || extension1 || extension2) && isLt2M;
        }
        ,
        // 上传商品视频
        handleVideoSuccess(res, file) {
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (res.status == 200) {
                this.videoForm.videoUploadId = res.data.uploadId;
                this.videoForm.Video = res.data.uploadUrl;
            } else {
                this.$message.error("视频上传失败，请重新上传！");
            }
        }
        ,
        beforeUploadVideo(file) {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (
                [
                    "video/mp4",
                    "video/ogg",
                    "video/flv",
                    "video/avi",
                    "video/wmv",
                    "video/rmvb"
                ].indexOf(file.type) == -1
            ) {
                this.$message.error("请上传正确的视频格式");
                return false;
            }
            if (!isLt10M) {
                this.$message.error("上传视频大小不能超过10MB哦!");
                return false;
            }
        }
        ,
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0);
        }
        ,

        // 放入从仓库
        goWarehouse() {
            let productItems = this.tabelList.map(item => {
                const result = { specs: [] };
                Object.entries(item).forEach(([key, value]) => {
                    if (key.match(/\d+/)) {
                        result.specs.push(value);
                        return;
                    }
                    result[key] = value;
                });
                return result;
            });
            let productAttrs = this.attrList.map(item => {
                return {
                    attributeName: item.attributeName,
                    valueName: item.value
                };
            });
            if (productItems.length < 1) {
                productItems = [
                    //规格
                    {
                        costPrice: this.shoppingForm.cost, //成本
                        id: 0, //skuid
                        marketPrice: this.shoppingForm.market, //市场价
                        salePrice: this.shoppingForm.sale, //销售价
                        stock: this.shoppingForm.number //数量
                    }
                ];
            }
            const query = {
                id: this.id,
                brandId: JSON.parse(this.basicForm.brand).item.id || "", //品牌id
                brandName: JSON.parse(this.basicForm.brand).item.brandName || "", //品牌名称
                categoryId: this.basicForm.shopList.pop() || "", //分类id
                categoryName: this.basicForm.shopListval.pop() || "", //分类名称
                deliveryTemplateId: this.logistics || "", //模板id
                mainImages: this.shopImageUrlList || [], //商品图组
                productAttrs: productAttrs || [], //商品属性
                productCode: this.basicForm.code, //商品编码
                flashUrl: this.videoImageUrl || "", //视频地址
                canReturn: this.afterService.indexOf("canReturn") == -1 ? "0" : "1", //是否退货1退0否
                hasInvoice: this.afterService.indexOf("hasInvoice") == -1 ? "0" : "1", //是否发票1是0否
                afterSales: this.afterService.indexOf("afterSales") == -1 ? "0" : "1", //售后服务1是0否
                // productItems: [
                //   //规格
                //   {
                //     //一行
                //     costPrice: 0, //成本
                //     id: 0, //skuid
                //     marketPrice: 0, //市场价
                //     salePrice: 0, //销售价
                //     sortBy: 0, //排序
                //     specs: [
                //       {
                //         imageUrl: "", //图片
                //         sku: "",
                //         specId: 0, //规格id(颜色)
                //         specName: "", //规格名称(颜色)
                //         valueId: 0, //值id(红色)
                //         valueName: "" //值名称--备注
                //       }
                //     ],
                //     stock: 0 //数量
                //   }
                // ],
                productItems: productItems,
                productName: this.basicForm.name, //商品标题
                shopId: 1,
                description: this.content, //商品详情
                typeId: this.typeval, //类目id
                upSelling: "0" //是否上架
            };
            this.setProductDetail(query);
        }
        ,
        // 立即上架
        goRelease() {
            let productItems = this.tabelList.map(item => {
                const result = { specs: [] };
                Object.entries(item).forEach(([key, value]) => {
                    if (key.match(/\d+/)) {
                        result.specs.push(value);
                        return;
                    }
                    result[key] = value;
                });
                return result;
            });
            if (productItems.length < 1) {
                productItems = [
                    //规格
                    {
                        costPrice: this.shoppingForm.cost, //成本
                        id: 0, //skuid
                        marketPrice: this.shoppingForm.market, //市场价
                        salePrice: this.shoppingForm.sale, //销售价
                        stock: this.shoppingForm.number //数量
                    }
                ];
            }
            const query = {
                id: this.id,
                brandId: JSON.parse(this.basicForm.brand).item.id || "", //品牌id
                brandName: JSON.parse(this.basicForm.brand).item.brandName || "", //品牌名称
                categoryId: this.basicForm.shopList.pop() || "", //分类id
                categoryName: this.basicForm.shopListval.pop() || "", //分类名称
                deliveryTemplateId: this.logistics || "", //模板id
                mainImages: this.shopImageUrlList || [], //商品图组
                productAttrs: this.attrList || [], //商品属性
                productCode: this.basicForm.code, //商品编码
                flashUrl: this.videoImageUrl || "", //视频地址
                canReturn: this.afterService.indexOf("canReturn") == -1 ? "0" : "1", //是否退货1退0否
                hasInvoice: this.afterService.indexOf("hasInvoice") == -1 ? "0" : "1", //是否发票1是0否
                afterSales: this.afterService.indexOf("afterSales") == -1 ? "0" : "1", //售后服务1是0否
                // productItems: [
                //   //规格
                //   {
                //     //一行
                //     costPrice: 0, //成本
                //     id: 0, //skuid
                //     marketPrice: 0, //市场价
                //     salePrice: 0, //销售价
                //     sortBy: 0, //排序
                //     specs: [
                //       {
                //         imageUrl: "", //图片
                //         sku: "",
                //         specId: 0, //规格id(颜色)
                //         specName: "", //规格名称(颜色)
                //         valueId: 0, //值id(红色)
                //         valueName: "" //值名称--备注
                //       }
                //     ],
                //     stock: 0 //数量
                //   }
                // ],
                productItems: productItems,
                productName: this.basicForm.name, //商品标题
                shopId: 1,
                description: this.content, //商品详情
                typeId: this.typeval, //类目id
                upSelling: "1" //是否上架
            };
            this.setProductDetail(query);
        },
        // 新增一行颜色
        handleAddColor(item) {
            item.contents.push({
                imageUrl: "",
                specId: item.id || "",
                specName: item.spec || "",
                valueId: "",
                valueName: ""
            });
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            //  console.log(row, column, rowIndex, columnIndex)
        },
        // 上传图片前
        beforeUploadQuill(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "jpeg";
            const extension1 = testmsg === "png";
            const extension2 = testmsg === "jpg";
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!extension && !extension1 && !extension2) {
                this.$message({
                    message: "上传文件只能是 jpg,jpeg,png格式!",
                    type: "warning"
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: "上传文件大小不能超过 2MB!",
                    type: "warning"
                });
            }
            return (extension || extension1 || extension2) && isLt2M;
            this.quillUpdateImg = true
        },
        // 上传图片成功
        uploadSuccess(res,file) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditor.quill
            // 如果上传成功
            if (res.data && res.data.length > 0) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  res.info为服务器返回的图片地址
                quill.insertEmbed(length, 'image', res.data[0])
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                this.$message.error('图片插入失败')
            }
            // loading动画消失
            this.quillUpdateImg = false
        },
        // 上传图片失败
        uploadError() {
            // loading动画消失
            this.quillUpdateImg = false
            this.$message.error('图片插入失败')
        }
    }
};
</script>
<style lang="less" scoped>
@color: #1260fb;
.commodity {
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
    .typevals {
        font-weight: 500;
        .el-button {
            background-color: @color;
            width: 96px;
            height: 40px;
            margin-left: 20px;
        }
    }
    .message-box {
        padding: 0 28px;
        box-sizing: border-box;
        .basic {
            margin-bottom: 20px;
            margin-top: 30px;
        }
        .demo-basicForm {
            position: relative;
        }
        .essential {
            font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Helvetica,
            NotoSansCJK-Regular, Helvetica Neue, Helvetica, Sans-serif, Arial,
            Droid Sans;
            margin-left: 50px;
            margin-bottom: 20px;
            margin-top: 30px;
            span {
                margin-left: 20px;
                color: #666666;
            }
        }
    }
    .brand-code {
        .el-input {
            width: 350px;
            height: 40px;
        }
        .el-select {
            width: 350px;
            height: 40px;
        }
    }
    .brand-code-label {
        /deep/ label {
            width: 80px !important;
        }
    }
    .el-input {
        width: 800px;
        height: 40px;
    }
    .el-select {
        width: 800px;
        height: 40px;
    }
    .el-cascader {
        width: 800px;
    }
    .addstandard {
        width: 160px;
        height: 56px;
        color: #fff;
        line-height: 56px;
        text-align: center;
        background: #0b2698;
        border-radius: 28px;
        margin-left: 20px;
        display: inline-block;
    }

    .el-radio-group {
        width: 580px;
        label {
            margin-left: 30px;
        }
    }
    .shopdetail {
        width: 100%;
        height: 500px;
        margin-bottom: 60px;
    }
    .btn {
        width: 100%;
        text-align: center;
        height: 68px;
        line-height: 68px;
        margin-top: 34px;
        .el-button {
            width: 122px;
            height: 40px;
            text-align: center;
            font-size: 14px;
            border-radius: 2px;
        }
        .lookover {
            background: #f1f1f1;
            border: 1px solid #999999;
            border-radius: 2px;
        }
        .submit {
            background: @color;
            border-radius: 2px;
            color: #fff;
            margin-left: 26px;
        }
    }
    // 属性类目
    .type-category-title {
        margin-left: 60px;
        span {
            margin-left: 20px;
            color: #666666;
        }
    }
    .type-category {
        padding: 30px 60px;
        width: 800px;
        margin-left: 130px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        margin-top: 16px;
        box-sizing: border-box;
        background-color: rgba(232, 232, 232, 0.25);
        .el-select {
            width: 220px;
            height: 40px;
            margin-bottom: 16px;
        }
        .el-input {
            width: 220px;
            height: 40px;
            margin-bottom: 16px;
        }
    }
    /deep/ .el-form--inline .el-form-item__content {
        margin-left: 12px !important;
    }
    // 购物信息
    .Shopping-meaasge {
        padding-top: 20px;
        .el-input {
            width: 126px;
            height: 40px;
        }
        .el-select {
            width: 126px;
            height: 40px;
        }
        /deep/ .el-form-item__label {
            width: 88px !important;
            padding-right: 0px;
        }
    }
    .el-table td div {
        width: 90px;
        /deep/ input {
            width: 90px;
            height: 40px;
            border: none;
        }
    }
    .color-category {
        .el-input {
            width: 280px;
            height: 40px;
        }
        .el-select {
            width: 350px;
            height: 40px;
            margin-right: 10px;
            margin-left: 130px;
        }
        .avatar-uploader {
            width: 40px;
            height: 40px;
            position: relative;
            display: inline-block;
            margin-left: 10px;
            .avatar {
                width: 40px;
                height: 40px;
            }
            /deep/ .el-upload {
                width: 40px;
                height: 40px;
                line-height: 40px;
                position: absolute;
                left: 0;
                top: 0;
                border: none;
                i {
                    font-size: 14px;
                }
            }
        }
        .el-button {
            margin-left: 20px;
        }
    }
    .size-category {
        .el-input {
            width: 220px;
            height: 40px;
            margin-left: 130px;
        }
        .el-button {
            width: 122px;
            background-color: #f1f1f1;
            margin-left: 10px;
            color: #101010;
            border: 1px solid #999999;
            border-radius: 2px;
        }
    }
    .size-select {
        background: rgba(232, 232, 232, 0.25);
        border: 1px solid #999999;
        border-radius: 2px;
        margin-left: 130px;
        width: 800px;
        padding: 30px 40px;
        box-sizing: border-box;
        .el-checkbox {
            width: auto;
            margin-right: 40px;
        }
    }
    /deep/ .el-table th,
    .el-table tr {
        background-color: #f1f1f1;
        padding: 0;
    }
    .price-style {
        margin-left: 65px;
        display: flex;
        .el-form-item {
            width: 226px;
        }
        .el-input {
            width: 126px;
            height: 40px;
        }
    }
    // 图文详情
    .shopping-img {
        margin: 20px 0 20px 60px;
        span {
            margin-left: 20px;
            color: #666666;
        }
    }
    .upload-shopping-img {
        margin-left: 130px;
        .shoppingimg {
            /deep/ .el-upload--picture-card {
                width: 120px;
                height: 120px;
                line-height: 120px;
            }
            /deep/ .el-upload-list--picture-card .el-upload-list__item {
                width: 120px;
                height: 120px;
                margin: 0 16px 0 0;
            }
        }
    }
    .avatar-uploader {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 120px;
        height: 120px;
        cursor: pointer;
        line-height: 120px;
        vertical-align: top;
        text-align: center;
        /deep/ .el-upload {
            width: 100%;
            height: 100%;
            line-height: 120px;
            border: none;
        }
        i {
            font-size: 24px;
        }
    }
    .quill-editor {
        width: 800px;
        height: 600px;
        margin-left: 140px;
    }
    /deep/ .ql-container.ql-snow {
        height: 534px !important;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
        height: auto;
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
    }
    // 物流
    .logistics-temp {
        margin-left: 130px;
    }
    // 其他
    .el-checkbox {
        width: 100%;
        margin-bottom: 16px;
    }
}
</style>
