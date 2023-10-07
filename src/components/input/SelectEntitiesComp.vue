<script setup lang="ts">
import SearchComp from '@/components/input/SearchComp.vue';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
import SelectEntityList from '../helpers/SelectEntityList.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { ref, computed, reactive, toRefs } from 'vue'
import { entityUtil } from '@/util/entities'

const emit = defineEmits(['altered'])
const props = defineProps<{
    entityType: EntityInfo,
    selected_ids: string[],
    exclude_ids?: string[],
    show_deleted?: boolean,
}>()

const { entityType, selected_ids, exclude_ids, show_deleted } = toRefs(props)

const search = ref('')
const showMore = ref(false)

const allEntities = computed(() => show_deleted.value ? entityUtil.all(entityType.value) : entityUtil.deleted(entityType.value, false))
const deselectedEntities = computed(() => allEntities.value
    .filter((e: Entry) => !selected_ids.value.includes(e.id) && (exclude_ids?.value == undefined || !exclude_ids.value.includes(e.id)) && (search.value == '' || e.name.includes(search.value) || e.id.includes(search.value)))
    .sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()))
const selectedEntities = computed(() => selected_ids.value.map(id => entityUtil.byId(entityType.value, id)))

const setSearch = (val: string) => search.value = val
const select = (id: string) => selected_ids.value.push(id)
const deselect = (id: string) => selected_ids.value.splice(selected_ids.value.indexOf(id), 1)
</script>

<template>
    <!--fieldset :class="entityType.name + '-select-comp select-comp comp'">
    <legend>{{ pluralName(entityType.display_name) }}</legend-->
    <Transition name="fade">
        <div class="box2">
            <span>{{ selectedEntities.length + ' ' + pluralName(entityType.display_name) }} Selected</span>
            <SelectEntityList :entity-type="entityType" :entities="selectedEntities" @selected="deselect" />
        </div>
    </Transition>
    <div class="box2">
        <ToggleIconPlusMinus @click="showMore = !showMore" :active="!showMore"
            :text="'Add ' + (selectedEntities.length > 0 ? 'more' : pluralName(entityType.display_name))"
            text-minus="Show less" />
        <Transition name="fade">
            <div v-if="showMore">
                <SearchComp @submitted="setSearch" />
                <SelectEntityList :entity-type="entityType" :entities="deselectedEntities" :add="true" @selected="select" />
            </div>
        </Transition>
    </div>
</template>


<style scoped lang="scss"></style>