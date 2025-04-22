<template>
  <v-app>
    <BHeader />
    <BSidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import BHeader from '@/components/beneficio/headerBeneficio.vue'
import BSidebar from '@/components/beneficio/sidebarBeneficio.vue'
</script>

<style scoped></style>
