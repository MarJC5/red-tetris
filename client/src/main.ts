import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SocketIOPlugin from './plugins/socket'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(SocketIOPlugin)
app.use(router)

app.mount('#app')
