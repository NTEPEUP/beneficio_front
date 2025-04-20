<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/agricultor/headerAgricultor.vue'
import Sidebar from '@/components/agricultor/sidebarAgricultor.vue'
</script>

<style scoped></style>
