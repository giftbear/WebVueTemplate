//用户数据仓库相关接口
import { get, post } from './http'

export const getFile = (p) => get('/repository/getFile', p)
export const searchFile = (p) => get('/repository/searchFile', p)
export const getFilter = (p) => get('/repository/getFilter', p)