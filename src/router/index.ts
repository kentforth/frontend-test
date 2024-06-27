import { createRouter, createWebHistory } from 'vue-router'
import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'

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
      component: () => import('../views/Login/Login.vue')
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
      path: '/details',
      meta: {
        title: 'Подробно'
      },
      name: 'details',
      component: () => import('../views/Details/Details.vue')
    },

    // Registration
    {
      path: '/registration',
      meta: {
        title: 'Регистрация'
      },
      name: 'registration',
      component: () => import('../views/Registration/Registration.vue')
    },
    {
      path: '/registration-number',
      meta: {
        title: 'Регистрация'
      },
      name: 'registrationNumber',
      component: () => import('../views/RegistrationNumber/RegistrationNumber.vue')
    },

    {
      path: '/sponsors',
      meta: {
        title: 'Спонсоры'
      },
      name: 'sponsors',
      component: () => import('../views/Sponsors/Sponsors.vue')
    },
    {
      path: '/sound',
      meta: {
        title: 'Саунд'
      },
      name: 'sound',
      component: () => import('../views/Sound/Sound.vue')
    },
    {
      path: '/heritage',
      meta: {
        title: 'Наследие'
      },
      name: 'heritage',
      component: () => import('../views/Heritage/Heritage.vue')
    },
    {
      path: '/heritage/:year',
      name: 'heritageItem',
      component: () => import('../views/HeritageItem/HeritageItem.vue')
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    if (from.name !== 'login' && to.name === 'home') {
      return { top: 140 }
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const email = localStorage.getItem('email')

  // if the user is not authenticated, `next` is called twice
  if (to.name !== 'login' && !email) {
    next({ name: 'login' })
    return
  }

  // check if email is already registered
  if (to.name === 'registration') {
    let emails = []
    const q = await query(collection(db, 'emails'))
    const docs = await getDocs(q)
    docs.forEach((doc: any) => {
      emails.push(doc.data())
    })

    const isEmailExist = emails.some((el) => el.email === email)
    if (isEmailExist) {
      await next({ name: 'registrationNumber' })
      return
    }
  }

  next()
})

router.afterEach((to: any, from, next) => {
  document.title = to.meta.title
})

export default router
