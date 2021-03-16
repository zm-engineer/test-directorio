import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  //contenedor donde se almacena el estado de la aplicación.
  state: {
    token: localStorage.getItem('access_token') || null
  },
  //funciones que se ejecutarán en varias partes de nuestra aplicación
  getters: {
    autenticado(state) {
      return state.token !== null
    }
  },
  //funciones que modificarán el estado de la aplicación
  mutations: {
    recuperarToken(state, token) {
      state.token = token
    },
    destruirToken(state) {
      state.token = null
    }
  },
  //las acciones son similares a las mutaciones,
  //la diferencia es que pueden contener operaciones asincrónicas,
  //como por ejemplo una consulta a una API. Las acciones cometen mutaciones.
  actions: {
    recuperarToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/api/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('recuperarToken', token)

            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
      })

    },
    registrarUsuario(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/api/register', {
          nombre: credentials.nombre,
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            localStorage.setItem('usuarioCreado', 'Tu cuenta ha sido creada exitosamente.')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
    destruirToken(context) {

      if (context.getters.autenticado){

        return new Promise((resolve, reject) => {
          axios.post('/api/logout', '', {
              headers: { Authorization: "Bearer " + context.state.token }
            })
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destruirToken')

              resolve(response)
            })
            .catch(error => {
              //console.log(error)
              localStorage.removeItem('access_token')
              context.commit('destruirToken')

              reject(error)
            })
        })

      }
    }
  }
})

export default store
