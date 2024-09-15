
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./components/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/Register.vue')
    },
    {
        path: '/addTask',
        name: 'addTask',
        component: () => import('./components/AddTask.vue'),
        meta: { requiresAuth: true }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Proveravamo da li ruta zahteva autentifikaciju
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Ako korisnik nije autentifikovan, preusmeravamo ga na login stranicu
      next('/login');
    } else {
      // Ako je korisnik autentifikovan, nastavljamo navigaciju
      next();
    }
  } else {
    // Ako ruta ne zahteva autentifikaciju, jednostavno nastavljamo navigaciju
    next();
  }
});

export default router
