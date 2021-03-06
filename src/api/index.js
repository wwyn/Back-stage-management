import request from "@/utils/request";
// 获取图形验证码
export function getImageCode(data) {
  return request({
    url: "sfy-user/valid/imageCode",
    method: "get",
    params: data
  });
}
// 系统登录
export function sysUserLogin(data) {
  return request({
    url: "sfy-user/sysUser/sysUserLogin",
    method: "post",
    data
  });
}
// 获取登录用户信息
export function getUserInfo(data) {
  return request({
    url: "sfy-user/auth/user/getUserInfo",
    method: "get",
    params: data
  });
}
// 登录
export function fromLogin(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/list",
    method: "post",
    params: data
  });
}
// 商品列表
export function productList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/list",
    method: "get",
    params: query
  });
}
// 分类列表
export function categoryList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/getCategories",
    method: "get",
    params: query
  });
}
// 分类列表删除
export function categoryListDel(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/del",
    method: "post",
    params: data
  });
}
// 获取分类
export function category(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/getCategoriesByPid",
    method: "get",
    params: query
  });
}
// 单个设置商品
export function setPart(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/setPart",
    method: "post",
    params:data
  });
}

// 新建分类
export function addProductCategory(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/set",
    method: "post",
    params: data
  });
}
// 上传商品图片
export function setProductImage(data) {
  return request({
    url: "sfy-biz-mall/auth/m/resource/upload",
    method: "post",
    params: data
  });
}
// 获取类目列表
export function typeList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/type/list",
    method: "get",
    params: query
  });
}
// 添加修改类目
export function typeSet(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/type/set",
    method: "post",
    params: data
  });
}
// 删除类目
export function typeDel(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/type/del",
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
    url: "sfy-biz-mall/auth/m/common/getSpecs",
    method: "get",
    params: query
  });
}
// 添加自定义规格
export function addSpecValue(data) {
  return request({
    url: "sfy-biz-mall/auth/m/common/addSpecValue",
    method: "post",
    data
  });
}
// 删除自定义的规格名称
export function delSpec(query) {
  return request({
    url: "sfy-biz-mall/auth/m/common/delSpec",
    method: "post",
    params: query
  });
}
// 删除自定义规格数值
export function delSpecValue(query) {
  return request({
    url: "sfy-biz-mall/auth/m/common/delSpecValue",
    method: "post",
    params: query
  });
}
// 获取默认属性
export function getAttrs(query) {
  return request({
    url: "sfy-biz-mall/auth/m/common/getAttrs",
    method: "get",
    params: query
  });
}
// 保存自定义属性
export function setAttrValue(data) {
  return request({
    url: "sfy-biz-mall/auth/m/common/setAttrValue",
    method: "post",
    data
  });
}
// 删除自定义属性
export function delAttr(data) {
  return request({
    url: "sfy-biz-mall/auth/m/common/delAttr",
    method: "post",
    params: data
  });
}
// 删除属性值
export function delAttrValue(data) {
  return request({
    url: "sfy-biz-mall/auth/m/common/delAttrValue",
    method: "post",
    params: data
  });
}
// 获取品牌类表
export function brandList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/brand/list",
    method: "get",
    params: query
  });
}
// 新建(修改)品牌列表
export function brandSet(data) {
  return request({
    url: "sfy-biz-mall/auth/m/brand/set",
    method: "post",
    data
  });
}

// 获取品牌列表详情
export function getById(query) {
  return request({
    url: "sfy-biz-mall/auth/m/brand/getById",
    method: "get",
    params: query
  });
}

// 删除品牌类表
export function brandDel(query) {
  return request({
    url: "sfy-biz-mall/auth/m/brand/del",
    method: "post",
    params: query
  });
}

// 获取模板列表
export function getTemplates(query) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/getTemplates",
    method: "get",
    params: query
  });
}

// 获取配送模板
export function getTemplate(query) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/getTemplate",
    method: "get",
    params: query
  });
}
// 设置配送模板
export function setTemplate(data) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/setTemplate",
    method: "post",
    data
  });
}

// 删除配送模板
export function delTemplate(data) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/delTemplate",
    method: "post",
    params: data
  });
}

// 获取地区
export function geoList(query) {
  return request({
    url: "sfy-biz-mall/geo/list",
    method: "get",
    params: query
  });
}
// 删除区域
export function delRegion(data) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/delRegion",
    method: "post",
    params: data
  });
}

// 设置区域明细
export function setRegionItems(data) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/setRegionItems",
    method: "post",
    data
  });
}

// 批量设置商品列表
export function batchPart(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/batchPart",
    method: "post",
    data
  });
}

