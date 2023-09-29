import { createApp, defineCustomElement } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFiles } from './util/setup'
import FilePreviewVue from './components/file/FilePreview.vue'
import FileCompVue from './components/file/FileComp.vue'
import TagCompVue from './components/categories/TagComp.vue'
import GalleryCompVue from './components/gallery/GalleryComp.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('file-comp', FileCompVue)
    .component('file-preview-comp', FilePreviewVue)
    .component('gallery-comp', GalleryCompVue)
    .component('tag-comp', TagCompVue)
    .component('tag-preview-comp', TagCompVue)

loadFiles();
