import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { entities, getEntityInfo } from '@/util/entities'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/files',
      name: 'files',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilesView.vue')
    },
    {
      path: '/entities',
      name: 'entities',
      component: () => import('../views/EntityListView.vue'),
      props: {
        entityType: getEntityInfo('file')
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    }
  ]
})

export default router
