import request from "@/utils/request";
// 登录
export function fromLogin(data) {
  return request({
    url: "sfy-mall-v2/m/product/list",
    method: "post",
    params: data
  });
}
// 商品列表
export function productList(query) {
  return request({
    url: "sfy-mall-v2/m/product/list",
    method: "get",
    params: query
  });
}
// 分类列表
export function categoryList(query) {
  return request({
    url: "sfy-mall-v2/m/product/category/getCategories",
    method: "get",
    params: query
  });
}
// 分类列表删除
export function categoryListDel(data) {
  return request({
    url: "sfy-mall-v2/m/product/category/del",
    method: "post",
    params: data
  });
}
// 获取分类
export function category(query) {
  return request({
    url: "sfy-mall-v2/m/product/category/getCategoriesByPid",
    method: "get",
    params: query
  });
}
// 单个设置商品
export function setPart(data) {
  return request({
    url: "sfy-mall-v2/m/product/setPart",
    method: "post",
    params:data
  });
}

// 新建分类
export function addProductCategory(data) {
  return request({
    url: "sfy-mall-v2/m/product/category/set",
    method: "post",
    params: data
  });
}
// 上传商品图片
export function setProductImage(data) {
  return request({
    url: "sfy-mall-v2/m/resource/upload",
    method: "post",
    params: data
  });
}
// 获取类目列表
export function typeList(query) {
  return request({
    url: "sfy-mall-v2/m/product/type/list",
    method: "get",
    params: query
  });
}
// 添加修改类目
export function typeSet(data) {
  return request({
    url: "sfy-mall-v2/m/product/type/set",
    method: "post",
    params: data
  });
}
// 删除类目
export function typeDel(data) {
  return request({
    url: "sfy-mall-v2/m/product/type/del",
    method: "post",
    params: data
  });
}
// 获取规格列表组合
// export function getSpecsWithSys(query) {
//   return request({
//     url: "/common/getSpecsWithSys",
//     method: "get",
//     params: query
//   });
// }

// 获取默认规格工具
export function getSpecs(query) {
  return request({
    url: "sfy-mall-v2/m/common/getSpecs",
    method: "get",
    params: query
  });
}
// 添加自定义规格
export function addSpecValue(data) {
  return request({
    url: "sfy-mall-v2/m/common/addSpecValue",
    method: "post",
    data
  });
}
// 删除自定义的规格名称
export function delSpec(query) {
  return request({
    url: "sfy-mall-v2/m/common/delSpec",
    method: "post",
    params: query
  });
}
// 删除自定义规格数值
export function delSpecValue(query) {
  return request({
    url: "sfy-mall-v2/m/common/delSpecValue",
    method: "post",
    params: query
  });
}
// 获取默认属性
export function getAttrs(query) {
  return request({
    url: "sfy-mall-v2/m/common/getAttrs",
    method: "get",
    params: query
  });
}
// 保存自定义属性
export function setAttrValue(data) {
  return request({
    url: "sfy-mall-v2/m/common/setAttrValue",
    method: "post",
    data
  });
}
// 删除自定义属性
export function delAttr(data) {
  return request({
    url: "sfy-mall-v2/m/common/delAttr",
    method: "post",
    params: data
  });
}
// 删除属性值
export function delAttrValue(data) {
  return request({
    url: "sfy-mall-v2/m/common/delAttrValue",
    method: "post",
    params: data
  });
}
// 获取品牌类表
export function brandList(query) {
  return request({
    url: "sfy-mall-v2/m/brand/list",
    method: "get",
    params: query
  });
}
// 新建(修改)品牌列表
export function brandSet(data) {
  return request({
    url: "sfy-mall-v2/m/brand/set",
    method: "post",
    data
  });
}

// 获取品牌列表详情
export function getById(query) {
  return request({
    url: "sfy-mall-v2/m/brand/getById",
    method: "get",
    params: query
  });
}

// 删除品牌类表
export function brandDel(query) {
  return request({
    url: "sfy-mall-v2/m/brand/del",
    method: "post",
    params: query
  });
}

// 获取模板列表
export function getTemplates(query) {
  return request({
    url: "sfy-mall-v2/m/delivery/getTemplates",
    method: "get",
    params: query
  });
}

