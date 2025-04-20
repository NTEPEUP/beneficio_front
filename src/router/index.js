import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/Login.vue'
import dashboard from '@/components/beneficio/dashboard.vue'
import Transportes from '@/components/agricultor/appCrearTransporte.vue'
import layout from '@/components/agricultor/layoutAgricultor.vue'
import appListarTransporte from '@/components/agricultor/appListarTransporte.vue'
import Transportista from '@/components/agricultor/appCrearTransportista.vue'
import appListarTransportista from '@/components/agricultor/appListarTranspotista.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Transportes,
    },
    {
      path: '/layout',

      component: layout,
      children: [
        {
          path: 'transportes',
          name: 'transportes',
          component: Transportes,
        },
        {
          path: 'listarTransportes',
          name: 'listarTransportes',
          component: appListarTransporte,
        },
        {
          path: 'crearTransportista',
          name: 'crearTransportista',
          component: Transportista,
        },
        {
          path: 'listarTransportista',
          name: 'listarTransportista',
          component: appListarTransportista,
        },
      ],
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      children: [{ path: 'transporte', name: 'transporte', component: Transportes }],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
