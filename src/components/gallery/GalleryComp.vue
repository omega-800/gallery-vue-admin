<script setup lang="ts">
import type { Gallery } from '@/types/gql/response/Gallery'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import FileDisplay from '@/components/file/FileDisplay.vue'
import { useFileStore } from '@/stores/files'
import { ref, computed, reactive, toRefs, watch } from 'vue'

const props = defineProps<{
    gallery: Gallery,
}>()

const { gallery } = toRefs(props)
const fileStore = useFileStore()

const mapFiles = (ids: string[]) => fileStore.byIds(ids).map((file, i) => ({ file: file, selected: i == 0, index: i })).sort((a, b) => b.index - a.index)
let items = reactive(mapFiles(gallery.value.file_ids))

const selected = computed(() => items.find(i => i.selected)!)
const deselected = computed(() => items.filter(i => !i.selected))

const select = (index: number) => items.map(i => i.selected = i.index == index);

watch(gallery, (newValue: any, oldValue: any) => {
    items.length = 0;
    Object.assign(items, mapFiles(newValue.file_ids))
}, { deep: true })

</script>

<template>
    <CompWrapper :entity="gallery" :class="['fl-col-c', 'box']">
        <p class="main-name f-l">{{ gallery.name }}</p>
        <p v-if="gallery.description" class="description f-m">{{ gallery.description }}</p>
        <FileDisplay v-if="selected?.file" :file="selected.file" />
        <div v-if="deselected && deselected.length > 0" class="items fl-row">
            <div v-for="item of deselected" :key="item.file.id" @click="select(item.index)" class="thmb-container">
                <FileDisplay :file="item.file" :thumbnail="true" />
            </div>
        </div>
        <!--div class="items fl-row">
            <FileDisplay v-for="item of items" :key="item.file.id" :file="item.file" :thumbnail="!item.selected"
                @click="select(item.index)" :class="{ selected: item.selected }" />
        </div -->
    </CompWrapper>
</template>

<style scoped lang="scss">
.gallery-comp {
    & .items {
        //position: relative;

        & .thmb-container {
            cursor: pointer;
            width: $el-tpl;
            height: $el-tpl;
        }

        /*
        & .selected {
            position: absolute;
            top: 100%;
        }*/
    }
}
</style>
