
<script setup lang="ts">
import type { FileData } from '@/types/gql/response/File';
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import FileDisplay from '@/components/file/FileDisplay.vue'
import { fullFileName } from '@/util/util';

const props = defineProps<{
    file: FileData
}>()
</script>

<template>
    <CompWrapper :entity="file" :class="['box', 'preview']">
        <p class="main-name f-s">{{ file.name || fullFileName(file) }}</p>
        <FileDisplay :file="file" :thumbnail="true" />
    </CompWrapper>
</template>

<style scoped lang="scss"></style>
