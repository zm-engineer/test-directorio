<template>
  <div>
    <div class="container">
      <div class="column is-4 is-offset-4">
        <div class="box">
          <h1 class="title">Inicia sesión</h1>
          <div class="notification is-danger" v-if="error">
            <p>{{error}}</p>
          </div>
          <div class="notification is-success" v-if="message">
            <p>{{message}}</p>
          </div>
          <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="field">
              <div class="control">
                <input type="email" class="input" placeholder="user@example.com" v-model="username" />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input type="password" class="input" placeholder="Contraseña" v-model="password" />
              </div>
            </div>
            <button type="submit" class="button is-primary">Entrar</button>
            <div class="pt-1">
              <router-link to="register">Crea tu cuenta</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      error: null,
      message: localStorage.getItem('usuarioCreado') || null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("recuperarToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "dashboard" });

          if(localStorage.getItem('usuarioCreado')){
            localStorage.removeItem('usuarioCreado')
          }
        })
        .catch(error => {
          this.error = error.response.data;
        });
    }
  }
};
</script>
