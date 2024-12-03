import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/app.scss'

import vuetifyPlugin from '@/plugins/vuetify.plugin'

const app = createApp(App)

app.use(router)
app.use(vuetifyPlugin)

app.mount('#app')
