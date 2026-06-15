import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import CRUDproductview from '../views/CRUDproductview.vue'
import crudUserView from '../views/crudUserView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      {
        path: '', name: 'Inicio' 
      },
      {
       path: 'productos', name: 'Productos', component: ProductView 
      }
    ]
  },
  {
    path: '/admin/productos',
    name: 'AdminProductos',
    component: CRUDproductview,   
    meta: { requiresAuth: true, soloAdmin: true }
  },
  {
    path: '/admin/usuarios',
    name: 'AdminUsuarios',
    component: crudUserView,       
    meta: { requiresAuth: true, soloAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null')

  if (to.meta.requiresAuth && !usuario) {
    next('/login')
  } else if (to.meta.soloAdmin && usuario?.rol !== 'admin') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router