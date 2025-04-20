import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Importar Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importar estilos de Vuetify
import '@mdi/font/css/materialdesignicons.css' // Iconos opcionales
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

// Crear instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  labs,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Usar Vuetify

app.mount('#app')
