require('./bootstrap');

window.Vue = require('vue');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = 'http://127.0.0.1:8000';

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './views/App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Importar los iconos


//Guardian de rutas
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // esta ruta requiere autenticación, verifique si está conectado
       // si no es así, redirigir a la página de inicio de sesión.
      if (!store.getters.autenticado) {
        next({
          name: 'login',
        })
      } else {
        next()
      }
    }
    if (to.matched.some(record => record.meta.NoIrEnCasoDeAuth)) {
      if (store.getters.autenticado) {
        next({
          name: 'dashboard',
        })
      } else {
        next()
      }
    }
    else {
      next() //¡asegúrese de llamar siempre a next ()!
    }
  })

Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: { App },
    router,
    store
});
