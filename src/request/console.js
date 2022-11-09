//用户控制台相关接口
import { get, post } from './http'

//获取用户任务表格数据
export const getTask = (p) => get('/task/getTask', p)
//获取搜索后用户任务表格数据
export const searchTask = (p) => get('/task/searchTask', p)
//新增用户任务数据
export const newTask = (p) => post('/task/newTask', p)
//修改用户任务数据
export const editTask = (p) => post('/task/editTask', p)


//获取用户流程表格数据
export const getFlow = (p) => get('/flow/getFlow', p)
//获取搜索后用户流程表格数据
export const searchFlow = (p) => get('/flow/searchFlow', p)

//获取用户数据表格数据
export const getDataset = (p) => get('/dataset/getDataset', p)
//获取搜索后用户数据表格数据
export const searchDataset = (p) => get('/dataset/searchDataset', p)