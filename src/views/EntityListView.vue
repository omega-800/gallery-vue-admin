<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo, EntityType } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { getEntityInfo, isEntity, entities } from '@/util/entities'
import { ref, computed, reactive } from 'vue'

const { entityType } = defineProps<{
    entityType: EntityInfo
}>()

let store = entityType.store()
const type = reactive(JSON.parse(JSON.stringify(entityType)))
const showDeleted = ref(false)
const entries: Entry[] = reactive([])
refreshEntries()

function refreshEntries(setDel?: boolean) {
    if (setDel) showDeleted.value = !showDeleted.value;
    let entities = showDeleted.value ? store.deleted : store.available;
    entries.length = 0;
    entries.push(...entities.sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()))
}
function setType(val: string) {
    if (!isEntity(val)) return;
    const newType = getEntityInfo(val);
    store = newType.store();
    Object.assign(type, newType)
    refreshEntries()
}
</script>

<template>
    <div :class="type.name + '-view list-view view'">
        <h1>{{ pluralName(type.display_name) }}</h1>
        <SearchComp @submitted="setType" />
        <!--FilterComp/-->
        <div class="filter">
            <div class="show-deleted named-switch">
                <label class="switch">
                    <input type="checkbox" @change="refreshEntries(true)">
                    <span class="slider round"></span>
                </label>
                <span>Show deleted</span>
            </div>
        </div>
        <TransitionGroup name="list" tag="div" :class="[type.name + '-list', 'list', 'fl-col-s']">
            <component :is="type.name+'-edit-comp'" v-for="entity of entries" :key="entity.id" :[type.name]="entity">
            </component>
        </TransitionGroup>
    </div>
</template>


<style scoped lang="scss"></style>