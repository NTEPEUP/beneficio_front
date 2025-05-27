<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>Lista de Pesajes</span>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="$router.push({ name: 'crearPesaje' })">
          <v-icon left>mdi-plus</v-icon>
          Agregar Pesaje
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Cuenta</th>
                <th>Agricultor</th>
                <th>ID Pesaje</th>
                <th>ID Estado</th>
                <th>Peso Enviado</th>
                <th>Peso Total Obtenido</th>
                <th>Diferencia Total</th>

                <th>Fecha</th>
                <th>Ver Parcialidades</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cuentas" :key="item.cuenta">
                <td>{{ item.cuenta }}</td>
                <td>{{ item.agricultor }}</td>
                <td>{{ item.id_pesaje }}</td>
                <td>{{ item.id_estado }}</td>
                <td>{{ item.peso_enviado }}</td>
                <td>{{ item.peso_total_obtenido }}</td>
                <td>{{ item.diferencia_total }}</td>

                <td>{{ new Date(item.fecha).toLocaleString() }}</td>
                <td>
                  <v-btn icon color="primary" @click="verParcialidades(item)">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cuentas: [],
    }
  },
  mounted() {
    this.fetchCuentas()
  },
  methods: {
    async fetchCuentas() {
      try {
        const response = await axios.get('http://localhost:8080/cuentas')
        this.cuentas = response.data
      } catch (error) {
        console.error('Error al obtener las cuentas:', error)
      }
    },
    verParcialidades(item) {
      console.log('Cuenta enviada:', item.cuenta)
      this.$router.push({ name: 'listarParcialidad', params: { cuenta: item.cuenta } })
    },
  },
}
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.custom-table th,
.custom-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 8px;
  text-align: center;
}
.custom-table th {
  background-color: #e0f2f1;
  color: #01211c;
  font-weight: bold;
  font-size: 1rem;
}
.custom-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.custom-table tr:hover {
  background-color: #c8e6c9;
  transition: background 0.2s;
}
.v-btn {
  background-color: #04a12e;
  color: white;
}
.v-btn:hover {
  background-color: #1b5e20;
}
.v-card-title {
  font-size: 2rem;
  font-weight: bold;
  color: #01211c;
  text-align: center;
}
</style>
