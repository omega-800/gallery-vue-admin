<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import FormWrapper from '@/components/helpers/FormWrapper.vue';
import { useFileStore } from '@/stores/files';
import type { FileData } from '@/types/gql/response/File';
import { isImage, isVideo } from '@/util/util';
import { useTagStore } from '@/stores/tags';

const { file } = defineProps<{
    file: FileData
}>()

const fileStore = useFileStore();
const tagStore = useTagStore();

function submit() {

}
</script>

<template>
    <FormWrapper @submitted="submit()" @cancelled="$emit('cancelled')">
        <template v-slot:inputs>
            <div class="input-group">
                <label for="filename">Name</label>
                <input type="text" name="filename" :placeholder="file.name || 'Insert name'">
            </div>
            <div class="input-group" v-if="isImage(file)">
                <label for="alt">Alt text</label>
                <input type="text" name="alt" :placeholder="file.alt || 'Insert alt'">
            </div>
            <div class="input-group">
                <label for="edited">Edited</label>
                <input type="checkbox" name="edited">
            </div>
        </template>
    </FormWrapper>
</template>

<style scoped lang="scss">
.inputs {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: $el-dbl;

    &>* {
        width: 100%;
        justify-self: start;
    }
}
</style>