// 商品发布
export function setProductDetail(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/setProductDetail",
    method: "post",
    data
  });
}

// 获取商品详情信息
export function getProductDetail(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/getById",
    method: "get",
    params:  query
  });
}

// 获取订单列表
export function getOrderList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/order/getList",
    method: "get",
    params:  query
  });
}

// 分类列表排序
export function categorySort(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/sort",
    method: "post",
    params:  query
  });
}

// 类目排序
export function typeSort(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/type/sort",
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
// 上线/下线
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
// 移动
export function changeWeightBanner(data) {
  return request({
    url: "resource-service-v1/banner/changeWeight/",
    method: "put",
    data
  });
}
// 020部分
// 商家管理首页--商家列表
export function getShopList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/list/",
    method: "get",
    params:  query
  });
}
// 商家审核
export function examineShop(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/checkShop",
    method: "post",
    params:  query
  });
}
// 商家信息
export function getShopById(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/getById/",
    method: "get",
    params:  query
  });
}
// 删除商户
export function shopDel(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/del/",
    method: "post",
    params:  query
  });
}

// 单个开通/禁用
export function shopChecked(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/checked/",
    method: "post",
    params:  query
  });
}

// 批量开通/禁用/删除
export function shopBatchChecked(data) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/batchChecked",
    method: "post",
    data
  });
}


// 获取商家类型
export function getShoptypes(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/getTypes",
    method: "get",
    params:  query
  });
}

// 获取商家品类
export function getCategoriesList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/categories/getList/",
    method: "get",
    params:  query
  });
}

// 获取佣金方式
export function getFeeTypes(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/getFeeTypes/",
    method: "get",
    params:  query
  });
}

// 获取业务员
export function getSalesMan(query) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/getSalesMan/",
    method: "get",
    params:  query
  });
}

// 新增商家
export function setShop(data) {
  return request({
    url: "sfy-biz-mall/auth/m/shop/set/",
    method: "post",
    data
  });
}

// 020规格设置---获取规格列表
export function getSpecsByShopId(query) {
  return request({
    url: "sfy-biz-mall/auth/m/common/getSpecsByShopId",
    method: "get",
    params:  query
  });
}
// 获取规格值
export function getSpec(query) {
  return request({
    url: "sfy-biz-mall/auth/m/common/getSpec",
    method: "get",
    params:  query
  });
}
// 设置规格值
export function setSpecValue(data) {
  return request({
    url: "sfy-biz-mall/auth/m/common/setSpecValue",
    method: "post",
    data
  });
}
// 获取配料列表
export function getParts(query) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/getParts",
    method: "get",
    params:  query
  });
}
// 获取配料列表
export function getMyParts(query) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/getMyParts",
    method: "get",
    params:  query
  });
}
// 批量设置配料
export function batchAddParts(data) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/batchAddParts",
    method: "post",
    data
  });
}
// 设置配料
export function setParts(data) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/setParts",
    method: "post",
    data
  });
}
// 删除配料
export function removeParts(data) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/remove",
    method: "post",
    data
  });
}
// 获取配料信息
export function getPart(query) {
  return request({
    url: "sfy-biz-mall/auth/m/parts/getPart",
    method: "get",
    params:  query
  });
}


// 配送商品管理--获取审核详情
export function getLogList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/log/list",
    method: "get",
    params:  query
  });
}
// 审核商品
export function productCheckProduct(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/checkProduct",
    method: "post",
    params:  query
  });
}
// 批量审核商品
export function batchCheckProduct(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/batchCheckProduct",
    method: "post",
    params:  query
  });
}
// 设置商品
export function setGeneralProduct(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/setGeneralProduct",
    method: "post",
    data
  });
}
// 设置商品规格020
export function setProductSpecs(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/setProductSpecs",
    method: "post",
    data
  });
}

// 获取配送商品分类
export function getCategoriesByShop(query) {
  return request({
    url: "sfy-biz-mall/auth/m/product/category/getCategoriesByShop",
    method: "get",
    params:  query
  });
}




// 服务商品管理--添加修改
export function setVirtualProduct(data) {
  return request({
    url: "sfy-biz-mall/auth/m/product/setVirtualProduct",
    method: "post",
    data
  });
}
// 服务商品管理--获取预约列表
export function getProdReserveListByPid(query) {
  return request({
    url: "sfy-biz-mall/auth/m/prodReserve/getListByPid",
    method: "get",
    params:  query
  });
}

// 删除预约信息
export function removeProdReserve(query) {
  return request({
    url: "sfy-biz-mall/auth/m/prodReserve/remove",
    method: "post",
    params:  query
  });
}

