<template>
  <v-app-bar app color="blue-darken-4" dark>
    <v-app-bar-title>Peso Cabal</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el token
  localStorage.removeItem('token') // Ejemplo
  router.push('/') // Redirigir al login
}
</script>

<style scoped></style>
