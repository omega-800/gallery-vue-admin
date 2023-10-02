<script setup lang="ts">
import { uploadFiles } from '@/util/file/upload'
import { useUploadStore } from '@/stores/upload';
import { storeToRefs } from 'pinia';
import { UploadStatus } from '@/types/files/FileUpload'
import ToggleIconTrash from '@/components/icons/toggle/ToggleIconTrash.vue'

const uploadStore = useUploadStore()

let { inProgress, items } = storeToRefs(useUploadStore());

function isAdvancedUpload(): boolean {
    let div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}
function dragEnter(e: DragEvent) {
    (e.currentTarget as HTMLElement).classList.add('dragover')
}
function dragLeave(e: DragEvent) {
    (e.currentTarget as HTMLElement).classList.remove('dragover')
}
function dropFiles(e: DragEvent) {
    if (!e.dataTransfer?.files) return;
    uploadStore.addItems([...e.dataTransfer.files])
}
function inputChange(e: Event) {
    let target = e.currentTarget as HTMLInputElement;
    if (!target.files) return;
    uploadStore.addItems([...target.files])
}
function removeFile(id: string) {
    uploadStore.removeItem(id)
}
function resetFiles() {
    uploadStore.resetItems()
}
function upload() {
    uploadFiles()
    //resetFiles();
}
</script>

<template>
    <form :class="[{ advanced: isAdvancedUpload(), inprogress: inProgress }, 'upload-comp', 'comp', 'custom-input', 'box']"
        action="" method="POST" enctype="multipart/form-data" @submit.prevent="upload()">

        <div v-if="isAdvancedUpload()" class="drop-zone" @dragenter.stop.prevent="dragEnter($event)"
            @dragover.stop.prevent="dragEnter($event)" @dragleave.stop.prevent="dragLeave($event)"
            @drop.stop.prevent="dropFiles($event); dragLeave($event)"></div>

        <div class="progress">Upload in progress...</div>
        <div class="actions fl-e2e">
            <button class="btn" type="submit" :disabled="items.length == 0">
                {{ items.length == 0 ? 'Upload (select files first) ' : `Upload ${items.length} files` }}
            </button>
            <button v-if="items.length > 0" class="btn" @click="resetFiles()">X Reset</button>
        </div>
        <div class="select">
            <input type="file" name="files" id="files" data-multiple-caption="{count} files selected"
                accept="image/*,video/*" multiple @change="inputChange($event)" :disabled="inProgress" />
            <label for="files" class="lnk">Choose a file</label>
            <span> or drag it here.</span>
        </div>

        <div class="files fl-col-l">
            <template v-for="item in items" :key="item.id">
                <div v-if="item.state.status != UploadStatus.done"
                    :class="[{ error: item.state.status == UploadStatus.error }, 'upload-item', 'box2']">
                    <div class="infos">
                        <p class="f-m">{{ item.file.name }}</p>
                        <p class="f-s">
                            <span v-if="item.state.percent">{{ item.state.percent }}% </span>
                            <span v-if="!item.state.action">{{ item.state.status }}</span>
                            <span v-if="item.state.action">{{ item.state.action }}</span>
                            <span v-if="item.state.status == UploadStatus.progress">...</span>
                        </p>
                        <div v-if="item.state.percent" class="percent-wrapper cover">
                            <div class="percent" :style="{ width: item.state.percent + '%' }"></div>
                        </div>
                    </div>
                    <ToggleIconTrash :active="false" :disabled="inProgress" @click="removeFile(item.id)" />
                </div>
            </template>
        </div>
    </form>
</template>

<style scoped lang="scss">
.upload-comp {
    width: 100%;

    & .drop-zone {
        display: none;
    }

    height: calc(100% - $el-size);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: $el-tpl $el-tpl 1fr;
    align-items: center;

    & .files .upload-item {
        position: relative;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr $el-dbl;
        grid-template-rows: 1fr;

        & .percent-wrapper {

            & .percent {
                background-color: $c-dark;
                opacity: $op-l;
                position: absolute;
                height: 100%;
                left: 0;
                top: 0;
                border-radius: $el-rad;
            }
        }

        &>* {
            line-break: anywhere;
        }

        &.error {
            color: $c-s-dark;
            border-color: $c-s-dark;

            & .percent {
                background-color: $c-s-dark;
                opacity: $op-m;
            }
        }
    }

    & .info {
        height: $el-size;
    }

    & .progress {
        display: none;
    }

    &.inprogress {
        outline-color: $c-p-mid;

        grid-template-rows: $el-tpl 1fr;

        & .drop-zone,
        .actions,
        .select {
            display: none;
        }

        & .remove-file {
            opacity: $op-h;
            cursor: default;

            &:hover {
                color: $c-dark;
            }
        }

        & .progress {
            display: block;
            color: $c-light;
            font-weight: 600;
            font-size: $f-l;
        }
    }

    &.advanced {
        min-height: 20vh;

        & .drop-zone {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;

            &.dragover {
                background-color: $c-p-mid;
                opacity: $op-m;
            }
        }

        & .select,
        .actions,
        .files {
            z-index: $z-l;
            width: 100%;
        }
    }
}
</style>
@/types/files/FileUpload