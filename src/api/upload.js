import * as api from './api'

export const downUnionExcelModel = (params) => api.exportFile('get', '/excel/downUnionExcelModel', params, '工会模板.xlsx')

export const downUnionMemberExcelModel = (params) => api.exportFile('get', '/excel/downUnionMemberExcelModel', params, '花名册模板.xlsx')
