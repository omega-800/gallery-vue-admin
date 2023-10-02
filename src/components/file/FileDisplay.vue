
<script setup lang="ts">
import type { FileData } from '@/types/gql/response/File';
import { thumbPath, previewPath, previewPathVid } from '@/util/file/download';
import { isVideo, fileAlt, isImage } from '@/util/util';
import { toRefs } from 'vue';

const props = defineProps<{
    file: FileData,
    thumbnail?: boolean,
    cover?: any
}>()
const { thumbnail } = toRefs(props)
</script>

<template>
    <div :class="[{ thumbnail }, 'file']">
        <template v-if="thumbnail">
            <img :src="thumbPath(file.file_name)" :alt="fileAlt(file)" class="img-thumb">
            <div v-if="cover" class="cover"><span class="cover-img">{{ cover }}</span></div>
        </template>
        <template v-else>
            <img v-if="isImage(file)" :src="previewPath(file.file_name)" :alt="fileAlt(file)" class="img-prev">
            <video v-if="isVideo(file)" controls class="vid-prev">
                <source :src="previewPathVid(file.file_name)" type="video/webm">
            </video>
        </template>
    </div>
</template>

<style scoped lang="scss">
.img-thumb,
.img-prev,
.vid-prev {
    width: 100%;
}

.thumbnail {
    position: relative;

    & .cover {
        background-color: $c-dark;
        opacity: $op-m;

        & .cover-img {
            color: $c-p-light;
            font-size: $f-xl;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
