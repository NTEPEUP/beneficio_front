<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>Parcialidades de la Cuenta {{ cuenta }}</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$router.back()">
          <v-icon left>mdi-arrow-left</v-icon>
          Volver
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Transporte</th>
                <th>Transportista</th>
                <th>Fecha Recepción</th>
                <th>Peso Enviado</th>
                <th>Peso Báscula</th>
                <th>Diferencia Peso</th>
                <th>Fecha Peso Báscula</th>
                <th>Diferencia Total</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in parcialidades" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.id_transporte }}</td>
                <td>{{ item.id_transportista }}</td>
                <td>{{ new Date(item.fecha_recepcion_parcialidad).toLocaleString() }}</td>
                <td>{{ item.peso_enviado }}</td>
                <td>{{ item.peso_bascula }}</td>
                <td>{{ item.diferencia_peso }}</td>
                <td>{{ new Date(item.fecha_peso_bascula).toLocaleString() }}</td>
                <td>{{ item.diferencia_total }}</td>
                <td>{{ item.usuario }}</td>
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
      parcialidades: [],
    }
  },
  mounted() {
    // Si el prop no llega, usa el parámetro de la ruta
    const cuentaRecibida = this.cuenta || this.$route.params.cuenta
    console.log('Cuenta recibida:', cuentaRecibida)
    this.cuenta = cuentaRecibida
    this.fetchParcialidades()
  },
  methods: {
    async fetchParcialidades() {
      try {
        const response = await axios.get(
          `http://localhost:8080/parcialidadesCafe/por-cuenta/${this.cuenta}`,
        )
        this.parcialidades = response.data
      } catch (error) {
        console.error('Error al obtener las parcialidades:', error)
      }
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
</style>
