import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// 这里删除了原来的 routes 常量

const router =  new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  const app = router.app
  const store = app.$options.store
  const auth = store.state.auth
  // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId

  app.$message.hide()

  if (
      (auth && to.path.indexOf('/auth/') !== -1) ||
      (!auth && to.meta.auth) ||
      (articleId && !store.getters.getArticleById(articleId))
  ) {
    next('/')
  } else {
    next()
  }
})


router.afterEach((to, from) => {
  const app = router.app
  const store = app.$options.store
  const showMsg = to.params.showMsg

  if (showMsg) {
    if (typeof showMsg === 'string') {
      app.$message.show(showMsg)
    } else {
      app.$message.show('操作成功')
    }
  }
})

export default router
