import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import About from '/src/components/About.vue'
import Login from '/src/components/Login.vue'
import NotFound from '/src/components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: Home,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  
})


export default router 
