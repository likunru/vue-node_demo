<template>
   <div class="navbar-head">
     <div></div>
     <ul style="float:right;margin-right:20px;">
       <li @click="FnLogOut">登出</li>
     </ul>
   </div>
</template>
<style>
.navbar-head{height: 60px;width:100%;background: rgb(84, 92, 100);color:#fff;line-height: 60px;}
</style>
<script>
import httpServer from '@/service/index'
import { Message } from 'element-ui'
export default {
  methods: {
    FnLogOut () {
      let data = {}
      httpServer.logOut(data)
        .then(
          (resData) => {
            let data = resData.data
            if (data && data.status === 1) {
              this.$router.push({name: 'LOGIN'})
            } else {
              Message({message: data.msg, type: 'error'})
            }
          },
          (err) => {
            console.log('err', err)
          }
        )
    },
    FnGetUserInfo () {
      httpServer.get_userInfo()
        .then(
          (resData) => {

          },
          (err) => {
            console.log('err', err)
          }
        )
    }
  },
  mounted () {
    this.FnGetUserInfo()
  }
}
</script>
