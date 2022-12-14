//元数据接口
import { get, post } from './http'

//个人信息接口
export const getIndividual = (p) => get('/metadata/getIndividual', p)
export const searchIndividual = (p) => get('/metadata/searchIndividual', p)
export const generateID = (p) => get('/metadata/generateID', p)
export const getOptions = (p) => get('/metadata/getOptions', p)
export const newIndividual = (p) => post('/metadata/newIndividual', p)
export const editIndividual = (p) => post('/metadata/editIndividual', p)

//实验信息接口
export const getExperiment = (p) => get('/metadata/getExperiment', p)
export const searchExperiment = (p) => get('/metadata/searchExperiment', p)
export const newExperiment = (p) => post('/metadata/newExperiment', p)
export const newExperiments = (p) => post('/metadata/newExperiments', p)
export const editExperiment = (p) => post('/metadata/editExperiment', p)