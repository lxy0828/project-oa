import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/base/login.vue'
import Index from '../components/base/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
