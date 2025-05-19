<template>
  <v-container class="d-flex justify-center align-center" fluid>
    <v-card elevation="12" class="pa-6" width="100%">
      <v-card-title class="text-h5 text-center font-weight-bold">
        Crear Transportista
      </v-card-title>
      <v-divider></v-divider>
      <v-form ref="form" v-model="isFormValid">
        <!-- Campo CUI -->
        <v-text-field
          v-model.number="formData.cui"
          label="CUI"
          type="number"
          :rules="[rules.dpi]"
          required
        ></v-text-field>

        <!-- Campo Nombre -->
        <v-text-field
          v-model="formData.nombre"
          label="Nombre"
          :rules="[rules.required]"
          required
        ></v-text-field>

        <!-- Campo Fecha de Nacimiento -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedDate"
              label="Fecha de Nacimiento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"
              :rules="[rules.fechaNacimiento]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.fechaNacimiento"
            @update:model-value="handleDateSelect"
          ></v-date-picker>
        </v-menu>

        <!-- Campo Tipo de Licencia
        <v-text-field
          v-model="formData.tipoLicencia"
          label="Tipo de Licencia"
          :rules="[rules.required]"
          required
        ></v-text-field>
         -->

        <v-select
          v-model="formData.tipoLicencia"
          :items="licencias"
          item-title="text"
          item-value="value"
          label="Tipo de Licencia"
          :rules="[rules.required]"
          required
        ></v-select>

        <!-- Campo Fecha de Vencimiento de Licencia -->
        <v-menu
          v-model="menuLicencia"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedLicenseDate"
              label="Fecha de Vencimiento de Licencia"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"
              :rules="[rules.fechaVencimientoLicencia]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.fechaVencimientoLicencia"
            @update:model-value="handleLicenseDateSelect"
          ></v-date-picker>
        </v-menu>

        <!-- Botón Guardar -->
        <v-btn
          :disabled="!isFormValid"
          color="green"
          block
          class="mt-4"
          elevation="2"
          @click="submitForm"
          >Guardar</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      menu: false,
      menuLicencia: false,
      isFormValid: false,
      licencias: [
        { text: 'Tipo A', value: 'A' },
        { text: 'Tipo B', value: 'B' },
        { text: 'Tipo C', value: 'C' },
        { text: 'Tipo M', value: 'M' },
        { text: 'Tipo E', value: 'E' },
      ],
      formData: {
        cui: null, // Asegúrate de que sea un número entero
        nombre: '',
        fechaNacimiento: null,
        tipoLicencia: '',
        fechaVencimientoLicencia: null,
      },
      rules: {
        dpi: (v) => /^\d{13}$/.test(v) || 'El número de DPI debe tener exactamente 13 dígitos.',
        required: (v) => !!v || 'Este campo es obligatorio.',
        fechaNacimiento: (v) => {
          if (!v) return 'La fecha de nacimiento es obligatoria.'
          const today = new Date()
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          )
          return (
            new Date(v) <= eighteenYearsAgo ||
            'El transportista debe ser mayor de edad (mínimo 18 años).'
          )
        },
        fechaVencimientoLicencia: (v) => {
          if (!v) return 'La fecha de vencimiento de la licencia es obligatoria.'
          const today = new Date()
          const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
          return (
            new Date(v) > oneMonthLater ||
            'La fecha de vencimiento debe ser al menos un mes mayor que la fecha actual.'
          )
        },
      },
    }
  },
  computed: {
    formattedDate() {
      if (!this.formData.fechaNacimiento) return ''
      const isoDate =
        this.formData.fechaNacimiento instanceof Date
          ? this.formData.fechaNacimiento.toISOString().substr(0, 10)
          : this.formData.fechaNacimiento
      const [year, month, day] = isoDate.split('-')
      return `${day}/${month}/${year}`
    },
    formattedLicenseDate() {
      if (!this.formData.fechaVencimientoLicencia) return ''
      const isoDate =
        this.formData.fechaVencimientoLicencia instanceof Date
          ? this.formData.fechaVencimientoLicencia.toISOString().substr(0, 10)
          : this.formData.fechaVencimientoLicencia
      const [year, month, day] = isoDate.split('-')
      return `${day}/${month}/${year}`
    },
  },
  methods: {
    handleDateSelect(value) {
      this.formData.fechaNacimiento = value
      this.menu = false
    },
    handleLicenseDateSelect(value) {
      this.formData.fechaVencimientoLicencia = value
      this.menuLicencia = false
    },
    submitForm() {
      // Validar fecha de nacimiento
      const fechaNacimientoError = this.rules.fechaNacimiento(this.formData.fechaNacimiento)
      if (fechaNacimientoError !== true) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: fechaNacimientoError,
        })
        return
      }

      // Validar fecha de vencimiento de licencia
      const fechaVencimientoError = this.rules.fechaVencimientoLicencia(
        this.formData.fechaVencimientoLicencia,
      )
      if (fechaVencimientoError !== true) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: fechaVencimientoError,
        })
        return
      }

      const payload = {
        ...this.formData,
        fechaNacimiento: this.formatDateToISO(this.formData.fechaNacimiento),
        fechaVencimientoLicencia: this.formatDateToISO(this.formData.fechaVencimientoLicencia),
      }

      // Imprime el payload en la consola para verificar los datos
      console.log('Datos enviados al backend:', payload)

      axios
        .post('http://localhost:8080/transportista', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Respuesta del servidor:', response.data)
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Transportista registrado correctamente',
          })
          this.limpiarCampos()
        })
        .catch((error) => {
          console.error('Error al guardar los datos:', error)
          alert('Error al guardar los datos')
        })
    },
    limpiarCampos() {
      this.formData = {
        cui: null,
        nombre: '',
        fechaNacimiento: null,
        tipoLicencia: '',
        fechaVencimientoLicencia: null,
      }
      this.isFormValid = false
    },
    formatDateToISO(date) {
      if (!date) return null
      const isoDate = date instanceof Date ? date.toISOString().substr(0, 10) : date
      return isoDate
    },
  },
}
</script>
