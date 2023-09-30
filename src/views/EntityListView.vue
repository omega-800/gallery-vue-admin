<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import type { EntityInfo, EntityType } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { entityUtil } from '@/util/entities'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import SwitchComp from '@/components/edit/SwitchComp.vue';
//import CreateCompForm from '@/components/edit/CreateCompForm.vue';
import CompActionForm from '@/components/edit/CompActionForm.vue';
import { ref, computed } from 'vue'

const props = defineProps<{
    entityType: EntityInfo
}>()
console.log(props.entityType)

const showDeleted = ref(false)
const searchVal = ref('')
const entities = computed(() => searchVal.value == '' ? entityUtil.deleted(props.entityType, showDeleted.value) : entityUtil.deleted(props.entityType, showDeleted.value).filter(e => (e.name && e.name.includes(searchVal.value)) || e.id.includes(searchVal.value)))

function setSearch(val: string) {
    searchVal.value = val
}
</script>

<template>
    <div :class="entityType.name + '-view list-view view'">
        <h1>{{ pluralName(entityType.display_name) }}</h1>
        <!--CreateCompForm :entity-type="entityType" /-->
        <CompActionForm :action="'add'" :entity-type="entityType" />
        <!--FilterComp/-->
        <div class="filter-comp box">
            <SearchComp :placeholder="'Search ' + pluralName(entityType.display_name)" @submitted="setSearch" />
            <SwitchComp text="Show deleted" @altered="showDeleted = !showDeleted" />
        </div>
        <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-col-s']">
            <EditCompWrapper v-for="entity of entities" :key="entity.id" :entity-type="entityType" :entity-id="entity.id" />
        </TransitionGroup>
    </div>
</template>


<style scoped lang="scss">
.filter-comp {
    margin: $el-size 0;
}
</style>