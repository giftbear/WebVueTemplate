<template>
	<div class="header-wrapper">
		<img class="logo" :src="logoUrl" @click="$router.push({ name: 'Home' })" />
		<el-menu
      :default-active="$route.meta.activeMenu"
      active-text-color="#409EFF"
			class="top-menu-list"
			mode="horizontal"
			router
		>
      <el-menu-item index="Repository" :route="{ name: 'Repository' }">Repository</el-menu-item>
      <el-menu-item index="Console" :route="{ name: 'Console' }">Console</el-menu-item>
      <el-menu-item index="Document" :route="{ name: 'Document' }">Document</el-menu-item>
      <el-submenu class="user" index="user">
        <template slot="title">
          <el-avatar :src="userAvatar"></el-avatar>
          <el-badge is-dot v-if="msgCount>0"></el-badge>
        </template>        
        <el-menu-item index="Setting">
          <template slot="title">
          <i class="el-icon-s-tools"></i>
          Settings
          </template>
        </el-menu-item>
        <el-menu-item index="Message">
          <template slot="title">
          <i class="el-icon-message-solid"></i>          
          Messages
          <el-badge is-dot v-if="msgCount>0"></el-badge>
        </template>  
        </el-menu-item>              
        <el-menu-item @click="exitButton()">
          <template slot="title">
          <i class="el-icon-switch-button"></i>
          Sign out
          </template>
        </el-menu-item>
      </el-submenu>
		</el-menu>
	</div>
</template>

<script>
import cookie from '@/request/common'

export default {
	name: 'Header',
	data() {
		return {
			logoUrl: require('@/assets/logo.png'),
      userAvatar: require('@/assets/bear.png'),
      msgCount: 1,
		}
	},
  methods: {
    /**
		 * 退出登录
		 * @description 清除cookie存放的token并跳转到登录页面
		 */
		exitButton() {
			this.$message.success('Sign out successfully!')
			cookie.removeCookies('token')
      this.$store.dispatch('getUserInfo').then(() => {
			  this.$router.push({ name: 'Home' })
      })
		}
  }
}
</script>

<style lang="stylus" scoped>
.header-wrapper {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;

  .logo {
    margin: 14px 24px 0 24px;
    display: inline-block;
    height: 40px;
    cursor: pointer;
  }

  >>> .el-menu--horizontal {
    .el-menu-item:not(.is-disabled):hover {
      color: #409EFF;
      background: #ecf5ff;
    }
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;    
  }

  .top-menu-list {
    flex: 1;

    .user {
      float: right;
    }
  }
}
</style>