import Cookies from 'js-cookie'

const cookie = {
	/**
	 * 设置Cookies
	 * @param {string} name 名称
	 * @param {string} value 值
	 * @param {object} others 域名、路径、有效期等,封装到对象中
	 */
	setCookies(name, value, others = null) {
		Cookies.set(name, value, { domain: "", ...others })
	},
	/**
	 * 获取Cookies
	 * @param {string} name 名称
	 * @param {object} others 域名、路径等,封装到对象中
	 * @returns {string} Cookies值
	 */
	getCookies(name, others = null) {
		return Cookies.get(name, { domain: "", ...others })
	},
	/**
	 * 移除Cookies
	 * @param {string} name 名称
	 * @param {object} others 域名、路径等,封装到对象中
	 */
	removeCookies(name, others = null) {
		Cookies.remove(name, { domain: "", ...others })
	}
}
export default cookie