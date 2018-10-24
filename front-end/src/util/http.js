import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['Access-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    //   config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // }
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
