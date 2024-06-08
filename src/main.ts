import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/app.scss'

import JsonExcel from 'vue-json-excel3'

const app = createApp(App)

app.use(router)
app.component('downloadExcel', JsonExcel)

app.mount('#app')
