<script setup lang="ts">
import FileEditComp from '@/components/file/FileEditComp.vue'
import FileUpload from '@/components/file/FileUpload.vue'
import { useFileStore } from '@/stores/files'
import type { FileData } from '@/types/gql/response/File'
import { ref } from 'vue'
</script>

<script lang="ts">
const store = useFileStore()

const showDeleted = ref(false)
function filesToShow(): FileData[] {
    let files = showDeleted.value ? store.deleted : store.available;
    return files.sort((a, b) => b.date_added.getTime() - a.date_added.getTime())
}
</script>

<template>
    <h1>Files</h1>
    <FileUpload />
    <div class="filter">
        <div class="show-deleted named-switch">
            <span>Show deleted</span>
            <label class="switch">
                <input type="checkbox" @change="showDeleted = !showDeleted">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    <TransitionGroup name="list" tag="div" class="file-list fl-col-s">
        <FileEditComp v-for="file of filesToShow()" :key="file.id" :file="file" />
    </TransitionGroup>
</template>

<style scoped lang="scss">
.file-list {
    padding-top: $el-rad;
    gap: $el-rad;
}
</style>
