import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import shoppingList from '../views/shoppingList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/shoppingList'
  },
  {
    path: '/shoppingList',
    name: 'shopping-list',
    component: shoppingList
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound, 
  }
]

const router = new VueRouter({
  routes
})

export default router
