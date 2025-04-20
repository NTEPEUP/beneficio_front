<template>
  <v-container class="py-6" fluid>
    <!-- Encabezado principal -->
    <v-row justify="center">
      <v-col cols="12" md="15">
        <v-card elevation="12" class="pa-4">
          <v-card-title class="text-h4 font-weight-bold text-center">
            Lista de Transportistas
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            Visualiza, edita o elimina transportistas registrados en el sistema.
          </v-card-subtitle>
          <v-btn color="green-darken-1" dark @click="agregarTransportista">
            <v-icon left>mdi-plus</v-icon>
            Agregar Transporte
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabla de transportistas -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="15">
        <v-card elevation="12">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar transportista"
              single-line
              hide-details
              class="ml-0"
            ></v-text-field>
          </v-card-title>
          <table class="table">
            <thead>
              <tr>
                <th>CUI</th>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Tipo de Licencia</th>
                <th>Fecha de Vencimiento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transportista in filteredTransportistas" :key="transportista.id">
                <td>{{ transportista.cui }}</td>
                <td>{{ transportista.nombre }}</td>
                <td>{{ formatDate(transportista.fechaNacimiento) }}</td>
                <td>{{ transportista.tipoLicencia }}</td>
                <td>{{ formatDate(transportista.fechaVencimientoLicencia) }}</td>
                <td>
                  <span
                    :class="{
                      'badge badge-success': transportista.estado === 'Activo',
                      'badge badge-danger': transportista.estado === 'Inactivo',
                    }"
                  >
                    {{ transportista.estado }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      search: '',
      transportistas: [],
    }
  },
  computed: {
    filteredTransportistas() {
      return this.transportistas.filter((t) =>
        Object.values(t).join(' ').toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
  methods: {
    obtenerTransportistas() {
      axios
        .get('http://localhost:8080/transportista')
        .then((response) => {
          this.transportistas = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los transportistas:', error)
        })
    },
    editarTransportista(transportista) {
      console.log('Editar transportista:', transportista)
      // Aquí puedes redirigir a un formulario de edición o abrir un modal
    },
    eliminarTransportista(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este transportista?')) {
        axios
          .delete(`http://localhost:8080/transportista/${id}`)
          .then(() => {
            this.transportistas = this.transportistas.filter((t) => t.id !== id)
            alert('Transportista eliminado correctamente')
          })
          .catch((error) => {
            console.error('Error al eliminar el transportista:', error)
          })
      }
    },
    agregarTransportista() {
      this.$router.push('/layout/crearTransportista')
    },
    formatDate(date) {
      if (!date) return ''
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
  mounted() {
    this.obtenerTransportistas()
  },
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
}
.badge-success {
  background-color: #28a745;
  color: white;
}
.badge-danger {
  background-color: #dc3545;
  color: white;
}
.v-btn {
  font-size: 0.8rem;
}
.table th {
  font-weight: bold;
}
</style>
