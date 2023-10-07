import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { entities, getEntityInfo } from '@/util/entities'
import EntityListView from '../views/EntityListView.vue'
import MultipleEntitiesView from '../views/MultipleEntitiesView.vue'

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
      path: '/categories-old',
      name: 'categories-old',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: EntityListView,
      props: {
        entityType: getEntityInfo('category')
      }
    },
    {
      path: '/galleries',
      name: 'galleries',
      component: EntityListView,
      props: {
        entityType: getEntityInfo('gallery')
      }
    },
    {
      path: '/shop_items',
      name: 'shop_items',
      component: EntityListView,
      props: {
        entityType: getEntityInfo('shop_item')
      }
    },
    {
      path: '/files_full',
      name: 'files_full',
      component: MultipleEntitiesView,
      props: {
        entityTypes: [getEntityInfo('tag'), getEntityInfo('file')]
      }
    },
    {
      path: '/shop_items_full',
      name: 'shop_items_full',
      component: MultipleEntitiesView,
      props: {
        entityTypes: [getEntityInfo('category'), getEntityInfo('shop_item')]
      }
    }
  ]
})

export default router
