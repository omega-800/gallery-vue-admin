<script setup lang="ts">
import { useTagStore } from '@/stores/tags'
import type { Tag } from '@/types/gql/response/Tag'
import TagComp from '@/components/categories/TagComp.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
</script>

<script lang="ts">
const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const showDeleted = ref(false)
function tagsToShow(): Tag[] {
    let tags = showDeleted.value ? tagStore.deleted : tagStore.available;
    return tags.sort((a, b) => b.date_added.getTime() - a.date_added.getTime())
}
</script>

<template>
    <h1>Categories</h1>
    <h2>Tags</h2>
    <div class="file-list fl-col-l">
        <div class="filter">
            <div class="show-deleted named-switch">
                <span>Show deleted</span>
                <label class="switch">
                    <input type="checkbox" @change="showDeleted = !showDeleted">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <TagComp v-for="tag of tagsToShow()" :key="tag.id" :tag="tag" />
    </div>
    <h2>Categories</h2>
</template>

<style scoped lang="scss">
.file-list {
    padding-top: $el-rad;
    gap: $el-rad;
}
</style>
