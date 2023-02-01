//用户控制台相关接口
import { get, post } from './http'

//任务接口
export const getTask = (p) => get('/task/getTask', p)
export const generateID = (p) => get('/task/generateID', p)
export const searchTask = (p) => get('/task/searchTask', p)
export const getFiles = (p) => get('/task/getFiles', p)
export const getFlows = (p) => get('/task/getFlows', p)
export const newTask = (p) => post('/task/newTask', p)
export const editTask = (p) => post('/task/editTask', p)

//流程接口
export const getFlow = (p) => get('/console/getFlow', p)
export const searchFlow = (p) => get('/console/searchFlow', p)
export const editFlow = (p) => post('/console/editFlow', p)

//数据接口
export const getDataset = (p) => get('/console/getDataset', p)
export const searchDataset = (p) => get('/console/searchDataset', p)
export const editDataset = (p) => post('/console/editDataset', p)