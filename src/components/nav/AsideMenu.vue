<template>
	<div class="side-menu-wrapper">
    <el-menu
      class="side-menu"
      :default-active="activeIndex"
      :router="true"
      :collapse="isCollapse"
    >
      <el-menu-item
        index="Task"
        :route="{ name: 'Task' }"
        class="menu-item"
      >
        <i class="el-icon-data-analysis"></i>
        <span slot="title">Task</span>
      </el-menu-item>
      <el-menu-item
        index="Cflow"
        :route="{ name: 'Cflow' }"
        class="menu-item"
      >
        <i class="el-icon-s-operation"></i>
        <span slot="title">Flow</span>
      </el-menu-item>
      <el-menu-item
        index="Dataset"
        :route="{ name: 'Dataset' }"
        class="menu-item"
      >
        <i class="el-icon-files"></i>
        <span slot="title">Dataset</span>
      </el-menu-item>
    </el-menu>	
		<!-- 展开 & 收缩分类栏 -->
		<el-tooltip
			effect="dark"
			:content="isCollapse ? 'Expand' : 'Collapse'"
			placement="right"
		>
			<div
				class="aside-title"
				@click="isCollapse ? (isCollapse = false) : (isCollapse = true)"
			>
				<i
					class="icon"
					:class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
					:title="isCollapse ? 'Expand' : 'Collapse'"
				></i>
			</div>
		</el-tooltip>
	</div>
</template>

<script>
export default {
	name: 'AsideMenu',
	data() {
		return {
			isCollapse: false, //控制菜单收缩展开
		}
	},
	computed: {
		//当前激活菜单的 index
		activeIndex() {
			return this.$route.name
		},
	},
	watch: {
		//监听收缩状态变化,存储在localStorage中,保证页面刷新时仍然保存设置的状态
		isCollapse(newValue) {
			localStorage.setItem('aside_is_collapse', newValue)
		}
	},
	created() {
		this.isCollapse = localStorage.getItem('aside_is_collapse') === 'true' //读取保存的状态
	},
}
</script>

<style lang="stylus" scoped>
.side-menu-wrapper {
  position: relative;
  height: calc(100vh - 80px);
  padding-right: 11px;
  .side-menu {    
    height: calc(100vh - 80px); //高度设置为屏幕高度减去顶部导航栏的高度
    overflow: auto;
    
    .el-menu-item.is-active {
      background: #ecf5ff;
    }

    .menu-item {
      box-shadow: 0 4px 12px 0 #F2F6FC;
    }
  }
  >>> .el-menu {
    background: transparent;
  }
  //对展开状态下的菜单设置宽度
  .side-menu:not(.el-menu--collapse) {
    width: 210px;
  }
  //折叠图标调整样式
  .aside-title {
    position: absolute;
    top: calc(50% - 50px);
    right: 0;
    z-index: 2;
    background: #DCDFE6;
    color: #fff;
    width: 12px;
    height: 100px;
    line-height: 100px;
    cursor: pointer;
    border-radius: 0 16px 16px 0;
    &:hover {
      opacity: 0.7;
    }
    .icon {
      font-size: 12px;
    }
  }
}
</style>