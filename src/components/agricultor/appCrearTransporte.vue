<template>
  <v-container class="d-flex justify-center align-center" fluid>
    <v-card elevation="12" class="pa-6" width="100%">
      <!-- Título del formulario -->
      <v-card-title class="text-h5 text-center font-weight-bold"> Crear Transporte </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-row>
            <!-- Tipo de Placa 
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.tipo_placa"
                label="Tipo de Placa"
                type="number"
                outlined
                dense
                required
                class="mb-4"
              ></v-text-field>
            </v-col>
--><!-- Tipo de Placa -->
            <v-col cols="12" md="6">
              <v-select
                v-model="form.tipo_placa"
                :items="tipoPlacas"
                item-title="nombre"
                item-value="id"
                label="Tipo Placa"
                outlined
                dense
                required
              ></v-select>
            </v-col>

            <!-- Placa -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.placa"
                label="Placa"
                outlined
                dense
                required
                :error-messages="placaError"
                @input="validatePlaca"
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Marca -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.marca"
                label="Marca"
                outlined
                dense
                required
                class="mb-4"
              ></v-text-field>
            </v-col>

            <!-- Color -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.color"
                label="Color"
                outlined
                dense
                required
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Línea -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.linea"
                label="Línea"
                outlined
                dense
                required
                class="mb-4"
              ></v-text-field>
            </v-col>

            <!-- Modelo -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.modelo"
                label="Modelo (Año)"
                type="text"
                outlined
                dense
                required
                :error-messages="modeloError"
                @input="validateModelo"
                class="mb-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Botón de Enviar -->
          <v-btn color="green" block class="mt-4" type="submit" elevation="2">
            Crear Transporte
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'AppCrearTransporte',
  data() {
    return {
      form: {
        tipo_placa: null, // Inicializado como número
        placa: '',
        marca: '',
        color: '',
        linea: '',
        modelo: '', // Inicializado como texto
      },
      placaError: '',
      modeloError: '',
      tipoPlacas: [],
    }
  },
  methods: {
    fetchTipoPlaca() {
      axios
        .get('http://localhost:8080/tipoPlaca')
        .then((response) => {
          this.tipoPlacas = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los tipos de placa: ', error)
          alert('No se pudieron cargar los tipos de placas')
        })
    },

    validatePlaca() {
      const placaRegex = /^[0-9]{3}[A-Z]{3}$/
      if (!placaRegex.test(this.form.placa)) {
        this.placaError = 'Formato de placa incorrecto, ej: 000AAA'
      } else {
        this.placaError = ''
      }
    },
    validateModelo() {
      const currentYear = new Date().getFullYear()
      if (isNaN(this.form.modelo) || this.form.modelo < 1980 || this.form.modelo > currentYear) {
        this.modeloError = `El año debe estar entre 1980 y ${currentYear}`
      } else {
        this.modeloError = ''
      }
    },
    /*
    handleSubmit() {
      this.validatePlaca()
      this.validateModelo()
      if (this.placaError || this.modeloError) {
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'Por favor, corrige los errores antes de continuar.',
        })
      }

      // Mostrar los datos en la consola antes de enviarlos
      console.log('Datos enviados al backend:', this.form)

      // Configurar los headers para enviar JSON
      axios
        .post('http://localhost:8080/transporte', this.form, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Respuesta del servidor:', response.data)
          Swal.fire({
            icon: 'success',
            title: 'Transporte creado',
            text: 'El transporte ha sido registrado exitosamente.',
          }).then(() => {
            this.resetForm() //Limpiar formulario despues de guardar
            this.$router.push('/layout/crearTransporte') // Redirigir a la lista de transportes
          })
        })
        .catch((error) => {
          console.error('Error al registrar el transporte:', error)
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar transporte',
            text: 'Ocurrió un error al registrar el transporte. Por favor, inténtalo de nuevo.',
          })
        })
    },*/

    handleSubmit() {
      this.validatePlaca()
      this.validateModelo()
      if (this.placaError || this.modeloError) {
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'Por favor, corrige los errores antes de continuar.',
        })
        return // Detener el envío si hay errores
      }

      // Mostrar los datos en la consola antes de enviarlos
      console.log('Datos enviados al backend:', this.form)

      // Configurar los headers para enviar JSON
      axios
        .post('http://localhost:8080/transporte', this.form, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Respuesta del servidor:', response.data)
          Swal.fire({
            icon: 'success',
            title: 'Transporte creado',
            text: 'El transporte ha sido registrado exitosamente.',
          }).then(() => {
            this.resetForm() //Limpiar formulario despues de guardar
            this.$router.push('/layout/crearTransporte') // Redirigir a la lista de transportes
          })
        })
        .catch((error) => {
          console.error('Error al registrar el transporte:', error)
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar transporte',
            text: 'Ocurrió un error al registrar el transporte. Por favor, inténtalo de nuevo.',
          })
        })
    },

    resetForm() {
      // Restablecer los valores del formulario
      this.form = {
        tipo_placa: null,
        placa: '',
        marca: '',
        color: '',
        linea: '',
        modelo: '',
      }
      // Limpiar los mensajes de error
      this.placaError = ''
      this.modeloError = ''
    },
  },

  mounted() {
    this.fetchTipoPlaca()
  },
}
</script>

<style scoped>
.v-container {
  height: 100vh;
}

.v-card {
  width: 100%;
}

.v-card-title {
  color: #126331;
}

.v-btn {
  font-weight: bold;
}
</style>
