import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to) => {
        return { path: '/login' }
      }
    },
    {
      path: '/login',
      meta: {
        title: 'Вход'
      },
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      meta: {
        title: 'Главная'
      },
      name: 'home',
      component: () => import('../views/Home/Home.vue')
    },
    {
      path: '/philosophy',
      meta: {
        title: 'Наша Философия'
      },
      name: 'philosophy',
      component: () => import('../views/Philosophy.vue')
    },
    {
      path: '/details',
      meta: {
        title: 'Подробно'
      },
      name: 'details',
      component: () => import('../views/Details.vue')
    },
    {
      path: '/get-there',
      meta: {
        title: 'Как добраться'
      },
      name: 'getThere',
      component: () => import('../views/GetThere.vue')
    },
    {
      path: '/registration',
      meta: {
        title: 'Регистрация'
      },
      name: 'registration',
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/sponsors',
      meta: {
        title: 'Спонсоры'
      },
      name: 'sponsors',
      component: () => import('../views/Sponsors.vue')
    },
    {
      path: '/heritage',
      meta: {
        title: 'Наследие'
      },
      name: 'heritage',
      component: () => import('../views/Heritage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const email = localStorage.getItem('email')
  if (to.name !== 'login' && !email) next({ name: 'login' })
  // if the user is not authenticated, `next` is called twice
  next()
})

router.afterEach((to: any, from, next) => {
  document.title = to.meta.title
})

export default router
