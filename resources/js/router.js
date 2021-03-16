import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Pages
import NotFound from './views/NotFound'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import Contactos from './views/contactos/Index'

// Routes
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        {
           path: '/',
           redirect: { name: 'login' }
         },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
              NoIrEnCasoDeAuth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
              NoIrEnCasoDeAuth: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/contactos',
            name: 'contactos',
            component: Contactos,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});

export default router
