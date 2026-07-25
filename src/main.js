import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//Quasar
import {Quasar} from 'quasar'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, 
})

app.mount('#app')
