
<script setup lang="ts">
import type { Gallery } from '@/types/gql/response/Gallery'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import FileDisplay from '@/components/file/FileDisplay.vue'
import { useFileStore } from '@/stores/files'
import { ref, computed, reactive, toRefs, watch } from 'vue'

const props = defineProps<{
    gallery: Gallery,
}>()

const { gallery } = toRefs(props)
const fileStore = useFileStore()
const firstFile = fileStore.byId(gallery.value.file_ids[0])!
</script>

<template>
    <CompWrapper :entity="gallery" :class="['box', 'preview']">
        <p class="main-name f-s">{{ gallery.name }}</p>
        <FileDisplay :file="firstFile" :thumbnail="true" :cover="gallery.file_ids.length" />
    </CompWrapper>
</template>

<style scoped lang="scss"></style>
