<template>
  <div>
    <div class="container">
      <div class="column is-4 is-offset-4">
        <div class="box">
          <h1 class="title">Crea tu cuenta</h1>
          <div class="notification is-danger" v-if="error">
            <p>{{error}}</p>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form autocomplete="off"  @submit.prevent="handleSubmit(register)" method="post">
              <div class="field">
                <div class="control">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input type="text" class="input" name="Nombre" placeholder="Nombre" v-model="nombre" />
                    <span class="color_validacion">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <validation-provider rules="required|email" v-slot="{ errors }">
                    <input type="email" class="input" name="Correo" placeholder="user@example.com" v-model="username" />
                    <span class="color_validacion">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <validation-provider rules="required" v-slot="{ errors }">
                  <input type="password" class="input"  name="Contraseña" placeholder="Contraseña" v-model="password" />
                  <span class="color_validacion">{{ errors[0] }}</span>
                </validation-provider>
                </div>
              </div>
              <button type="submit" class="button is-primary">Registrarme</button>
              <div class="pt-1">
                <router-link to="login">Inicia sesión, si tienes cuenta</router-link>
              </div>

            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
  import { required, email } from 'vee-validate/dist/rules';

  extend('email', {
    ...email,
    message: 'Correo no válido'

  });
  extend('required', {
    ...required,
    message: 'Este campo es requerido'
  });

  export default {
    components: { ValidationProvider, ValidationObserver },
    data() {
      return {
        nombre: null,
        username: null,
        password: null,
        error: null
      };
    },
    methods: {
      register() {
        this.$store
          .dispatch("registrarUsuario", {
            nombre: this.nombre,
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.$router.push({ name: "login" })

          })
          .catch(error => {
            this.error = error.response.data.message;
          });
      }
    }
  };
</script>
