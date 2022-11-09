<template>
    <el-container>
        <el-aside width="200px">
            <AnchorSideMenu @toParentId="toContent" :sideMenuList="sideMenuList" :anchorId="anchorId"></AnchorSideMenu>
        </el-aside>
        <el-main>
            <div ref="mcontent" class="mcontent">
                <div class="acontent" id="x">
                    <h3>Single cell sequencing</h3>
                    <h4>10X Genomics</h4>
                    <img :src="xUrl" width="800" />              
                </div>       
                <div class="acontent" id="">
                </div>
                <div class="acontent" id="">
                </div>
            </div>
        </el-main>    
    </el-container>
</template>
 
<script>
import AnchorSideMenu from "@/components/nav/AnchorSideMenu"

export default {
data() {
    return {
        //导航菜单列表
        sideMenuList: [
            {
                firstitle: 'Single cell sequencing',
                id: 'scs',
                secondtitle: [
                    {title: '10X Genomics',id: 'x'}
                ]
            }
        ],
        //锚点Id
        anchorId: null,
        xUrl: require('@/assets/document/10X_Genomics.png'),
    }
},
components: {
    AnchorSideMenu,
},
methods: {
    /**
     * 根据导航菜单传的index滑动到指定锚点内容
     * @param {string} id 导航菜单选中的index值
     */
    toContent(id) {
        // var el = document.getElementById(id)
        // this.$nextTick(function() {
        //     window.scrollTo({"behavior": "smooth","top": el&&el.offsetTop})
        // })
        document.querySelector('#'+id).scrollIntoView({behavior: 'smooth'})
    },
    /**
     * 获取内容滑动时的锚点Id
     * 
     */
    onScroll() {
        //获取所有锚点距顶部的距离offsetTop和元素高度offsetHeight
        const navContents = document.querySelectorAll('.acontent')
        const offsetArr = []
        navContents.forEach(item => {
            let temp={
                offsetTop: item.offsetTop,
                offsetHeight: item.offsetHeight,
                id: item.id,
            }
            offsetArr.push(temp)
        })

        //获取当前元素的滚动距离scrollTop
        //const scrollTop = document.documentElement.scrollTop || document.body.scrollTop 
        //判断是否滑动到底了
        const ele = document.querySelector('.mcontent')
        let isBottom = ele.scrollTop + ele.clientHeight - ele.scrollHeight
        if(isBottom>=0){
            this.anchorId = offsetArr[offsetArr.length-1].id
        }else{
            const scrollTop = ele.scrollTop

            //获取滑动到的锚点(锚点Id与导航菜单index的值相同)
            let navIndex = ''
            for (let n = 0; n < offsetArr.length; n++) {
                //if(scrollTop >= offsetArr[n].offsetTop){
                if((scrollTop>offsetArr[n].offsetTop-offsetArr[0].offsetTop)&&(scrollTop<offsetArr[n].offsetTop+offsetArr[n].offsetHeight)){
                    navIndex = offsetArr[n].id
                }
            }
            this.anchorId = navIndex
        }
    },
},
//监听元素的滚动条
mounted() {
    const scrollview = this.$refs['mcontent']
    scrollview.addEventListener('scroll',this.onScroll)
},
destroy() {
    this.$refs.mcontent.removeEventListener('scroll',this.onScroll)
}
}
</script>

<style lang="stylus" scoped>
.el-aside {
    position: fixed;
    top: 80px;
    height: calc(100vh - 80px);
}
.mcontent {
    position: absolute;
    left: 220px;
    top: 80px;
    height: calc(100vh - 80px);
    width: calc(100% - 220px);
    overflow-y: auto;
}
</style>