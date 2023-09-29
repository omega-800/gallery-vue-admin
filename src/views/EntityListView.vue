<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import type { EntityInfo, EntityType } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { entityUtil } from '@/util/entities'
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import SwitchComp from '@/components/edit/SwitchComp.vue';
//import CreateCompForm from '@/components/edit/CreateCompForm.vue';
import CompActionForm from '@/components/edit/CompActionForm.vue';
import { ref } from 'vue'

const props = defineProps<{
    entityType: EntityInfo
}>()
console.log(props.entityType)

const showDeleted = ref(false)

function setSearch(val: string) {
    console.log(val,)
}
</script>

<template>
    <div :class="entityType.name + '-view list-view view'">
        <h1>{{ pluralName(entityType.display_name) }}</h1>
        <!--CreateCompForm :entity-type="entityType" /-->
        <CompActionForm :action="'add'" :entity-type="entityType" />
        <!--FilterComp/-->
        <div class="filter box">
            <SearchComp :placeholder="'Search ' + pluralName(entityType.display_name)" @submitted="setSearch" />
            <SwitchComp text="Show deleted" @altered="showDeleted = !showDeleted" />
        </div>
        <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-col-s']">
            <EditCompWrapper v-for="entity of entityUtil.deleted(entityType, showDeleted)" :key="entity.id"
                :entity-type="entityType" :entity-id="entity.id" />
        </TransitionGroup>
    </div>
</template>


<style scoped lang="scss"></style>