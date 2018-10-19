<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm form-layout">
     <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm2.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
       <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
       <router-link :to="{name:'login'}" class="m-left20">登录</router-link>
    </el-form-item>
  </el-form>
</template>
<script>
import httpServer from '@/service/index'
import {Message} from 'element-ui'
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
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        username: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.FnRegist(this.ruleForm2)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    FnRegist (data) {
      httpServer.register(data)
        .then(
          (resData) => {
            let data = resData.data
            if (data.status === 1) {
              Message({message: data.msg, type: 'success'})
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
