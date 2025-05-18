<template>
  <v-conteainer>
    <v-card>
      <v-card-title>
        <span>Lista de Pesajes</span>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="$router.push({ name: 'crearPesaje' })">
          <v-icon left>mdi-plus</v-icon>
          Agregar Pesaje
        </v-btn>
      </v-card-title>
    </v-card>
  </v-conteainer>
</template>
<style scoped>
.v-btn {
  background-color: #04a12e; /* Verde claro */
  color: white; /* Texto blanco para contraste */
}
.v-btn:hover {
  background-color: #1b5e20; /* Cambia a verde oscuro al pasar el mouse */
}
.v-card-title {
  font-size: 2rem; /* Tamaño de fuente más grande */
  font-weight: bold; /* Negrita */
  color: #01211c; /* Color del texto */
  text-align: center; /* Centrar el texto */
}
</style>
