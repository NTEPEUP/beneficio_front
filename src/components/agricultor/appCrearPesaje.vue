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
          v-model="form.medidaPeso"
          label="Medida de Peso"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <!-- Campo Peso Total Actual -->
        <v-text-field
          v-model.number="form.pesoTotal"
          label="Peso Total Actual"
          type="number"
          :rules="[rules.required, rules.positiveNumber]"
          required
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
            v-model="form.fechaCreacion"
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
          @click="crearRegistro"
        >
          Crear
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      menuFechaCreacion: false,
      isFormValid: false,
      form: {
        estado: '',
        medidaPeso: '',
        pesoTotal: null,
        fechaCreacion: null,
      },
      rules: {
        required: (v) => !!v || 'Este campo es obligatorio.',
        positiveNumber: (v) => v > 0 || 'El peso total debe ser un número positivo.',
      },
    }
  },
  computed: {
    formattedFechaCreacion() {
      if (!this.form.fechaCreacion) return ''
      const isoDate =
        this.form.fechaCreacion instanceof Date
          ? this.form.fechaCreacion.toISOString().substr(0, 10)
          : this.form.fechaCreacion
      const [year, month, day] = isoDate.split('-')
      return `${day}/${month}/${year}`
    },
  },
  methods: {
    handleFechaCreacionSelect(value) {
      this.form.fechaCreacion = value
      this.menuFechaCreacion = false
    },
    crearRegistro() {
      console.log('Datos del formulario:', this.form)

      // Simulación de creación del registro
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro creado exitosamente',
      })

      // Aquí puedes agregar la lógica para enviar los datos al backend
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