// 获取配送模板
export function getTemplate(query) {
  return request({
    url: "sfy-mall-v2/m/delivery/getTemplate",
    method: "get",
    params: query
  });
}
// 设置配送模板
export function setTemplate(data) {
  return request({
    url: "sfy-mall-v2/m/delivery/setTemplate",
    method: "post",
    data
  });
}

// 删除配送模板
export function delTemplate(data) {
  return request({
    url: "sfy-mall-v2/m/delivery/delTemplate",
    method: "post",
    params: data
  });
}

// 获取地区
export function geoList(query) {
  return request({
    url: "sfy-mall-v2/geo/list",
    method: "get",
    params: query
  });
}
// 删除区域
export function delRegion(data) {
  return request({
    url: "sfy-mall-v2/m/delivery/delRegion",
    method: "post",
    params: data
  });
}

// 设置区域明细
export function setRegionItems(data) {
  return request({
    url: "sfy-mall-v2/m/delivery/setRegionItems",
    method: "post",
    data
  });
}

// 批量设置商品列表
export function batchPart(data) {
  return request({
    url: "sfy-mall-v2/m/product/batchPart",
    method: "post",
    data
  });
}

// 商品发布
export function setProductDetail(data) {
  return request({
    url: "sfy-mall-v2/m/product/setProductDetail",
    method: "post",
    data
  });
}

// 获取商品详情信息
export function getProductDetail(query) {
  return request({
    url: "sfy-mall-v2/m/product/getById",
    method: "get",
    params:  query
  });
}

// 获取订单列表
export function getOrderList(query) {
  return request({
    url: "sfy-mall-v2/m/order/getList",
    method: "get",
    params:  query
  });
}

// 分类列表排序
export function categorySort(query) {
  return request({
    url: "sfy-mall-v2/m/product/category/sort",
    method: "post",
    params:  query
  });
}

// 类目排序
export function typeSort(query) {
  return request({
    url: "sfy-mall-v2/m/product/type/sort",
    method: "post",
    params:  query
  });
}

// 首页管理
// 获取列表
export function getBannerList(query) {
  return request({
    url: "resource-service-v1/banner/page/",
    method: "get",
    params:  query
  });
}

// 添加banner
export function addBanner(data) {
  return request({
    url: "resource-service-v1/banner/add/",
    method: "post",
    data
  });
}

// 删除banner
export function delBanner(param) {
  return request({
    url: `resource-service-v1/banner/delete/${param}`,
    method: "delete",
  });
}
// 上线
export function changeStatusbanner(data) {
  return request({
    url: "resource-service-v1/banner/changeStatus/",
    method: "put",
    data
  });
}
// 获取详情
export function getBanner(param) {
  return request({
    url: `resource-service-v1/banner/get/${param}`,
    method: "get",
  });
}
// 修改
export function updateBanner(data) {
  return request({
    url: "resource-service-v1/banner/update/",
    method: "put",
    data
  });
}

// 020部分
// 商家管理首页--商家列表
export function getShopList(query) {
  return request({
    url: "sfy-mall-v2/m/shop/list/",
    method: "get",
    params:  query
  });
}
// 删除商户
export function shopDel(query) {
  return request({
    url: "sfy-mall-v2/m/shop/del/",
    method: "post",
    params:  query
  });
}

// 开通/禁用


// 获取商家类型
export function getShoptypes(query) {
  return request({
    url: "sfy-mall-v2/m/shop/getTypes",
    method: "get",
    params:  query
  });
}

// 获取商家品类
export function getCategoriesList(query) {
  return request({
    url: "sfy-mall-v2/m/categories/getList/",
    method: "get",
    params:  query
  });
}

// 获取佣金方式
export function getFeeTypes(query) {
  return request({
    url: "sfy-mall-v2/m/shop/getFeeTypes/",
    method: "get",
    params:  query
  });
}

// 获取业务员
export function getSalesMan(query) {
  return request({
    url: "sfy-mall-v2/m/shop/getSalesMan/",
    method: "get",
    params:  query
  });
}

// 新增商家
export function setShop(data) {
  return request({
    url: "sfy-mall-v2/m/shop/set/",
    method: "post",
    data
  });
}




export function updateArticle(data) {
  return request({
    url: "http://192.168.1.34:5006/",
    method: "post",
    data
  });
}
