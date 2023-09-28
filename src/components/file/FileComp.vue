
<script setup lang="ts">
import { computed } from 'vue'
import type { FileData } from '@/types/gql/response/File';
import { previewPath, previewPathVid } from '@/util/file/download';
import { isImage, isVideo, humanFileSize, humanTime } from '@/util/util';
import { useTagStore } from '@/stores/tags';
import TagComp from '@/components/categories/TagComp.vue'
import CompWrapper from '@/components/helpers/CompWrapper.vue';

const props = defineProps<{
    file: FileData
}>()
const tagStore = useTagStore();
const tags = computed(() => tagStore.byIds(props.file.tag_ids))
</script>

<template>
    <CompWrapper :entity="file" :classes="['box']">
        <div class="name-container fl-col">
            <p class="main-name f-l">{{ file.name || file.file_name_orig }}</p>
            <p v-if="file.name">{{ file.file_name_orig }}</p>
            <p>{{ file.__typename }} {{ file.id }}</p>
        </div>
        <div class="tags fl-row">
            <TagComp v-for="tag in tags" :key="tag.id" :tag="tag" />
        </div>
        <div class="content">
            <img v-if="isImage(file)" :src="previewPath(file.file_name)" class="file">
            <video v-if="isVideo(file)" class="file" constrols>
                <source :src="previewPathVid(file.file_name)" type="video/webm">
            </video>
            <Transition name="fade">
                <table class="info-container">
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>Added</td>
                        <td>{{ file.date_added.toDateString() }}</td>
                    </tr>
                    <tr v-if="file.date_deleted">
                        <td>Deleted</td>
                        <td>{{ file.date_deleted.toDateString() }}</td>
                    </tr>
                    <tr v-if="file.date_added.getTime() !== file.date_updated.getTime()">
                        <td>Updated</td>
                        <td>{{ file.date_updated.toDateString() }}</td>
                    </tr>
                    <tr>
                        <td>Filetype</td>
                        <td>{{ file.file_type }}</td>
                    </tr>
                    <tr>
                        <td>Dimensions</td>
                        <td>(H){{ file.height }}px * (W){{ file.width }}px</td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>{{ humanFileSize(file.size) }}</td>
                    </tr>
                    <tr>
                        <td>Edited</td>
                        <td>{{ file.edited }}</td>
                    </tr>
                    <template v-if="isImage(file)">
                        <tr>
                            <td>Alt</td>
                            <td>{{ file.alt }}</td>
                        </tr>
                    </template>
                    <template v-if="isVideo(file)">
                        <tr>
                            <td>Duration</td>
                            <td>{{ humanTime(file.duration) }}</td>
                        </tr>
                        <tr>
                            <td>FPS</td>
                            <td>{{ file.fps }}</td>
                        </tr>
                    </template>
                    <tr>
                        <td>Type</td>
                        <td>{{ file.__typename }}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{{ file.id }}</td>
                    </tr>
                </table>
            </Transition>
        </div>
    </CompWrapper>
</template>

<style scoped lang="scss">
.file-comp {
    width: 100%;

    &.isfavorite {
        outline-color: $c-s-light;

        & .favorite {
            color: $c-s-light;
        }
    }

    &.isdeleted {
        outline-color: $c-light;

        & .delete {
            color: $c-light;
        }
    }

    & .name-container {
        &>* {
            line-break: anywhere;
        }
    }

    & .content {
        width: 100%;
        position: relative;

        & .file {
            width: 100%;
        }

        & .info-container {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            font-size: $f-s;
            color: $c-p-light;
            border-collapse: collapse;
            background-color: $c-dark;
            transition: $tr-op-def;

            & tr {
                border-bottom: $thin solid $c-p-light;
            }

            & th {
                text-align: start;
            }

        }

        &:hover .info-container {
            opacity: $op-h;
        }
    }
}
</style>
