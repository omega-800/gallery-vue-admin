import { createApp, defineCustomElement } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFiles } from './util/setup'
import FileCompVue from './components/file/FileComp.vue'
import TagCompVue from './components/categories/TagComp.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('file-comp', FileCompVue)
    .component('tag-comp', TagCompVue)
    .component('tag-preview-comp', TagCompVue)

loadFiles();
