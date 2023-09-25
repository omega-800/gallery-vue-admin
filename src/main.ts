import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFiles } from './util/setup'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
loadFiles();
