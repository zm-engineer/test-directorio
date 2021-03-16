<template>
    <v-app>
      <menu-component v-if="$store.getters.autenticado" />

      <!-- Dimensiona su contenido según los componentes de la aplicación -->
      <v-main>

        <!-- Proporciona a la Aplicación el contenido adecuado, según los componentes
            indicados en las rutas -->
        <v-container class="h-100" fluid>
          <section class="section">
            <main>
              <router-view></router-view>
            </main>
          </section>
        </v-container>
      </v-main>

    </v-app>
</template>

<script>
  export default {
    components: {
      MenuComponent: () => import('../componentes/MenuComponent.vue'),
    },
  };
</script>
