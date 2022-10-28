import Vue from 'vue'
import Vuex from 'vuex'

import tableList from './module/tableList' //表格列表模块

Vue.use(Vuex)

const allColumnList = [	
	"taskId",
	"taskName",	
	"taskFile",
	"taskFlow",	
	"taskStatus",
	"taskRunStatus",	
	"taskBegainTime",	
	"taskEndTime",
	"taskResultUrl"
]

export default new Vuex.Store({
	state: {

	},
	getters: {
		//表格显示列
		selectedColumnList: (state) =>
			state.tableList.selectedColumnList === null
				? allColumnList
				: state.tableList.selectedColumnList.split(','),

	},
	mutations: {
	
	},
	actions: {

	},
	modules: {
		tableList,
	}
})