<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import { getEntityInfo, isEntity, type EntityInfo } from '@/util/entities';
import EntityListView from './EntityListView.vue';
import { reactive, ref } from 'vue';

const { entityType } = defineProps<{
    entityType: EntityInfo
}>()
const type = reactive({ value: Object.assign({}, entityType) as any })

function setType(val: string) {
    if (!isEntity(val)) return;
    const newType = getEntityInfo(val);
    type.value = null;
    Object.assign(type.value, newType)
}
</script>

<template>
    <SearchComp placeholder="Switch to" @submitted="setType" />
    <EntityListView :entity-type="type.value" />
</template>

<style scoped lang="scss"></style>