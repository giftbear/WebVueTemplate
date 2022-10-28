<template>
<div class="register-wrapper">
	<!-- 标题 -->
	<h1 class="register-title">Sign up</h1>	
	<!-- 注册表单 -->
	<el-form
		class="register-form"
		ref="registerForm"
		:model="registerForm"
		:rules="registerFormRules"
		hide-required-asterisk
	>
		<el-form-item prop="username">
			<el-input
				prefix-icon="el-icon-user-solid"
				v-model="registerForm.username"
				placeholder="Username"
			></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				prefix-icon="el-icon-lock"
				v-model="registerForm.password"
				placeholder="Password"
				show-password
			></el-input>
		</el-form-item>
		<el-form-item>		
			<el-button
				class="register-btn"
				type="success"
				:loading="registerBtnLoading"
				@click="submitForm('registerForm')"
				>Sign up</el-button>
		</el-form-item>
	</el-form>	
</div>
</template>

<script>
import { addUser } from '@/request/user'

export default {
name: 'Register',
data() {
	return {
		//注册表单数据
		registerForm: {
			username: '',
			password: ''
		},
		//注册表单验证规则
		registerFormRules: {
			username: [
				{ required: true, message: 'Please input your username!', trigger: 'blur' }
			],
			password: [
				{ required: true, message: 'Please input your password!', trigger: 'blur' },
				{ min: 6, max: 20, message: 'The length is between 6 and 20 characters!', trigger: 'blur'}
			]
		},
		registerBtnLoading: false //注册按钮的加载状态
	}
},
methods: {
	/**
	* 注册按钮点击事件: 表单验证&用户注册
	* @param {boolean} formName 表单ref值
	*/
	submitForm(formName) {
		this.registerBtnLoading = true
		this.$refs[formName].validate((valid) => {
			if (valid) {
				//验证通过
				this.handleUserRegister(formName)				
			} else {
				this.$message.error('Please complete the information!')
				this.registerBtnLoading = false
				return false
			}
		})
	},
	/**
	* 用户注册
	*/
	handleUserRegister(formName) {	
		addUser(this.registerForm)		
		.then((res) => {
			this.registerBtnLoading = false
			if (res.success) {
				this.$notify({
					title: 'Success',
					message: 'Successful registration, jump to the login page!',
					type: 'success'
				})
				this.$refs[formName].resetFields() //清空表单
				this.$router.replace({ path: '/Login' }) //跳转到登录页面				
			} else {
				this.$message.error(res.message)
			}
		})
		.catch(() => {
			this.registerBtnLoading = false
		})
	}
}
}
</script>

<style lang="stylus" scoped>
.register-wrapper {
  	padding-top: 30px;
  	width: 375px;
    margin: 0 auto;
    text-align: center;	
  
	.register-title {
		font-weight: 300;
		font-size: 30px;
		color: #000;
	}

    .register-form {
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

        .register-btn {
          	width: 100%;
        }

        &>>> .el-button {
			padding: 10px 90px;
			font-size: 16px;
        }
    }
}
</style>