<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm form-layout">
     <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm2.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
      <router-link :to="{name:'REG'}" class="m-left20">注册</router-link>
    </el-form-item>
  </el-form>
</template>
<script>
import httpServer from '@/service/index'
import { Message } from 'element-ui'
export default {
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        username: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.FnLogin(this.ruleForm2)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 登录
    FnLogin (data) {
      httpServer.login(data)
        .then(
          (resData) => {
            let data = resData.data
            if (data.status === 1) {
              Message({message: data.msg, type: 'success'})
              this.$router.push({name: 'INDEX'})
            } else {
              Message({message: data.msg, type: 'error'})
            }
          },
          (err) => {
            console.log('err', err)
          }
        )
    }
  }
}
</script>
