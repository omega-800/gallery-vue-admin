<script setup lang="ts">
import { reactive, ref } from 'vue';
import { uploadFiles } from '@/util/file/upload'

let uploadStatus = ref("")
let files: File[] = reactive([])

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
    addFiles([...e.dataTransfer.files])
}
function inputChange(e: Event) {
    let target = e.currentTarget as HTMLInputElement;
    if (!target.files) return;
    addFiles([...target.files])
}
function addFiles(items: File[]) {
    items.forEach(item => {
        if (!files.some(file => file.name == item.name) && ['image', 'video'].includes(item.type.split('/')[0])) files.push(item)
    })
}
function removeFile(file: File) {
    files.splice(files.findIndex(f => f == file), 1)
}
function resetFiles() {
    files.splice(0)
}
function upload() {
    uploadStatus.value = "Uploading..."
    uploadStatus.value = uploadFiles(files);
}
</script>

<template>
    <form :class="[{ advanced: isAdvancedUpload() }, 'upload-comp', 'comp']" action="" method="POST"
        enctype="multipart/form-data" @submit.prevent="upload()">
        <div class="file-inputs custom-input fl-col">
            <div v-if="isAdvancedUpload()" class="drop-zone" @dragenter.stop.prevent="dragEnter($event)"
                @dragover.stop.prevent="dragEnter($event)" @dragleave.stop.prevent="dragLeave($event)"
                @drop.stop.prevent="dropFiles($event); dragLeave($event)"></div>
            <div class="select">
                <input type="file" name="files" id="files" data-multiple-caption="{count} files selected"
                    accept="image/*,video/*" multiple @change="inputChange($event)" />
                <label for="files" class="lnk">Choose a file</label>
                <span> or drag it here.</span>
            </div>

            <div class="files fl-col-l" ref="filesdiv">
                <p v-for="file in files" :key="file.name" class="lnk" @click="removeFile(file)">X {{ file.name }}</p>
            </div>

            <div class="actions fl-e2e">
                <button v-if="files.length > 0" class="btn" @click="resetFiles()">X Reset</button>
                <button class="btn" type="submit" :disabled="files.length == 0">
                    {{ files.length == 0 ? 'Upload (select files first) ' : `Upload ${files.length} files` }}
                </button>
            </div>
        </div>
        <div class="info">{{ uploadStatus }}</div>
    </form>
</template>

<style scoped lang="scss">
.upload-comp {
    width: 100%;
    background-color: $c-p-light;
    outline: $bd-dash;
    outline-offset: -5px;
    padding: $el-size 10%;
    position: relative;

    & .drop-zone {
        display: none;
    }

    & .file-inputs {
        height: calc(100% - $el-size);
    }

    & .info {
        height: $el-size;
    }

    &.advanced {
        min-height: 20vh;
        height: 1px;

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
