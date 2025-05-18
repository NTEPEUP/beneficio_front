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
import BHeader from '@/components/peso/headerPeso.vue'
import BSidebar from '@/components/peso/sidebarPeso.vue'
</script>

<style scoped></style>
