import './assets/main.css'
import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// css library
import 'normalize.css'

// other third party libraries
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)

// use third party libraries
app.use(vuetify)
app.use(ElementPlus)

app.mount('#app')

