
<script setup lang="ts">
import type { FileData } from '@/types/gql/response/File';
import { thumbPath, previewPath, previewPathVid } from '@/util/file/download';
import { isVideo, fileAlt, isImage } from '@/util/util';
import { toRefs, onMounted, ref } from 'vue';

const props = defineProps<{
    file: FileData,
    thumbnail?: boolean,
    cover?: any
}>()

const { thumbnail, file } = toRefs(props)

let width = ref(file.value.width_prev + 'px')
let height = ref(file.value.height_prev + 'px')
let spinnerSize = ref('3em')

const elem = ref<HTMLDivElement>()

onMounted(() => {
    let parentWidth = elem.value?.parentElement?.clientWidth
    if (parentWidth) {
        spinnerSize.value = parentWidth * 0.8 + 'px'
        if (thumbnail.value) {
            height.value = width.value = parentWidth + 'px'
        } else {
            let heightCalc = file.value.height_prev / file.value.width_prev * parentWidth
            height.value = heightCalc + 'px'
            width.value = parentWidth + 'px'
            if (file.value.height_prev < file.value.width_prev) {
                spinnerSize.value = heightCalc * 0.8 + 'px'
            }
        }
    }
})
</script>

<template>
    <div :class="[{ thumbnail }, 'file']" ref="elem">
        <div class="spinner"></div>
        <template v-if="thumbnail">
            <img :src="thumbPath(file.file_name)" :alt="fileAlt(file)" class="img-thumb display" loading="lazy">
            <div v-if="cover" class="cover"><span class="cover-img">{{ cover }}</span></div>
        </template>
        <template v-else>
            <img v-if="isImage(file)" :src="previewPath(file.file_name)" :alt="fileAlt(file)" class="img-prev display"
                loading="lazy">
            <video v-if="isVideo(file)" controls class="vid-prev display" preload="none">
                <source :src="previewPathVid(file.file_name)" type="video/webm">
            </video>
        </template>
    </div>
</template>

<style scoped lang="scss">
.file {
    position: relative;

    & .display {
        position: relative;
        width: 100%;
        z-index: $z-lm;
        width: v-bind(width);
        height: v-bind(height);
    }

    & .spinner {
        @extend %spinner;
        z-index: $z-l;
        position: absolute;
        border-width: $el-pad;
        width: v-bind(spinnerSize);
        height: v-bind(spinnerSize);
        top: calc(50% - (v-bind(spinnerSize) / 2));
        left: calc(50% - (v-bind(spinnerSize) / 2));
    }

    &.thumbnail {
        position: relative;

        & .cover {
            background-color: $c-dark;
            opacity: $op-m;
            z-index: $z-m;

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
}
</style>
