<script setup lang="ts">
import { useTagStore } from '@/stores/tags'
import type { Tag } from '@/types/gql/response/Tag'
import { getEntityInfo } from '@/util/entities'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import EditForm from '@/components/edit/EditForm.vue';
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { addTag } from '@/util/gql/tag';
</script>

<script lang="ts">
const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)
let isLoading = ref(false);

const showDeleted = ref(false)
let fields = tagStore.fields()
function tagsToShow(): Tag[] {
    let tags = showDeleted.value ? tagStore.deleted : tagStore.available;
    return tags.sort((a, b) => b.date_added.getTime() - a.date_added.getTime())
}

async function submitNew(data: any) {
    isLoading.value = true;
    try {
        let newData = await addTag(data);
        tagStore.add(newData)
        fields = tagStore.fields()
    } catch (err) {
        alert(err)
        console.error(err)
    }
    isLoading.value = false;
}
</script>

<template>
    <h1>Categories</h1>
    <h2>Tags</h2>
    <LoadingComp v-if="isLoading" />
    <EditForm :fields="fields" @submitted="submitNew" />
    <div class="filter">
        <div class="show-deleted named-switch">
            <span>Show deleted</span>
            <label class="switch">
                <input type="checkbox" @change="showDeleted = !showDeleted">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    <TransitionGroup name="list" tag="div" class="tag-list fl-col-s">
        <EditCompWrapper v-for="tag of tagsToShow()" :key="tag.id" :entity-type="getEntityInfo('tag')"
            :entity-id="tag.id" />
    </TransitionGroup>
    <h2>Categories</h2>
</template>

<style scoped lang="scss">
.tag-list {
    padding-top: $el-rad;
    gap: $el-rad;
}
</style>
