<script setup lang="ts">
import type { FileData } from '@/types/File';

defineProps<{
    file: FileData
}>()
</script>

<template>
    <div class="file comp">
        <div class="name-container">
            <p class="main-name">{{ file.name || file.file_name }}</p>
            <p v-if="file.name">{{ file.file_name }}</p>
        </div>
        <img :src="file.url">
    </div>
</template>

<style scoped lang="scss">
.name-container {
    & .main-name {
        font-size: 24px;
    }
}

img {
    width: 250px;
}
</style>
