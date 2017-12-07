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
import Upload from '../components/page/upload/upload.vue'
import Bgspd from '../components/page/bgspd/bgspd.vue'
import Ccsqd from '../components/page/ccsqd/ccsqd.vue'
import Dwxczl from '../components/page/dwxczl/dwxczl.vue'
import Kcd from '../components/page/kcd/kcd.vue'
import Pcsqd from '../components/page/pcsqd/pcsqd.vue'
import Xccpsq from '../components/page/xccpsq/xccpsq.vue'
import Gzsqd from '../components/page/gzsqd/gzsqd.vue'
import Zjsysq from '../components/page/zjsysq/zjsysq.vue'
import Jdsqd from '../components/page/jdsqd/jdsqd.vue'

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
    beforeRouteEnter (to, from, next) {
      console.log(to)
      next(vm => {
        console.log(vm)
      })
    },
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
    }, {
      path: '/upload',
      component: Upload
    }, {
      path: '/bgspd',
      component: Bgspd
    }, {
      path: '/ccsqd',
      component: Ccsqd
    }, {
      path: '/dwxczl',
      component: Dwxczl
    }, {
      path: '/kcd',
      component: Kcd
    }, {
      path: '/pcsqd',
      component: Pcsqd
    }, {
      path: '/gzsqd',
      component: Gzsqd
    }, {
      path: '/zjsysq',
      component: Zjsysq
    }, {
      path: '/jdsqd',
      component: Jdsqd
    }, {
      path: '/xccpsq',
      component: Xccpsq
    }]
  },
  {
    path: '*',
    component: ErrorVue
  }]
})
