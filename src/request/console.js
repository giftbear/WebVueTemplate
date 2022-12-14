//用户控制台相关接口
import { get, post } from './http'

//任务接口
export const getTask = (p) => get('/task/getTask', p)
export const generateID = (p) => get('/task/generateID', p)
export const searchTask = (p) => get('/task/searchTask', p)
export const newTask = (p) => post('/task/newTask', p)
export const editTask = (p) => post('/task/editTask', p)

//流程接口
export const getFlow = (p) => get('/flow/getFlow', p)
export const searchFlow = (p) => get('/flow/searchFlow', p)

//数据接口
export const getDataset = (p) => get('/dataset/getDataset', p)
export const searchDataset = (p) => get('/dataset/searchDataset', p)