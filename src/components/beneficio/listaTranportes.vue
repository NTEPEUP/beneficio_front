<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between">
        Lista de Transportes
        <button class="btn btn-primary" @click="irACrearTransporte">
          <i class="mdi mdi-plus"></i> Agregar Transporte
        </button>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <table class="table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Color</th>
              <th>Línea</th>
              <th>Modelo</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Acciones</th>
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
              <td>{{ transporte.observaciones }}</td>
              <td>
                <button class="btn btn-success btn-sm" @click="abrirFormulario(transporte)">
                  <i class="mdi mdi-pencil"></i> Cambiar Estado
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>

    <!-- Modal para cambiar estado -->
    <div v-if="dialog" class="modal">
      <div class="modal-content">
        <h3>Cambiar Estado</h3>
        <form @submit.prevent="actualizarEstado">
          <div class="form-group">
            <label for="placa">Placa</label>
            <input type="text" id="placa" v-model="formulario.placa" readonly />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <select id="estado" v-model="formulario.estado" required>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              v-model="formulario.observaciones"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="dialog = false">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  </v-container>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'AppListarTransporte',
  data() {
    return {
      transportes: [], // Lista de transportes
      dialog: false, // Controla la visibilidad del modal
      formulario: {
        placa: '',
        estado: '',
        observaciones: '',
      },
    }
  },
  methods: {
    fetchTransportes() {
      axios
        .get('http://localhost:8080/transporte') // Endpoint del backend
        .then((response) => {
          this.transportes = response.data // Asignar los datos obtenidos
        })
        .catch((error) => {
          console.error('Error al obtener transportes:', error)
        })
    },
    irACrearTransporte() {
      this.$router.push('/layout/transportes') // Redirigir al formulario de creación
    },
    abrirFormulario(transporte) {
      // Rellenar el formulario con los datos del transporte seleccionado
      this.formulario.placa = transporte.placa
      this.formulario.estado = transporte.estado
      this.formulario.observaciones = ''
      this.dialog = true // Mostrar el modal
    },
    actualizarEstado() {
      // Validar los datos del formulario
      if (!this.formulario.estado || !this.formulario.observaciones) {
        alert('Por favor, completa todos los campos.')
        return
      }

      console.log('datos al backkkk:' + this.formulario.placa)
      // Enviar los datos al backend
      axios
        .put(`http://localhost:8080/transporte/${this.formulario.placa}`, {
          estado: this.formulario.estado,
          observaciones: this.formulario.observaciones,
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con éxito',
            text: 'El transporte se actualizó con éxito.',
          })
          this.dialog = false // Cerrar el modal
          this.fetchTransportes() // Actualizar la lista de transportes
        })
        .catch((error) => {
          console.error('Error al actualizar el estado:', error)
        })
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
/* Botones */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #28a745; /* Azul */
  color: #ddd;
}

.btn-primary {
  background-color: #007bff; /* Azul */
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3; /* Azul más oscuro */
}

.btn-secondary {
  background-color: #6c757d; /* Gris */
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268; /* Gris más oscuro */
}
</style>
