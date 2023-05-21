import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast, { POSITION } from 'vue-toastification'
import './assets/tailwind.css'
import 'vue-toastification/dist/index.css'

createApp(App).use(store).use(router).use(Toast, { position: POSITION.TOP_CENTER, hideProgressBar: true }).mount('#app')
