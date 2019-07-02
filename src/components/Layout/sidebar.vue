<template>
    <div class="g-sidebar">
        <el-menu
                :default-active="active"
                :default-openeds="openeds"
                class="menu"
                background-color="#fff"
                text-color="#101010"
                active-text-color="#1260fb"
        >
            <template v-for="(item, i) in menu">
                <el-submenu :key="i" :index="item.name" v-if="item.children" style="background: #fff">
                    <i slot="title" class="iconfont" :class="`${item.src}`"></i>
                    <span slot="title">{{ item.name }}</span>
                    <el-menu-item v-for="(sub, j) in item.children" :index="sub.name" :key="`${i}-${j}`">
                        <router-link slot="title" :to="{ name: sub.link }" class="chlid">{{ sub.name }}</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item :key="i" :index="item.name" v-else>
                    <i slot="title" class="iconfont" :class="`${item.src}`"></i>
                    <router-link slot="title" :to="{ name: item.link }">{{ item.name }}</router-link>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "g-sidebar",
    props: {
        title: {
            type: String,
            default: "诺管理系统"
        },
        menu: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        active() {
            const name = (this.$route.meta && this.$route.meta.menu) || this.$route.name;
            return (this.menuChildren.find(item => name === item.link) || { name: '1' }).name;
        },
        menuChildren() {
            return this.menu.reduce((arr, item) => item.children ? arr.concat(item.children) : arr, [])
        },
        openeds() {
            const name = (this.$route.meta && this.$route.meta.menu) || this.$route.name;
            return this.menuChildren.filter(item => name === item.link).map(item => item.opened)
        }
    }
};
</script>
<style lang="less" scoped>
.logo {
    width: 80px;
    height: 80px;
    margin: auto;
    margin-bottom: 15px;

    img {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        vertical-align: middle;
    }
}

.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #fff !important;
}

.chlid {
    color: #666;
    margin-left: 24px;
}

/deep/ .el-menu-item {
    height: 32px;
    margin-bottom: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 26px 0 24px !important;
    box-sizing: border-box;
    i {
        color: #101010;
        margin-right: 8px;
    }
    a {
        color: #101010;
        font-size: 14px;
        text-decoration: none;
        font-family: sans-serif, serif;
    }
}

.el-submenu.is-active .el-submenu__title {
    background-color: #fff !important;
}

/deep/ .el-submenu__icon-arrow {
    right: 26px;
}

/deep/ .el-submenu__title {
    height: 32px;
    line-height: 32px;
    margin-bottom: 12px;
    background-color: #fff !important;
    text-align: left;
    padding: 0 26px 0 24px !important;
    span {
        font-size: 14px;
        margin-left: 10px;
    }
    i {
        font-size: 14px;
        color: #101010 !important;
    }
}

.el-menu {
    border-right: none;
}

/deep/ .el-menu-item.is-active {
    background-color: #fff !important;
    color: #1260fb;
    i {
        color: #1260fb;
    }
    a {
        color: #1260fb;
    }
}

.el-submenu .el-menu-item {
    font-size: 14px;
}

.corporate-name {
    font-family: sans-serif, serif;
    font-size: 20px;
    color: #101010;
    margin-bottom: 50px;
}

.g-sidebar {
    color: #101010;
    font-size: 14px;
    width: 100%;
    height: 100%;
    text-align: center;
}

.title {
    font-size: 20px;
    margin-bottom: 10px;
}

.menu {
}
</style>
