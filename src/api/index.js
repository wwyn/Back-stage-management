import request from "@/utils/request";
// 登录
export function fromLogin(data) {
  return request({
    url: "/product/list",
    method: "post",
    params: data
  });
}
// 商品列表
export function productList(query) {
  return request({
    url: "/product/list",
    method: "get",
    params: query
  });
}
// 分类列表
export function categoryList(query) {
  return request({
    url: "/product/category/getCategories",
    method: "get",
    params: query
  });
}
// 分类列表删除
export function categoryListDel(data) {
  return request({
    url: "/product/category/del",
    method: "post",
    params: data
  });
}
// 获取分类
export function category(query) {
  return request({
    url: "/product/category/getCategoriesByPid",
    method: "get",
    params: query
  });
}
// 单个设置商品
export function setPart(data) {
  return request({
    url: "/product/setPart",
    method: "post",
    params:data
  });
}

// 新建分类
export function addProductCategory(data) {
  return request({
    url: "/product/category/set",
    method: "post",
    params: data
  });
}
// 上传商品图片
export function setProductImage(data) {
  return request({
    url: "/resource/upload",
    method: "post",
    params: data
  });
}
// 获取类目列表
export function typeList(query) {
  return request({
    url: "/product/type/list",
    method: "get",
    params: query
  });
}
// 添加修改类目
export function typeSet(data) {
  return request({
    url: "/product/type/set",
    method: "post",
    params: data
  });
}
// 删除类目
export function typeDel(data) {
  return request({
    url: "/product/type/del",
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
    url: "/common/getSpecs",
    method: "get",
    params: query
  });
}
// 添加自定义规格
export function addSpecValue(data) {
  return request({
    url: "/common/addSpecValue",
    method: "post",
    data
  });
}
// 删除自定义的规格名称
export function delSpec(query) {
  return request({
    url: "/common/delSpec",
    method: "post",
    params: query
  });
}
// 删除自定义规格数值
export function delSpecValue(query) {
  return request({
    url: "/common/delSpecValue",
    method: "post",
    params: query
  });
}
// 获取默认属性
export function getAttrs(query) {
  return request({
    url: "/common/getAttrs",
    method: "get",
    params: query
  });
}
// 保存自定义属性
export function setAttrValue(data) {
  return request({
    url: "/common/setAttrValue",
    method: "post",
    data
  });
}
// 删除自定义属性
export function delAttr(data) {
  return request({
    url: "/common/delAttr",
    method: "post",
    params: data
  });
}
// 删除属性值
export function delAttrValue(data) {
  return request({
    url: "/common/delAttrValue",
    method: "post",
    params: data
  });
}
// 获取品牌类表
export function brandList(query) {
  return request({
    url: "/brand/list",
    method: "get",
    params: query
  });
}
// 新建(修改)品牌列表
export function brandSet(data) {
  return request({
    url: "/brand/set",
    method: "post",
    data
  });
}

// 获取品牌列表详情
export function getById(query) {
  return request({
    url: "/brand/getById",
    method: "get",
    params: query
  });
}

// 删除品牌类表
export function brandDel(query) {
  return request({
    url: "/brand/del",
    method: "post",
    params: query
  });
}

// 获取模板列表
export function getTemplates(query) {
  return request({
    url: "/m/delivery/getTemplates",
    method: "get",
    params: query
  });
}

// 获取配送模板
export function getTemplate(query) {
  return request({
    url: "/m/delivery/getTemplate",
    method: "get",
    params: query
  });
}
// 设置配送模板
export function setTemplate(data) {
  return request({
    url: "/m/delivery/setTemplate",
    method: "post",
    data
  });
}

// 删除配送模板
export function delTemplate(data) {
  return request({
    url: "/m/delivery/delTemplate",
    method: "post",
    params: data
  });
}

// 获取地区
export function geoList(query) {
  return request({
    url: "/geo/list",
    method: "get",
    params: query
  });
}
// 删除区域
export function delRegion(data) {
  return request({
    url: "/m/delivery/delRegion",
    method: "post",
    params: data
  });
}

// 设置区域明细
export function setRegionItems(data) {
  return request({
    url: "/delivery/setRegionItems",
    method: "post",
    data
  });
}

// 批量设置商品列表
export function batchPart(data) {
  return request({
    url: "/product/batchPart",
    method: "post",
    data
  });
}

// 商品发布
export function setProductDetail(data) {
  return request({
    url: "/product/setProductDetail",
    method: "post",
    data
  });
}

// 获取商品详情信息
export function getProductDetail(query) {
  return request({
    url: "/product/getById",
    method: "get",
    params:  query
  });
}

// 获取订单列表
export function getOrderList(query) {
  return request({
    url: "/m/order/getList",
    method: "get",
    params:  query
  });
}

// 分类列表排序
export function categorySort(query) {
  return request({
    url: "/product/category/sort",
    method: "post",
    params:  query
  });
}

// 类目排序
export function typeSort(query) {
  return request({
    url: "/product/type/sort",
    method: "post",
    params:  query
  });
}



export function updateArticle(data) {
  return request({
    url: "http://192.168.1.34:5006/",
    method: "post",
    data
  });
}
