<template>
  <div id="app">
		<Header v-if="isHeaderShow" id="headWrapper"></Header>
		<router-view :class="{'main-content': isHeaderShow}"></router-view>
	</div>
</template>

<script>
import Header from "@/components/nav/Header"

export default {
	name: 'App',
	components: {
		Header,
	},
	computed: {
		//头部是否显示
		isHeaderShow() {
			let routerNameList = ['Login','Register']
			return routerNameList.includes(this.$route.name) ? false : true
		},
	},
}
</script>

<style lang="stylus">
#app {
  height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: none;
  overflow-y: auto;

  .el-menu-item.is-active {  
    background-color: #ecf5ff;
    border-bottom: none !important; 
  }

  .main-content {
    flex: 1;
    width: 100%;
    min-height: calc(100vh - 80px);
    display: flex;   
  }
}

/*滚动条样式*/
::-webkit-scrollbar {
    width: 8px; 
    height: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: #409EFF;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    background-color: #ecf5ff;
    border-radius: 10px;         
}
</style>