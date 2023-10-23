<script setup lang="ts">
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import SelectEntityItem from './SelectEntityItem.vue';

const emit = defineEmits(['selected'])
const props = defineProps<{
    entityType: EntityInfo,
    entities: Entry[],
    add?: boolean
}>()
</script>

<template>
    <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-j']">
        <template v-if="entities.length > 0">
            <SelectEntityItem v-for="entity of entities" :key="entity.id" :entity="entity" :entity-name="entityType.name"
                :add="add" @click="$emit('selected', entity.id)" />
        </template>
        <div v-if="entities.length == 0 && add">No entries :(</div>
    </TransitionGroup>
</template>
