import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import reg from '@/views/reg'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'INDEX', component: index},
    {path: '/login', name: 'LOGIN', component: login},
    {path: '/reg', name: 'REG', component: reg}
  ]
})
