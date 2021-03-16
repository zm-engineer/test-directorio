<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    app

  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content >
          <v-list-item-title>User Autenticado</v-list-item-title>
          <v-list-item-subtitle>Administrador</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        v-on:click="ir(item.ruta)"
      >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    items: [
        { title: 'Contactos', icon: 'mdi-account-outline', ruta: 'contactos' },
      ],
  }),
  created() {
  },

  methods: {

    ir: function(ruta) {
       this.$router.push({ path: `/${ruta}` })
    },
    logout: function(){
        this.$store.dispatch("destruirToken").then(response => {
          this.$router.push({ name: "login" });
        });
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
