<script setup lang="ts">
import FileComp from '@/components/file/FileComp.vue'
import FileUpload from '@/components/file/FileUpload.vue'
import { useFileStore } from '@/stores/files'
</script>

<script lang="ts">
const store = useFileStore()
</script>

<template>
    <h1>Files</h1>
    <FileUpload />
    <div class="file-list">
        <FileComp v-for="file of store.files" :key="file.id" :file="file"></FileComp>
    </div>
</template>

<style scoped lang="scss"></style>
