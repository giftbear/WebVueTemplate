//用户任务相关接口
import { get, post } from './http'

//获取用户任务表格数据
export const getTask = (p) => get('/task/getTask', p)
//获取搜索后用户任务表格数据
export const searchTask = (p) => get('/task/searchTask', p)
//新增用户任务数据
export const newTask = (p) => post('/task/newTask', p)
//修改用户任务数据
export const editTask = (p) => post('/task/editTask', p)
