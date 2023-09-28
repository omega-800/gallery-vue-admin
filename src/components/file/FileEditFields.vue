<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useFileStore } from '@/stores/files';
import type { FileData } from '@/types/gql/response/File';
import { isImage, isVideo } from '@/util/util';
import { useTagStore } from '@/stores/tags';
import { alterFile } from '@/util/gql/file';

const emit = defineEmits(['changed'])
const { file } = defineProps<{
    file: FileData
}>()

const input: any = {
    name: file.name,
    edited: file.edited,
    //tag_ids: file.tag_ids,
    /* galleries: Gallery[];
    shop_items?: ShopItem[] | null */
}

if (isImage(file)) input.alt = file.alt

</script>

<template>
    <fieldset>
        <legend>File properties</legend>
        <div class="input-group">
            <label for="filename">Name</label>
            <input type="text" name="filename" :placeholder="file.name || 'Insert name'" v-model="input.name"
                @change="emit('changed', input)">
        </div>
        <div class="input-group" v-if="isImage(file)">
            <label for="alt">Alt text</label>
            <input type="text" name="alt" :placeholder="file.alt || 'Insert alt'" v-model="input.alt"
                @change="emit('changed', input)">
        </div>
        <div class="input-group">
            <label for="edited">Edited</label>
            <input type="checkbox" name="edited" v-model="input.edited" @change="emit('changed', input)">
        </div>
    </fieldset>
</template>

<style scoped lang="scss"></style>