// 批量添加时间段
export function batchAddProdReserve(data) {
  return request({
    url: "sfy-biz-mall/auth/m/prodReserve/batchAdd",
    method: "post",
    data
  });
}

// 订单跟踪
export function getLogs(query) {
  return request({
    url: "sfy-biz-mall/auth/m/delivery/getLogs",
    method: "get",
    params:  query
  });
}


// APP配置--首页配置
export function getPageList(query) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/getPageList",
    method: "get",
    params:  query
  });
}

// 添加广告
export function setResources(data) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/set",
    method: "post",
    data
  });
}
// 广告上下线
export function setStatus(query) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/setStatus",
    method: "post",
    params:  query
  });
}
// 删除广告
export function removeById(query) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/removeById",
    method: "post",
    params:  query
  });
}
// 广告置顶
export function setTop(query) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/setTop",
    method: "post",
    params:  query
  });
}
// 获取单个详情
export function getResourcesById(query) {
  return request({
    url: "sfy-biz-mall/auth/m/resources/getById",
    method: "get",
    params:  query
  });
}

// 删除商家分类
export function categoriesRemove(query) {
  return request({
    url: "sfy-biz-mall/auth/m/categories/remove",
    method: "post",
    params:  query
  });
}
// 设置商家分类
export function categoriesSet(query) {
  return request({
    url: "sfy-biz-mall/auth/m/categories/set",
    method: "post",
    params:  query
  });
}
// 获取分类详情
export function getCategoriesById(query) {
  return request({
    url: "sfy-biz-mall/auth/m/categories/getById",
    method: "get",
    params:  query
  });
}

// 商家是否显示
export function setShow(query) {
  return request({
    url: "sfy-biz-mall/auth/m/categories/setShow",
    method: "post",
    params:  query
  });
}
// 品牌商家列表
export function getVipShops(query) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/getVipShops",
    method: "get",
    params:  query
  });
}

// 选择品牌商家
export function addVipShops(data) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/addVipShops",
    method: "post",
    data
  });
}

// 设置推荐
export function setRecommend(query) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/set",
    method: "post",
    params:  query
  });
}


// 移除推荐
export function recommendRemove(query) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/remove",
    method: "post",
    params:  query
  });
}

// 甄选列表
export function getCheckShops(query) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/getCheckShops",
    method: "get",
    params:  query
  });
}

// 选择甄选
export function addCheckShops(data) {
  return request({
    url: "sfy-biz-mall/auth/m/recommend/addCheckShops",
    method: "post",
    data
  });
}


// 020--订单系统
// 获取订单详情
export function getOrderDetail(query) {
  return request({
    url: "sfy-biz-mall/auth/m/order/getDetail",
    method: "get",
    params:  query
  });
}

// 获取操作日志
export function getOrderLogs(query) {
  return request({
    url: "sfy-biz-mall/auth/m/order/getLogs",
    method: "get",
    params:  query
  });
}
// 确认接单
export function orderMerchantConfirm(query) {
  return request({
    url: "sfy-biz-mall/auth/m/order/merchantConfirm",
    method: "post",
    params:  query
  });
}
// 修改发票信息
export function orderSetInvoiceInfo(data) {
  return request({
    url: "sfy-biz-mall/auth/m/order/setInvoiceInfo",
    method: "post",
    data
  });
}
// 修改收货地址
export function orderSetDeliveryAddress(data) {
  return request({
    url: "sfy-biz-mall/auth/m/order/setDeliveryAddress",
    method: "post",
    data
  });
}
// 订单备注
export function orderRemark(query) {
  return request({
    url: "sfy-biz-mall/auth/m/order/remark",
    method: "post",
    params:  query
  });
}

// 确认消费
export function getMyOrderCode(query) {
  return request({
    url: "sfy-biz-mall/u/order/getMyOrderCode",
    method: "get",
    params:  query
  });
}

// 系统用户列表
export function getSysUserList(query) {
  return request({
    url: "sfy-user/auth/sysUser/getSysUserList",
    method: "get",
    params:  query
  });
}

// 设置用户信息
export function setSysUser(data) {
  return request({
    url: "sfy-user/auth/sysUser/setSysUser",
    method: "post",
    data
  });
}

// 获取用户信息
export function getSysUser(query) {
  return request({
    url: "sfy-user/auth/sysUser/getSysUser",
    method: "get",
    params:  query
  });
}


// 设置是否禁用
export function setEnabled(query) {
  return request({
    url: "sfy-user/auth/user/setEnabled",
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
