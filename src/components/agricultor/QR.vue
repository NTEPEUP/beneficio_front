<template>
  <div>
    <h1>Generar QR para Transporte</h1>
    <form @submit.prevent="generarQR">
      <div>
        <label for="placa">Placa:</label>
        <input type="text" v-model="placa" required />
      </div>
      <button type="submit">Generar QR</button>
    </form>
    <div v-if="qrCode">
      <h2>Código QR Generado:</h2>
      <img :src="qrCode" alt="Código QR" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      placa: '', // Solo se necesita la placa
      qrCode: null, // Almacena la imagen del QR
    }
  },
  methods: {
    async generarQR() {
      try {
        const response = await axios.get(`http://localhost:8080/qr/generar/transporte`, {
          params: { placa: this.placa }, // Enviar la placa como parámetro
          responseType: 'blob', // Importante para manejar la imagen
        })
        // Convertir el blob en una URL para mostrar la imagen
        this.qrCode = URL.createObjectURL(response.data)
      } catch (error) {
        console.error('Error al generar el QR:', error)
      }
    },
  },
}
</script>

<style>
form {
  margin-bottom: 20px;
}
form div {
  margin-bottom: 10px;
}
</style>
