<script setup lang="ts">
import type { EntityInfo } from '@/util/entities';
import EntityListView from './EntityListView.vue';

const props = defineProps<{
    entityTypes: EntityInfo[],
}>()
</script>

<template>
    <EntityListView v-for="type of entityTypes" :key="type.name" :entity-type="type" />
</template>