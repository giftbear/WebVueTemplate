//流程接口
import { get, post } from './http'

export const getFlowList = (p) => get('/pipeline/getFlowList', p)
export const getFlowTable = (p) => get('/pipeline/getFlowTable', p)