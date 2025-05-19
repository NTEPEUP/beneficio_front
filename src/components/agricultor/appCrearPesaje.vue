<template>
  <v-container class="d-flex justify-center align-center" fluid>
    <v-card elevation="12" class="pa-6" width="100%">
      <v-card-title class="text-h5 text-center font-weight-bold"> Crear Pesaje </v-card-title>
      <v-divider></v-divider>
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        <!-- Campo Estado -->
        <v-text-field
          v-model="form.estado"
          label="Estado"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <!-- Campo Medida de Peso -->
        <v-text-field
          v-model="form.medida"
          label="Medida de Peso"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <!-- Campo Peso Total Actual
        <v-text-field
          v-model.number="form.pesoTotal"
          label="Peso Total Actual"
          type="number"
          :rules="[rules.required, rules.positiveNumber]"
          required
        ></v-text-field>
        -->
        <!-- Campo Peso Total Actual -->
        <v-text-field
          v-model="form.peso_total_actual"
          label="Peso Total Actual"
          :rules="[rules.required]"
          required
          readonly
        ></v-text-field>

        <!-- Campo Fecha Creación -->
        <v-menu
          v-model="menuFechaCreacion"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedFechaCreacion"
              label="Fecha Creación"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"
              :rules="[rules.required]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.fecha"
            @update:model-value="handleFechaCreacionSelect"
          ></v-date-picker>
        </v-menu>
        <!-- Botón Crear -->
        <v-btn
          :disabled="!isFormValid"
          color="green"
          block
          class="mt-4"
          elevation="2"
          @click="crearPesaje"
        >
          Crear
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

import axios from 'axios'

export default {
  data() {
    return {
      pesajeId: null,
      agricultor: null,
      id_pesaje: null,
      id_estado: 1,
      peso_enviado: null,
      peso_total_obtenido: null,
      diferencia_total: null,

      menuFechaCreacion: false,
      isFormValid: false,
      form: {
        estado: 'Sin Cuenta Creada',
        medida: null,
        peso_total_actual: 'Sin peso',
        fecha: null,
      },
      rules: {
        required: (v) => !!v || 'Este campo es obligatorio.',
        positiveNumber: (v) => v > 0 || 'El peso total debe ser un número positivo.',
      },
    }
  },
  computed: {
    formattedFechaCreacion() {
      if (!this.form.fecha) return ''
      const isoDate =
        this.form.fecha instanceof Date
          ? this.form.fecha.toISOString().substr(0, 10)
          : this.form.fecha
      const [year, month, day] = isoDate.split('-')
      return `${day}/${month}/${year}`
    },
  },
  methods: {
    handleFechaCreacionSelect(value) {
      this.form.fecha = value
      this.menuFechaCreacion = false
    },

    crearPesaje() {
      axios
        .post('http://localhost:8080/pesaje', this.form)
        .then((response) => {
          console.log('Respuesta del backend:', response.data)
          const idPesaje = response.data.id // Suponiendo que el backend retorna el id así

          Swal.fire({
            icon: 'success',
            title: 'Registro creado',
            text: `El registro de pesaje ha sido creado exitosamente. ID: ${idPesaje}`,
          })

          // Ahora crea la cuenta usando el id del pesaje
          const datosCuenta = {
            id_pesaje: idPesaje,
            // agrega aquí otros campos requeridos por tu backend para la cuenta
          }

          axios
            .post('http://localhost:8080/cuentas', datosCuenta)
            .then((res) => {
              console.log('Cuenta creada:', res.data)
              // Puedes mostrar otro mensaje si lo deseas
            })
            .catch((err) => {
              console.error('Error al crear la cuenta:', err)
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El pesaje fue creado, pero hubo un error al crear la cuenta.',
              })
            })
        })
        .catch((error) => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear el registro de pesaje.',
          })
        })
    },
  },
}
</script>

<style scoped>
.v-card {
  max-width: 800px;
  margin: auto;
}

.v-btn {
  font-weight: bold;
}
</style>
