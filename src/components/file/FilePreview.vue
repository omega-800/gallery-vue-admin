
<script setup lang="ts">
import type { FileData } from '@/types/gql/response/File';
import { thumbPath } from '@/util/file/download';
import CompWrapper from '@/components/helpers/CompWrapper.vue';

const props = defineProps<{
    file: FileData
}>()
</script>

<template>
    <CompWrapper :entity="file" :class="['box']">
        <p class="main-name f-s">{{ file.name || file.file_name_orig }}</p>
        <img :src="thumbPath(file.file_name)" class="file">
    </CompWrapper>
</template>

<style scoped lang="scss">
.file-comp {
    width: 15vw;
    padding: $el-rad;

    &.isfavorite {
        outline-color: $c-s-light;
    }

    & .file {
        width: 100%;
    }
}
</style>
