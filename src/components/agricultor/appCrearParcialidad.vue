<template>
  <v-container class="crear-parcialidad" max-width="600">
    <v-card>
      <v-card-title class="text-h5">Crear Parcialidad</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Campo Peso -->
          <v-text-field
            v-model="form.peso"
            label="Peso"
            type="number"
            placeholder="Ingrese el peso indicado para la cuenta"
            :rules="[rules.required, rules.numeric, rules.positive]"
            outlined
            dense
            required
          ></v-text-field>
          <v-select
            v-model="form.transporte"
            :items="transportes"
            item-title="placa"
            item-value="placa"
            label="Transportes disponibles"
            :rules="[rules.required]"
            outlined
            dense
            required
          ></v-select>

          <v-select
            v-model="form.transportista"
            :items="transportistas"
            item-title="nombre"
            item-value="cui"
            label="Transportistas disponibles"
            :rules="[rules.required]"
            outlined
            dense
            required
          ></v-select>

          <!-- Campo Tipo de Medida -->
          <v-text-field
            v-model="form.tipoMedida"
            label="Tipo de Medida"
            placeholder="Ingrese el tipo de medida"
            :rules="[rules.required]"
            outlined
            dense
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mt-04" color="primary" :disabled="!valid" block @click="crearParcialidad"
          >Crear</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      valid: false,
      form: {
        peso: '',
        transporte: '',
        transportista: '',
        tipoMedida: '',
      },
      transportes: [], // Se llenará con los datos de la API
      transportistas: [], // Se llenará con los datos de la API
      rules: {
        required: (value) => !!value || 'Este campo es obligatorio.',
        numeric: (value) => !isNaN(value) || 'Debe ser un número válido.',
        positive: (value) => value > 0 || 'El peso debe ser mayor a 0.',
      },
    }
  },
  methods: {
    fetchTransportes() {
      const token = localStorage.getItem('token') // Obtén el token del almacenamiento local
      axios
        .get('http://localhost:8080/transporte/activos', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }) // Reemplaza con tu URL
        .then((response) => {
          this.transportes = response.data // Asume que la respuesta es un array de transportes
        })
        .catch((error) => {
          console.error('Error al obtener los transportes:', error)
          alert('No se pudieron cargar los transportes.')
        })
    },
    fetchTransportistas() {
      const token = localStorage.getItem('token') // Obtén el token del almacenamiento local
      axios
        .get('http://localhost:8080/transportista', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }) // Reemplaza con tu URL
        .then((response) => {
          this.transportistas = response.data // Asume que la respuesta es un array de transportistas
        })
        .catch((error) => {
          console.error('Error al obtener los transportistas:', error)
          alert('No se pudieron cargar los transportistas.')
        })
    },
    crearParcialidad() {
      if (this.$refs.form.validate()) {
        console.log('ID del transporte seleccionado:', this.form.transporte)
        console.log('ID del transportista seleccionado:', this.form.transportista)
        console.log('Datos del formulario:', this.form)
        alert('Parcialidad creada con éxito')
      }
    },
  },
  mounted() {
    // Llama a ambos métodos para obtener transportes y transportistas
    this.fetchTransportes()
    this.fetchTransportistas()
  },
}
</script>
