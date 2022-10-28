<template>
<div class="anchorSideMenu-wrapper">
    <el-menu
        background-color=""
        text-color=""
        active-text-color=""
        :default-active="activeIndex"
        @select="selectMenu"
    >   
    <!--<div v-for="(item,index) in sideMenuList" :key="item.id">
        <el-menu-item :index="item.id">
            <span slot="title">{{item.firstitle}}</span>
        </el-menu-item>
        <el-menu-item-group v-if="item.secondtitle.length>0" v-for="(temp,index) in item.secondtitle" :key="temp.id">
            <el-menu-item :index="temp.id">
            <span>{{temp.title}}</span>
            </el-menu-item>
        </el-menu-item-group>
        </div>-->
        <div v-for="(item,index) in sideMenuList" :key="item.id">
            <el-submenu v-if="item.secondtitle.length>0" :index="item.id">
                <span slot="title">{{item.firstitle}}</span>    
                <el-menu-item-group v-for="(temp,index) in item.secondtitle" :key="temp.id">
                    <el-menu-item :index="temp.id">
                        <span>{{temp.title}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.id">
                <span slot="title">{{item.firstitle}}</span>
            </el-menu-item>
        </div>
    </el-menu>
</div>
</template>

<script>
export default {
    name: 'AnchorSideMenu',
    //父组件向子组件传值
    props: {
        //导航菜单列表
        sideMenuList: {
            type: Array,
            required: true
        },
        //锚点Id(根据锚点Id选中导航菜单,锚点Id与导航菜单index值相同)
        anchorId: {
            type: String
        }
    },
    data() {
        return {
            activeIndex: ''
        }
    },
    watch: {
        anchorId() {
            this.activeIndex = this.anchorId
        }
    },
    methods: {
        /**
        * 将选择的菜单传递给父组件实现滑动到指定锚点
        * @param {string} key 导航菜单key值即index值
        */
        selectMenu(key) {
            this.$emit("toParentId",key)
        },
    }
}
</script>

<style scoped>
.el-menu-item.is-active {
    border-right: solid 3px #409EFF;
}
</style>