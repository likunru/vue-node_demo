import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// response拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
export default service
