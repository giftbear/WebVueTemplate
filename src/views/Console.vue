<template>
	<div class="console-wrapper">
		<el-container>
			<el-aside width="auto">
				<AsideMenu></AsideMenu>
			</el-aside>
			<el-main class="el-main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import AsideMenu from "@/components/nav/AsideMenu"

export default {
	name: 'Console',
	components: {
		AsideMenu,
	}
}
</script>

<style lang="stylus" scoped>
.el-aside {
	height: calc(100vh - 90px);
	overflow: hidden;
	margin-top: 10px
}

.el-main {
	padding: 0px 16px !important;
	overflow: hidden;
	background-color: #d3e8f2;
	margin-top: 10px
}
</style>