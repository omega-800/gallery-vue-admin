import { createApp, defineCustomElement } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFiles } from './util/setup'
import FileCompVue from './components/file/FileComp.vue'
import TagCompVue from './components/categories/TagComp.vue'
import FileEditCompVue from './components/file/FileEditComp.vue'
import TagEditCompVue from './components/categories/TagEditComp.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('file-comp', FileCompVue)
    .component('file-edit-comp', FileEditCompVue)
    .component('tag-comp', TagCompVue)
    .component('tag-preview-comp', TagCompVue)
    .component('tag-edit-comp', TagEditCompVue)

loadFiles();
