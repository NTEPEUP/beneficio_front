<template>
  <v-navigation-drawer app color="green-darken-2" dark permanent>
    <v-list nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const items = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/home' },
  { title: 'Transportes', icon: 'mdi-truck', to: '/layout/listarTransportes' },
  { title: 'Transportista', icon: 'mdi-account', to: '/layout/listarTransportista' }, // Nuevo ítem
  { title: 'Crear Pesaje', icon: 'mdi-scale-balance', to: '/dashboard' }, // Nuevo ítem
  { title: 'Acerca de', icon: 'mdi-information', to: '/about' },
]
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
  background: linear-gradient(135deg, #01211c, #1b5e20, #04a12e); /* Verde oscuro difuminado */
  color: white; /* Asegura que el texto sea visible */
}
</style>
