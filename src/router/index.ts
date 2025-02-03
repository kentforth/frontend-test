import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      meta: {
        title: "Home",
      },
      name: "home",
      component: () => import("../views/Home/Home.vue"),
    },
  ],
})

router.afterEach((to: any) => {
  document.title = to.meta.title
})

export default router
