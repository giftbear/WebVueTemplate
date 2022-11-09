//用户数据仓库相关接口
import { get, post } from './http'

//获取用户文件表格数据
export const getFile = (p) => get('/repository/getFile', p)
//获取搜索后用户文件表格数据
export const searchFile = (p) => get('/repository/searchFile', p)