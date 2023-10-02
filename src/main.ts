import { createApp, defineCustomElement } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFiles } from './util/setup'
import FilePreviewVue from './components/file/FilePreview.vue'
import FileCompVue from './components/file/FileComp.vue'
import TagCompVue from './components/tag/TagComp.vue'
import GalleryCompVue from './components/gallery/GalleryComp.vue'
import GalleryPreviewVue from './components/gallery/GalleryPreview.vue'
import ShopItemCompVue from './components/shop/ShopItemComp.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('file-comp', FileCompVue)
    .component('file-preview-comp', FilePreviewVue)
    .component('gallery-comp', GalleryCompVue)
    .component('gallery-preview-comp', GalleryPreviewVue)
    .component('tag-comp', TagCompVue)
    .component('tag-preview-comp', TagCompVue)
    .component('shop_item-comp', ShopItemCompVue)
    .component('shop_item-preview-comp', ShopItemCompVue)

loadFiles();
