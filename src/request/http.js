import axios from 'axios'
import cookie from './common'
import router from '@/router/index'
import { MessageBox, Message } from 'element-ui'

// 登录提醒
const loginTip = function () {
	MessageBox.alert('You are not logged in, please log in first!', 'Prompt message', {
		confirmButtonText: 'OK',
		callback: () => {
			router.push({
				path: '/Login',
				query: { Rurl: router.currentRoute.fullPath } //将当前页面的url传递给login页面进行操作
			})
		}
	})
}

// 请求超时时间
axios.defaults.timeout = 10000 * 5

// 请求基础URL
axios.defaults.baseURL = '/api'

// POST请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求携带cookie
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(
	(config) => {
        config.headers['token'] = cookie.getCookies('token')
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			return Promise.resolve(response)
		}
	},
	// 服务器状态码不是200的情况
	(error) => {
		if (error.response.status) {
			switch (error.response.status) {
				case 404:
					Message.warning('Interface does not exist')
					break
				case 401:
					loginTip()
					break
				case 500:
					Message.error('Service exception')
					break
				case 502:
					Message.error('Service exception')
					break
				default:
					Message.warning(error.response.data.message)
					return Promise.reject(error.response)
			}
		}
	}
)

/**
 * 封装get方法,对应GET请求
 * @param {string} url 请求url
 * @param {object} params 查询参数
 * @returns {Promise}
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
        .get(url, {
            params: params
        })
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err.data)
        })
	})
}

/**
 * 封装post方法,对应POST请求
 * @param {string} url 请求url
 * @param {object} data 请求体
 * @param {boolean | undefined} info 请求体是否为FormData格式
 * @returns {Promise}
 */
export function post(url, data = {}, info) {
	return new Promise((resolve, reject) => {
		let newData = data
		if (info) {
			// 转formData格式
			newData = new FormData()
			for (let i in data) {
				newData.append(i, data[i])
			}
		}
		axios
        .post(url, newData)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err.data)
        })
	})
}

/**
 * 封装put方法,对应PUT请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function put(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, params).then(
			(res) => {
				resolve(res.data)
			},
			(err) => {
				reject(err.data)
			}
		)
	})
}

/**
 * 封装axiosDelete方法,对应DELETE请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function axiosDelete(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
        .delete(url, params)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err.data)
        })
	})
}