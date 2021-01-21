import * as api from './api'

export const getUnion = (params) => api.fecthGet('/account/union', params, 1)
