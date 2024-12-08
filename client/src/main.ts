import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SocketIOPlugin from './plugins/socket'

import { useSettingsStore } from './stores/settings';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(SocketIOPlugin)
app.use(router)

// Load theme before mounting the app
const settingsStore = useSettingsStore();
settingsStore.loadTheme();

app.mount('#app')
