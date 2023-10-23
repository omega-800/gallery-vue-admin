<script setup lang="ts">
import SearchComp from '@/components/input/SearchComp.vue';
import type { EntityInfo } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { entityUtil } from '@/util/entities'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import SwitchComp from '@/components/input/SwitchComp.vue';
//import CreateCompForm from '@/components/edit/CreateCompForm.vue';
import CompActionForm from '@/components/form/CompActionForm.vue';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
import { ref, computed } from 'vue'

const props = defineProps<{
    entityType: EntityInfo
}>()

const showDeleted = ref(false)
const searchVal = ref('')
const entities = computed(() => searchVal.value == '' ? entityUtil.deleted(props.entityType, showDeleted.value) : entityUtil.deleted(props.entityType, showDeleted.value).filter(e => (e.name && e.name.includes(searchVal.value)) || e.id.includes(searchVal.value)))
const showAdd = ref(false)
const showList = ref(true)
function setSearch(val: string) {
    searchVal.value = val
}
</script>

<template>
    <div :class="entityType.name + '-view list-view view'">
        <h1>{{ pluralName(entityType.display_name) }}</h1>
        <!--CreateCompForm :entity-type="entityType" /-->
        <ToggleIconPlusMinus @click="showAdd = !showAdd" :active="!showAdd" :text="'Create new ' + entityType.display_name"
            text-minus="Show less" />
        <CompActionForm v-if="showAdd" :action="'add'" :entity-type="entityType" />
        <!--FilterComp/-->
        <ToggleIconPlusMinus @click="showList = !showList" :active="!showList"
            :text="'Show ' + pluralName(entityType.display_name)" text-minus="Show less" />
        <template v-if="showList">
            <div class="filter-comp box">
                <SearchComp :placeholder="'Search ' + pluralName(entityType.display_name)" @submitted="setSearch" />
                <SwitchComp text="Show deleted" @altered="showDeleted = !showDeleted" />
            </div>
            <template v-if="entities && entities.length > 0">
                <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-col-s']">
                    <EditCompWrapper v-for="entity of entities" :key="entity.id" :entity-type="entityType"
                        :entity-id="entity.id" />
                </TransitionGroup>
            </template>
            <template v-else>No {{ pluralName(entityType.display_name) }} here :(</template>
        </template>
    </div>
</template>


<style scoped lang="scss">
.filter-comp,
.toggle-icon {
    margin: $el-size 0;
}
</style>