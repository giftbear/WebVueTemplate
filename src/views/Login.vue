<template>
<div class="login-wrapper">
	<!-- 标题 -->
	<h1 class="login-title">Sign in</h1>	
	<!-- 登录表单 -->
	<el-form
		class="login-form"
		ref="loginForm"
		:model="loginForm"
		:rules="loginFormRules"
		hide-required-asterisk
	>
		<el-form-item prop="username">
			<el-input
				prefix-icon="el-icon-user-solid"
				v-model="loginForm.username"
				placeholder="Username"
			></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				prefix-icon="el-icon-lock"
				v-model="loginForm.password"
				placeholder="Password"
				show-password
			></el-input>
		</el-form-item>
		<el-form-item>		
			<el-button
				class="login-btn"
				type="primary"
				:loading="loginBtnLoading"
				@click="submitForm('loginForm')"
				>Sign in</el-button>
		</el-form-item>
	</el-form>
	<!-- 注册链接 -->
	<div class="login-register">
		<p>New to Here?<el-link type="primary" @click="$router.push({name: 'Register'})">Create an account</el-link></p>
	</div>		
</div>
</template>

<script>
import { login } from '@/request/user'
import cookie from '@/request/common'

export default {
name: 'Login',
data() {
	return {
		//登录表单数据
		loginForm: {
			username: '',
			password: ''
		},
		//登录表单验证规则
		loginFormRules: {
			username: [
				{ required: true, message: 'Please input your username!', trigger: 'blur' }
			],
			password: [
				{ required: true, message: 'Please input your password!', trigger: 'blur' },
				{ min: 6, max: 20, message: 'The length is between 6 and 20 characters!', trigger: 'blur'}
			]
		},
		loginBtnLoading: false //登录按钮的加载状态
	}
},
computed: {
	url() {
		let _url = this.$route.query.Rurl //获取路由前置守卫中next函数的参数,即登录后要去的页面
		return _url
			? { path: _url }
			: { name: 'Home' } //若登录之前有页面,则登录后仍然进入该页面
	},
},
created() {
	//用户若已登录,自动跳转到首页
	if (this.$store.getters.isLogin) {
		let username = this.$store.getters.username
		this.$message({
			message: `${username},you have signed in!`,
			center: true,
			type: 'success'
		})
		this.$router.replace({ name: 'Home' })
	}
},
methods: {
	/**
	* 登录按钮点击事件: 表单验证&用户登录
	* @param {boolean} formName 表单ref值
	*/
	submitForm(formName) {
		this.loginBtnLoading = true
		this.$refs[formName].validate((valid) => {
			if (valid) {
				//验证通过
				this.handleUserLogin(formName)				
			} else {
				this.$message.error('Please complete the information!')
				this.loginBtnLoading = false
				return false
			}
		})
	},
	/**
	* 用户登录
	*/
	handleUserLogin(formName) {
		login(this.loginForm, true)
		.then((res) => {
			this.loginBtnLoading = false
			if (res.success) {
				cookie.setCookies('token', res.data.token) //存储登录状态
				this.$message.success('Successful login!')
				this.$router.replace(this.url) //跳转到前一个页面或者主页
				this.$refs[formName].resetFields() //清空表单
			} else {
				this.$message.error('Username or password error!')
			}
		})
	}
}
}
</script>

<style lang="stylus" scoped>
.login-wrapper {
  	padding-top: 30px;
  	width: 375px;
    margin: 0 auto;
    text-align: center;	
  
	.login-title {
		font-weight: 300;
		font-size: 30px;
		color: #000;
	}

    .login-form {
		width: 335px;
		padding: 20px;
		padding-bottom: 0px;
		background-color: #f6f8fa;
		border: 1px solid #DCDFE6;
		border-radius: 6px 6px 6px 6px;

		>>> .el-form-item__content {
			margin-left: 0 !important;
		}

		&>>> .el-input__inner {
			font-size: 16px;
		}

        .login-btn {
          	width: 100%;
        }

        &>>> .el-button {
			padding: 10px 90px;
			font-size: 16px;
        }
    }

	.login-register {
		width: 100%;
		margin-top: 10px;
		border: 1px solid #DCDFE6;
	  	border-radius: 6px 6px 6px 6px;
	}
}
</style>