
<script setup lang="ts">
import type { ShopItem } from '@/types/gql/response/ShopItem';
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import FilePreview from '@/components/file/FilePreview.vue'
import GalleryPreview from '@/components/gallery/GalleryPreview.vue'
import { toRefs, reactive } from 'vue';
import { useFileStore } from '@/stores/files'
import { useGalleryStore } from '@/stores/galleries'
import { formatDate, formatPrice } from '@/util/util'

const props = defineProps<{
    shop_item: ShopItem,
}>()
const { shop_item } = toRefs(props)

const fileStore = useFileStore()
const files = reactive(fileStore.byIds(shop_item.value.file_ids))

const galleryStore = useGalleryStore()
const galleries = reactive(galleryStore.byIds(shop_item.value.gallery_ids))
</script>

<template>
    <CompWrapper :entity="shop_item" :class="['box']">
        <p :class="['hide', 'message', shop_item.hide ? 'red' : 'green']">{{ shop_item.hide ? 'Hidden from the public' :
            'Available in shop' }}</p>
        <div class="fl-e2e">
            <p class="main-name f-l">{{ shop_item.name }}</p>
            <p class="price f-l">CHF {{ formatPrice(shop_item.price) }}</p>
        </div>
        <p v-if="shop_item.description" class="description f-m">{{ shop_item.description }}</p>
        <p v-if="shop_item.available_to" class="available">Available: {{ formatDate(shop_item.available_from) }} - {{
            formatDate(shop_item.available_to) }} </p>
        <p class="f-l">Files:</p>
        <div class="fl-row-nj">
            <FilePreview v-for="file of files" :key="file.id" :file="file" />
        </div>
        <p class="f-l">Galleries:</p>
        <div class="fl-row-nj">
            <GalleryPreview v-for="gallery of galleries" :key="gallery.id" :gallery="gallery" />
        </div>
    </CompWrapper>
</template>

<style scoped lang="scss">
.hide {
    &.hidden {
        background-color: $c-s-dark;
    }

    &.visible {
        background-color: $c-s-dark;
    }
}
</style>
