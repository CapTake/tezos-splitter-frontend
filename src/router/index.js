import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContractListView from '../views/ContractListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: 'Splittez - About' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/splitters',
    name: 'splitters',
    meta: { title: 'Splittez - Recently deployed splitters' },
    component: ContractListView
  },
  {
    path: '/splitters/:addr',
    name: 'splitter',
    meta: { title: 'Splittez - Splitter contract ' },
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/SplitterView.vue')
  },
  {
    path: '/create',
    name: 'create',
    meta: { title: 'Splittez - Create Splitter' },
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (window) {
    document.title = to.meta?.title || document.title
  }
})

export default router
