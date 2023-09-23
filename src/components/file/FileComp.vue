<script setup lang="ts">
import type { FileData } from '@/types/File';

defineProps<{
    file: FileData
}>()
</script>

<template>
    <div class="file-comp comp">
        <div class="name-container">
            <p class="main-name">{{ file.name || file.file_name }}</p>
            <p v-if="file.name">{{ file.file_name }}</p>
            <p>{{ file.__typename }} {{ file.id }}</p>
        </div>
        <div class="content">
            <img v-if="file.__typename == 'Image'" :src="file.url" class="file">
            <video v-else class="file">
                <source :src="file.url" :type="'video/' + file.file_type">
            </video>
            <div class="info-container">
                <p v-if="file.date_added.getTime() !== file.date_updated.getTime()">Updated: {{ file.date_updated }}</p>
                <p>Added: {{ file.date_added }}</p>
                <p>Filetype: {{ file.file_type }}</p>
                <p>(H){{ file.height }}px * (W){{ file.width }}px</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.name-container {
    & .main-name {
        font-size: 24px;
    }
}


.content {
    width: 100%;
    position: relative;

    & .file {
        width: 100%;
    }

    & .info-container {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        font-size: $f-s;
        color: $c-p-light;
    }

    &:hover .info-container {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6)
    }
}
</style>
