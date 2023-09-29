<script setup lang="ts">
import FileUpload from '@/components/file/FileUpload.vue'
import { useFileStore } from '@/stores/files'
import type { FileData } from '@/types/gql/response/File'
import { ref } from 'vue'
import { getEntityInfo } from '@/util/entities'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
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
        <EditCompWrapper v-for="file of filesToShow()" :key="file.id" :entity-type="getEntityInfo('file')"
            :entity-id="file.id" />
    </TransitionGroup>
</template>

<style scoped lang="scss">
.file-list {
    padding-top: $el-rad;
    gap: $el-rad;
}
</style>
