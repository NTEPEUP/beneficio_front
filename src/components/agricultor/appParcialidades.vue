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
        <v-btn color="green" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon>
          Crear Parcialidad
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
    <!-- Diálogo para crear parcialidad -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Crear Parcialidad</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="peso"
              label="Peso"
              :rules="[rules.required, rules.numeric, rules.positive]"
              type="number"
              required
            />
            <v-select
              v-model="transporte"
              :items="transportes"
              item-title="placa"
              item-value="id"
              label="Transporte"
              :rules="[rules.required]"
              required
            />
            <v-select
              v-model="transportista"
              :items="transportistas"
              item-title="nombre"
              item-value="cui"
              label="Transportista"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="tipoMedida"
              label="Tipo de Medida"
              :rules="[rules.required]"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cerrar</v-btn>
          <v-btn color="green" :disabled="!valid" text @click="crearParcialidad">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      valid: false,
      parcialidades: [],
      cuenta: null,
      id_pesaje: null,
      dialog: false, // <-- v-model para el diálogo

      peso: '',
      transporte: '',
      transportista: '',
      tipoMedida: '',

      transportes: [], // Se llenará con los datos de la API
      transportistas: [], // Se llenará con los datos de la API
      rules: {
        required: (value) => !!value || 'Este campo es obligatorio.',
        numeric: (value) => !isNaN(value) || 'Debe ser un número válido.',
        positive: (value) => value > 0 || 'El peso debe ser mayor a 0.',
      },
    }
  },
  mounted() {
    const cuentaRecibida = this.cuenta || this.$route.params.cuenta
    const idPesajeRecibido = this.id_pesaje || this.$route.params.id_pesaje // <-- Agrega esta línea
    console.log('Cuenta recibida:', cuentaRecibida)
    console.log('ID Pesaje recibido:', idPesajeRecibido) // <-- Agrega esta línea
    this.cuenta = cuentaRecibida
    this.id_pesaje = idPesajeRecibido // <-- Agrega esta línea
    this.fetchParcialidades()
    this.fetchTransportes()
    this.fetchTransportistas()
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

    async crearParcialidad() {
      const token = localStorage.getItem('token')
      const usuarioId = Number(sessionStorage.getItem('id'))

      try {
        // Crear la parcialidad principal
        const resParcialidad = await axios.post(
          'http://localhost:8080/parcialidades',
          {
            peso: this.peso,
            transporte: this.transporte,
            transportista: this.transportista,
            id_pesaje: this.id_pesaje,
            usuario: usuarioId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const idparcialidad = resParcialidad.data.id

        // Crear la parcialidad de café
        const datosParcialidad = {
          id: idparcialidad,
          cuenta: { cuenta: Number(this.cuenta) },
          id_transporte: this.transporte,
          id_transportista: this.transportista,
          peso_enviado: this.peso,
          peso_bascula: 0,
          fecha_recepcion_parcialidad: new Date().toISOString(),
          diferencia_peso: this.peso,
          fecha_peso_bascula: null,
          usuario: usuarioId,
        }

        await axios.post('http://localhost:8080/parcialidadesCafe', datosParcialidad, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        // 1. Obtener el peso actual de la cuenta
        const resCuenta = await axios.get(`http://localhost:8080/cuentas/${this.cuenta}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const pesoActual = Number(resCuenta.data.peso_enviado) || 0
        console.log('Peso actual de la cuenta:', pesoActual)

        // 2. Sumar el peso nuevo
        const nuevoPeso = pesoActual + Number(this.peso)
        console.log('nuevo peso', nuevoPeso)

        // 3. Actualizar la cuenta con el nuevo peso
        await axios.put(
          `http://localhost:8080/cuentas/peso/${this.cuenta}`,
          { peso_enviado: nuevoPeso },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )

        Swal.fire({
          icon: 'success',
          title: 'Registro creado',
          text: `El registro de pesaje ha sido creado exitosamente. ID: ${idparcialidad}`,
        })

        // Refresca la tabla y limpia el formulario
        this.fetchParcialidades()
        this.dialog = false
        this.peso = ''
        this.transporte = ''
        this.transportista = ''
        this.tipoMedida = ''
        if (this.$refs.form) this.$refs.form.resetValidation()
      } catch (error) {
        console.error('Error al crear la parcialidad:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la parcialidad o la parcialidad de café.',
        })
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
