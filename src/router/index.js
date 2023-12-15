import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/Home.vue'; 
import PublicarVaga from '@/components/views/PublicarVaga.vue' 


const routes = [
  { path: '/',  name: 'Home', component: Home },
  { path: '/PublicarVaga', component: PublicarVaga },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router