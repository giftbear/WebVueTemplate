// 表格相关接口
import { get, post } from './http'

/**
* 获取表格数据相关接口
*/
// 获取任务表格数据
export const getTaskData = (p) => get('/table/getTaskData', p)

/**
* 搜索表格数据相关接口
*/
// 获取搜索后任务表格数据
export const searchTask = (p) => get('/table/searchTask', p)