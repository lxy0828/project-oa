<template>
  <div>
    <div class="wrapper">
      <h1 style="text-align: center">OA办公系统</h1>
      <div class="login">
        <i-form ref="formInline" :model="formInline" :rules="ruleInline">
          <Form-item prop="userName">
            <Input v-model="formInline.userName" placeholder="请输入用户名"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formInline.password" type="password" placeholder="请输入密码"></Input>
          </Form-item>
          <!-- <Form-item prop="model2">
            <Select v-model="formInline.model2" size="small" style="width:200px">
              <Option v-for="item in staffList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item> -->
          <Form-item>
            <i-button type="success" @click.native="handleSubmit('formInline',formInline)" long>登录</i-button>
          </Form-item>
        </i-form>
      </div>
    </div> 
  </div>  
</template>

<script>
  import ip from '../../common/js/const.js'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data () {
      return {
        formInline: {
          userName: '',
          password: ''
        },
        ruleInline: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          }, {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }]
        },
        ip: ip
      }
    },
    created () {
      // console.log(this.ip + 'ZHYOASystem/account/login.do')
      // console.log('http://172.30.41.170:8080/ZHYOASystem/account/login.do')
    },
    methods: {
      handleSubmit (name, formData) {
        this.$Loading.start()
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formcontroler = this.formInline
            // console.log(JSON.stringify(formcontroler))
            // console.log(qs.stringify(formcontroler))
            // window.sessionStorage.setItem('username', this.formInline.userName)
            // this.$router.push('/index')
            // window.sessionStorage.setItem('in', '123')
            axios.post(this.ip + 'account/login.do', qs.stringify(formcontroler)).then((res) => {
              if (res.data.success) {
                window.sessionStorage.setItem('username', this.formInline.userName)
                window.sessionStorage.setItem('infor', res)
                console.log(window.sessionStorage.getItem('infor'))
                this.$Message.success('登录成功!')
                this.$Loading.finish()
                this.$router.push('/index')
              } else {
                this.$Message.success(res.data.errorInfo)
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
            this.$Loading.error()
            // this.$router.push('/index')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper
  width: 100%
  height: 100%
  position: relative
  top: 200px
  .login
  	margin: 0 auto
  	padding: 200px auto
  	width: 200px
  	height: 100%
.loading
  position: absolute
  background: #CCCCCC
  opacity: 0.5
  width: 100%
  height: 100%
  top: 0%
  transform: translateY 
  .loading-container
    margin: 50% auto
</style>
