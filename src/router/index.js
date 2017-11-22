import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/base/login.vue'
import Index from '../components/base/index.vue'
import Main from '../components/base/main.vue'
import Sendprocess from '../components/page/sendprocess.vue'
import Llh from '../components/page/llh/llh.vue'
import Cgd from '../components/page/cgd/cgd.vue'
import ErrorVue from '../components/base/404.vue'
import Maintain from '../components/page/maintain/maintain.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/error',
    component: ErrorVue
  },
  {
    path: '/index',
    component: Index,
    children: [{
      path: '',
      component: Main
    }, {
      path: '/main',
      component: Main
    }, {
      path: '/sendprocess',
      component: Sendprocess
    }, {
      path: '/llh',
      component: Llh
    }, {
      path: '/cgd',
      component: Cgd
    }, {
      path: '/maintain',
      component: Maintain
    }]
  },
  {
    path: '*',
    component: ErrorVue
  }]
})
