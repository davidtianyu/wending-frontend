import Vue from 'vue'
import Router from 'vue-router'
import Investment from '@/views/investment/Investment.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // 切换页面滚动到页面顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', name: 'Investment', component: Investment }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
