<template>
  <div>
    <div class="wrapper">
      <h1 style="text-align: center">OA办公系统</h1>
      <div class="login">
        <i-form ref="formInline" :model="formInline" :rules="ruleInline">
          <Form-item prop="user">
            <Input v-model="formInline.user" placeholder="请输入用户名"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formInline.password" placeholder="请输入密码"></Input>
          </Form-item>
          <Form-item prop="model2">
            <Select v-model="formInline.model2" size="small" style="width:200px">
              <Option v-for="item in staffList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item>
            <i-button type="success" @click.native="handleSubmit('formInline',formInline)" long>登录</i-button>
          </Form-item>
        </i-form>
      </div>
    </div> 
  </div>  
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: '',
          model2: ''
        },
        ruleInline: {
          user: [{
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
        staffList: [{
          value: '董事长',
          label: '董事长'
        }, {
          value: '首席官',
          label: '首席官'
        }]
      }
    },
    methods: {
      handleSubmit (name, formData) {
        this.$refs[name].validate((valid) => {
          console.log(this.formInline)
          if (valid) {
            axios.post('api/login', this.formInline).then((res) => {
              // console.log(this.showloading)
              window.sessionStorage.setItem('user', formData.user)
              window.sessionStorage.setItem('password', formData.password)
              this.$Message.success('登录成功!')
              // this.$router.push('/index')
            })
          } else {
            console.log(formData.user)
            // this.$router.push('/index')
            this.$Message.error('表单验证失败!')
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
