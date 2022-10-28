export default {
	state: {
		//表格中显示的列
		selectedColumnList: localStorage.getItem('selected_column_list'),
		//被选中的表格行列表
		selectedRows: [],
	},
	mutations: {
		/**
		* 改变表格显示列
		* @description 表格显示列保存在 Vuex 和 cookie 中
		* @param {object} state Vuex 的 state 对象
		* @param {[]} data 表格需要显示的列数组
		*/
		changeSelectedColumnList(state, data) {
			localStorage.setItem('selected_column_list', data.toString())
			state.selectedColumnList = data.toString()
		},
		/**
		* 设置表格被选中的行列表
		* @param {object} state Vuex的state对象
		* @param {array} data 被选中的行列表
		*/
		changeSelectedRows(state, data) {
			state.selectedRows = data
		},
	},
	actions: {}
}