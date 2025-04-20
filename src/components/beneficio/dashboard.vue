<template>
  <v-app>
    <!-- Barra lateral -->
    <v-navigation-drawer app color="green darken-2" dark>
      <v-list>
        <v-list-item-group>
          <v-list-item @click="navigateTo('home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('profile')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('tables')">
            <v-list-item-icon>
              <v-icon>mdi-table</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tablas</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigateTo('notifications')">
            <v-list-item-icon>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notificaciones</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Encabezado -->
    <v-app-bar app color="" dark>
      <v-app-bar-title>Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Tarjetas de métricas -->
          <v-col cols="12" md="3">
            <v-card outlined>
              <v-card-title>
                <v-icon color="blue">mdi-cash</v-icon>
                <span class="ml-2">Today's Money</span>
              </v-card-title>
              <v-card-text>
                <h3>$53k</h3>
                <small class="text-success">+55% than last week</small>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card outlined>
              <v-card-title>
                <v-icon color="pink">mdi-account</v-icon>
                <span class="ml-2">Today's Users</span>
              </v-card-title>
              <v-card-text>
                <h3>2,300</h3>
                <small class="text-success">+3% than last month</small>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card outlined>
              <v-card-title>
                <v-icon color="green">mdi-account-plus</v-icon>
                <span class="ml-2">New Clients</span>
              </v-card-title>
              <v-card-text>
                <h3>3,462</h3>
                <small class="text-danger">-2% than yesterday</small>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card outlined>
              <v-card-title>
                <v-icon color="orange">mdi-chart-bar</v-icon>
                <span class="ml-2">Sales</span>
              </v-card-title>
              <v-card-text>
                <h3>$103,430</h3>
                <small class="text-success">+5% than yesterday</small>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'BeneficioDashboard',
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`)
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
  background: linear-gradient(135deg, #023028, #1b5e20, #04a12e); /* Verde oscuro difuminado */
  color: white; /* Asegura que el texto sea visible */
}

.v-list-item-title {
  font-weight: bold;
}

.v-list-item-icon {
  color: white; /* Asegura que los íconos sean visibles */
}
</style>
