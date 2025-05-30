<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between">
        Lista de Transportes
        <!-- Botón con Vuetify -->
        <v-btn color="blue-darken-1" dark @click="irACrearTransporte">
          <v-icon left>mdi-plus</v-icon>
          Agregar Transporte
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Tabla HTML -->
        <table class="table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Color</th>
              <th>Línea</th>
              <th>Modelo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transporte in transportes" :key="transporte.id">
              <td>{{ transporte.placa }}</td>
              <td>{{ transporte.marca }}</td>
              <td>{{ transporte.color }}</td>
              <td>{{ transporte.linea }}</td>
              <td>{{ transporte.modelo }}</td>
              <td>
                <span
                  :class="{
                    'badge badge-success': transporte.estado === 'Activo',
                    'badge badge-danger': transporte.estado !== 'Activo',
                  }"
                >
                  {{ transporte.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppListarTransporte',
  data() {
    return {
      transportes: [], // Lista de transportes
    }
  },
  methods: {
    fetchTransportes() {
      const token = localStorage.getItem('token') // Obtener el token del almacenamiento local
      const idUser = Number(sessionStorage.getItem('id')) // Obtener el ID del usuario
      axios
        .get(`http://localhost:8080/transporte/usuario/${idUser}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }) // Endpoint del backend
        .then((response) => {
          this.transportes = response.data // Asignar los datos obtenidos
        })
        .catch((error) => {
          console.error('Error al obtener transportes:', error)
        })
    },
    irACrearTransporte() {
      this.$router.push('/layout/crearTransporte') // Redirigir al formulario de creación
    },
  },
  mounted() {
    this.fetchTransportes() // Cargar transportes al montar el componente
  },
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.badge {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.badge-success {
  background-color: #28a745;
}

.badge-danger {
  background-color: #dc3545;
}
</style>
