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
      meta: { requiresAuth: true }, // Ruta protegida
    },
    {
      path: '/layout',
      component: layout,
      meta: { requiresAuth: true }, // Ruta protegida
      children: [
        {
          path: 'transportes',
          name: 'transportes',
          component: Transportes,
          meta: { requiresAuth: true }, // Ruta protegida
        },
        {
          path: 'listarTransportes',
          name: 'listarTransportes',
          component: appListarTransporte,
          meta: { requiresAuth: true }, // Ruta protegida
        },
        {
          path: 'crearTransportista',
          name: 'crearTransportista',
          component: Transportista,
          meta: { requiresAuth: true }, // Ruta protegida
        },
        {
          path: 'listarTransportista',
          name: 'listarTransportista',
          component: appListarTransportista,
          meta: { requiresAuth: true }, // Ruta protegida
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: { requiresAuth: true }, // Ruta protegida
      children: [
        {
          path: 'transporte',
          name: 'transporte',
          component: Transportes,
          meta: { requiresAuth: true }, // Ruta protegida
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // Obtener el token del almacenamiento local
  console.log('Guard ejecutado. Ruta destino:', to.name, 'Token:', token)

  // Si la ruta requiere autenticación y no hay token
  if (to.meta.requiresAuth && !token) {
    console.log('Redirigiendo al login...')
    next({ name: 'login' })
  } else {
    console.log('Acceso permitido a:', to.name)
    next() // Permite el acceso
  }
})

export default router
