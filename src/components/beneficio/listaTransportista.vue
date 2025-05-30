<template>
  <v-container class="py-6" fluid>
    <!-- Encabezado principal -->
    <v-row justify="center">
      <v-col cols="12" md="15">
        <v-card elevation="12" class="pa-4">
          <v-card-title class="text-h4 font-weight-bold text-center">
            Lista de Transportistas
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabla de transportistas -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="15">
        <v-card elevation="12">
          <table class="table">
            <thead>
              <tr>
                <th>CUI</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transportista in transportistas" :key="transportista.id">
                <td>{{ transportista.cui }}</td>
                <td>{{ transportista.nombre }}</td>
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
                <td>{{ transportista.observaciones }}</td>
                <td>
                  <button class="btn btn-success btn-sm" @click="abrirFormulario(transportista)">
                    <i class="mdi mdi-pencil"></i> Cambiar Estado
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal para cambiar estado -->
    <div v-if="dialog" class="modal">
      <div class="modal-content">
        <h3>Cambiar Estado</h3>
        <form @submit.prevent="actualizarEstado">
          <div class="form-group">
            <label for="cui">CUI</label>
            <input type="text" id="cui" v-model="formulario.cui" readonly />
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
  data() {
    return {
      transportistas: [], // Lista de transportistas
      dialog: false, // Controla la visibilidad del modal
      formulario: {
        cui: '',
        estado: '',
        observaciones: '',
      },
    }
  },
  methods: {
    obtenerTransportistas() {
      const token = localStorage.getItem('token') // Obtener el token del almacenamiento local
      axios
        .get('http://localhost:8080/transportista', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.transportistas = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los transportistas:', error)
        })
    },
    abrirFormulario(transportista) {
      // Rellenar el formulario con los datos del transportista seleccionado
      this.formulario.cui = transportista.cui
      this.formulario.estado = transportista.estado
      this.formulario.observaciones = ''
      this.dialog = true // Mostrar el modal
    },
    actualizarEstado() {
      const token = localStorage.getItem('token')
      // Validar los datos del formulario
      if (!this.formulario.estado || !this.formulario.observaciones) {
        alert('Por favor, completa todos los campos.')
        return
      }

      // Enviar los datos al backend
      axios
        .put(
          `http://localhost:8080/transportista/${this.formulario.cui}`,
          {
            estado: this.formulario.estado,
            observaciones: this.formulario.observaciones,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizó con éxito',
            text: 'El etransportista se actualizó con éxito.',
          })

          this.dialog = false // Cerrar el modal
          this.obtenerTransportistas() // Actualizar la lista de transportistas
        })
        .catch((error) => {
          console.error('Error al actualizar el estado:', error)
        })
    },
  },
  mounted() {
    this.obtenerTransportistas() // Cargar transportistas al montar el componente
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
.table th {
  font-weight: bold; /* Aplica negrita a los encabezados */
  background-color: #f4f4f4; /* Opcional: color de fondo para distinguir los encabezados */
  text-align: left; /* Alineación del texto */
  padding: 12px; /* Espaciado interno */
  border-bottom: 2px solid #ddd; /* Línea inferior */
}
/* Botones */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #28a745; /* Verde */
  color: white;
}

.btn-primary {
  background-color: #28a745; /* Azul */
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
