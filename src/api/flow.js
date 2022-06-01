import http from '@/utils/http'

export const createRule = (body = {}) => http.post('/rules', body)

// 根据id获取rule
export const getRule = (id) => http.get(`/rules/${id}`)