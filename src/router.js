import Vue from "vue";
import Router from "vue-router";
import * as api from "@/api";
import Cookies from "js-cookie";

Vue.use(Router);


 const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/home")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/login")
        },
        {
            path: "/homeManagement",
            name: "homeManagement",
            component: () => import("./views/homeManagement")
        },
        {
            path: "/addhomeManagement",
            name: "addhomeManagement",
            component: () => import("./views/addhomeManagement"),
            meta: {
                menu: 'addhomeManagement'
            },
        },
        {
            path: "e-commerce",
            name: "eCommerce",
            component: () => import("./views/e-commerce"),
            redirect: { name: "eCommerceHome" },
            children: [
                {
                    path: "/e-commerce-home",
                    name: "eCommerceHome",
                    component: () => import("./views/e-commerce/home")
                },
                {
                    path: "/e-commerce-classification",
                    name: "eCommerceClassification",
                    component: () => import("./views/e-commerce/classification")
                },
                // 发布选类目
                {
                    path: "/e-commerce-publish",
                    name: "eCommercePublish",
                    component: () => import("./views/e-commerce/publish"),
                },
                // 发布
                {
                    path: "/e-commerce-commodity",
                    name: "eCommerceCommodity",
                    component: () => import("./views/e-commerce/commodity"),
                    meta: {
                        menu: 'eCommercePublish'
                    },
                },
                {
                    path: "/e-commerce-category",
                    name: "eCommerceCategory",
                    component: () => import("./views/e-commerce/category"),
                },
                {
                    path: "/e-commerce-brand",
                    name: "eCommerceBrand",
                    component: () => import("./views/e-commerce/brand"),
                },
                {
                    path: "/e-commerce-autarkyorder",
                    name: "eCommerceAutarkyOrder",
                    component: () => import("./views/e-commerce/autarkyorder"),
                },
                {
                    path: "/e-commerce-brandorder",
                    name: "eCommerceBrandOrder",
                    component: () => import("./views/e-commerce/brandorder"),
                },
                {
                    path: "/e-commerce-freight",
                    name: "eCommerceFreight",
                    component: () => import("./views/e-commerce/freight"),
                },
                {
                    path: "/e-commerce-newfreight",
                    name: "eCommerceNewFreight",
                    component: () => import("./views/e-commerce/newfreight"),
                    meta: {
                        menu: 'eCommerceFreight'
                    },
                },
                // 出售商品列表
                {
                    path: "/e-commerce-selllist",
                    name: "eCommerceSellList",
                    component: () => import("./views/e-commerce/selllist")
                },
                // 仓库
                {
                    path: "/e-commerce-warehouselist",
                    name: "eCommerceWarehouseList",
                    component: () => import("./views/e-commerce/warehouselist")
                },
                // 多媒体库
                {
                    path: "/e-commerce-media",
                    name: "eCommerceMedia",
                    component: () => import("./views/e-commerce/media")
                }

            ]
        },
        {
            path: "/services", 
            name: "services",
            component: () => import("./views/services"),
            redirect: { name: "servicesDispose" }, 
            children: [
                {
                    path: "/services-dispose",
                    name: "servicesDispose",
                    component: () => import("./views/services/dispose"),
                },
                {
                    path: "/services-adverthome",
                    name: "servicesAdverthome",
                    component: () => import("./views/services/dispose/adverthome"),
                    meta: {
                        menu: 'servicesDispose',
                    },
                },
                {
                    path: "/services-store",
                    name: "servicesStore",
                    component: () => import("./views/services/store"),
                },
                {
                    path: "/services-storeAdd",
                    name: "servicesStoreAdd",
                    component: () => import("./views/services/storeAdd"),
                    meta: {
                        menu: 'servicesStore',
                    },
                },
                {
                    path: "/services-account",
                    name: "servicesAccount",
                    component: () => import("./views/services/account"),
                 },
                {
                    path: "/services-addaccount",
                    name: "servicesAddaccount",
                    component: () => import("./views/services/addaccount"),
                    meta: {
                        menu: 'servicesAccount',
                    },
                },
                {
                    path: "/services-accountauthority",
                    name: "servicesAccountauthority",
                    component: () => import("./views/services/accountauthority"),
                    meta: {
                        menu: 'servicesAccount',
                    },
                },
                {
                    path: "/services-examinestore",
                    name: "servicesExaminestore",
                    component: () => import("./views/services/examinestore"),
                 },
                 {
                    path: "/services-examinegoods",
                    name: "servicesExaminegoods",
                    component: () => import("./views/services/examinesgoods"),
                 },
                {
                    path: "/services-storehome",
                    name: "servicesStoreHome",
                    component: () => import("./views/services/storehome"),
                },
                {
                    path: "/services-setting",
                    name: "servicesSetting",
                    component: () => import("./views/services/setting"),
                },
                {
                    path: "/services-settingspecifications",
                    name: "servicesSettingspecifications",
                    component: () => import("./views/services/settingspecifications"),
                },
                {
                    path: "/services-settingAdd",
                    name: "servicesSettingAdd",
                    component: () => import("./views/services/settingAdd"),
                    meta: {
                        menu: 'servicesSetting',
                    },
                },
                {
                    path: "/services-delivery",
                    name: "servicesDelivery",
                    component: () => import("./views/services/delivery/commodity"),
                 },
                {
                    path: "/services-deliverycommoditysort",
                    name: "servicesDeliveryCommoditysort",
                    component: () => import("./views/services/delivery/commoditysort"),
                    meta: {
                        menu: 'servicesDelivery',
                    },
                },
                {
                    path: "/services-service",
                    name: "servicesService",
                    component: () => import("./views/services/service/commodity"),
                 },
                 {
                    path: "/services-servicecommoditysort",
                    name: "servicesServiceCommoditysort",
                    component: () => import("./views/services/service/commoditysort"),
                    meta: {
                        menu: 'servicesService',
                    },
                },
                {
                    path: "/services-orderdelivery",
                    name: "servicesOrderDelivery",
                    component: () => import("./views/services/ordersystem/orderdelivery"),
                 },
                 {
                    path: "/services-orderdeliverydetail",
                    name: "servicesOrderDeliveryDetail",
                    component: () => import("./views/services/ordersystem/orderdeliverydetail"),
                    meta: {
                        menu: 'servicesOrderDelivery',
                    },
                 },
                 {
                    path: "/services-orderdeliverytrack",
                    name: "servicesOrderDeliveryTrack",
                    component: () => import("./views/services/ordersystem/orderdeliverytrack"),
                    meta: {
                        menu: 'servicesOrderDelivery',
                    },
                 },
                 {
                    path: "/services-ordercoupon",
                    name: "servicesOrderCoupon",
                    component: () => import("./views/services/ordersystem/ordercoupon"),
                 },
                 {
                    path: "/services-ordercoupondetail",
                    name: "servicesOrderCouponDetail",
                    component: () => import("./views/services/ordersystem/ordercoupondetail"),
                    meta: {
                        menu: 'servicesOrderCoupon',
                    },
                 },
                 {
                    path: "/services-financestatis",
                    name: "servicesFinanceStatis",
                    component: () => import("./views/services/finance/financestatis"),
                 },
                 {
                    path: "/services-financebill",
                    name: "servicesFinanceBill",
                    component: () => import("./views/services/finance/financebill"),
                 },
                 {
                    path: "/services-financedetail",
                    name: "servicesFinanceDetail",
                    component: () => import("./views/services/finance/financedetail"),
                    meta: {
                        menu: 'servicesFinanceBill',
                    },
                 },
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
});

// router.beforeEach(async(to, from, next) => {
//     try {
//         if(to.name === 'login') {
//             return next();
//         }
//         const ret = await api.getUserInfo();
//         if(ret.data.username && ret.data.id) {
//             // Cookies.set('username', username)
//             return next();
//         } else {
//             return router.push('/login')
//         }
//     } catch(err) {
//         return router.push('/login')
//         console.log(err)
//     }
// })
export default router;
