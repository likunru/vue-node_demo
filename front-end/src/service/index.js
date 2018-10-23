import Http from '@/util/http'

export default {
  login (data) {
    return Http({
      method: 'post',
      url: '/api/login',
      data: data
    })
  },
  register (data) {
    return Http({
      method: 'post',
      url: '/api/regist',
      data: data
    })
  },
  logOut (data) {
    return Http({
      method: 'post',
      url: '/api/logOut',
      data: data
    })
  }
}
