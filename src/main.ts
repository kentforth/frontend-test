import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/scss/app.scss'
import '@mdi/font/css/materialdesignicons.css'

import vuetifyPlugin from '@/plugins/vuetify.plugin'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(vuetifyPlugin)

app.mount('#app')
