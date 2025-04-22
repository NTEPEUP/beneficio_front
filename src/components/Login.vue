<template>
  <v-container class="login-container" max-width="450px">
    <v-card elevation="20" class="pa-10">
      <v-card-title class="text-h5 text-center">Bienvenido</v-card-title>
      <v-card-subtitle class="text-center mb-8">
        Por favor, inicia sesión para continuar
      </v-card-subtitle>
      <v-card-text>
        <v-form @submit.prevent="handleLogin" ref="loginForm">
          <v-text-field
            v-model="username"
            label="Usuario"
            type="email"
            required
            outlined
            prepend-inner-icon="mdi-email"
            height="200px"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            required
            outlined
            dense
            prepend-inner-icon="mdi-lock"
          ></v-text-field>
          <v-btn color="green" block type="submit" class="mt-4" elevation="2"> Ingresar </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn text small @click="forgotPassword"> ¿Olvidaste tu contraseña? </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios' // Asegúrate de instalar axios: npm install axios

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      if (this.username && this.password) {
        axios
          .post('http://localhost:8080/auth/login', {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            const { token, role } = response.data

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', token)
            console.log('Token guardado:', token)
            console.log('Rol del usuario:', role)

            // Mostrar alerta de éxito
            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
              text: `Bienvenido, rol: ${role}`,
            })

            // Redirigir según el rol
            if (role === 'beneficio') {
              this.$router.push('/layout')
            } else if (role === 'agricultor') {
              this.$router.push('/user-dashboard')
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Rol desconocido',
                text: 'No se pudo determinar el rol del usuario.',
              })
            }
          })
          .catch((error) => {
            console.error('Error al iniciar sesión:', error)

            // Mostrar alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error al iniciar sesión',
              text: 'Credenciales incorrectas o error en el servidor.',
            })
          })
      } else {
        // Mostrar alerta de campos incompletos
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos.',
        })
      }
    },
    forgotPassword() {
      Swal.fire({
        icon: 'info',
        title: 'Recuperar contraseña',
        text: 'Función de recuperación de contraseña no implementada.',
      })
    },
  },
}
</script>
<style scoped>
.v-card {
  border-radius: 12%;
}
.v-btn {
  transition: background-color 0.3s ease;
}
.v-btn:hover {
  background-color: #45a049;
  color: white;
}
</style>
