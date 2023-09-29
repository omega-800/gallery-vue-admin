import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { entities, getEntityInfo } from '@/util/entities'
import EntityListView from '../views/EntityListView.vue'

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
      component: () => import('../views/SwitchableListView.vue'),
      props: {
        entityType: getEntityInfo('file')
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: EntityListView,
      props: {
        entityType: getEntityInfo('tag')
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      path: '/galleries',
      name: 'galleries',
      component: EntityListView,
      props: {
        entityType: getEntityInfo('gallery')
      }
    }
  ]
})

export default router
