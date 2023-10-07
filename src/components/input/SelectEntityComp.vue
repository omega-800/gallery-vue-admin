<script setup lang="ts">
import SearchComp from '@/components/input/SearchComp.vue';
import SelectEntityItem from '@/components/helpers/SelectEntityItem.vue';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
import SelectEntityList from '../helpers/SelectEntityList.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import { ref, computed, reactive, toRefs } from 'vue'
import { entityUtil } from '@/util/entities'

const emit = defineEmits(['selected', 'deselected'])
const props = defineProps<{
    entityType: EntityInfo,
    selected_id?: string,
    exclude_ids?: string[],
    show_deleted?: boolean,
}>()

const { entityType, selected_id, exclude_ids, show_deleted } = toRefs(props)

const search = ref('')
const showMore = ref(false)

let selected = ref(selected_id?.value ? selected_id.value : '');

const allEntities = computed(() => show_deleted.value ? entityUtil.all(entityType.value) : entityUtil.deleted(entityType.value, false))
const deselectedEntities = computed(() => allEntities.value
    .filter((e: Entry) => selected.value != e.id && (exclude_ids?.value == undefined || !exclude_ids.value.includes(e.id)) && (search.value == '' || e.name.includes(search.value) || e.id.includes(search.value)))
    .sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()))

const setSearch = (val: string) => search.value = val
function select(id: string) {
    selected.value = id;
    emit('selected', id)
}
function deselect() {
    selected.value = ''
    emit('deselected')
}
</script>

<template>
    <!--fieldset :class="entityType.name + '-select-comp select-comp comp'">
    <legend>{{ pluralName(entityType.display_name) }}</legend-->
    <Transition name="fade">
        <div class="box2">
            <span>Selected {{ entityType.display_name }}</span>
            <SelectEntityItem v-if="selected != ''" :entity="entityUtil.byId(entityType, selected)"
                :entity-name="entityType.name" :add="false" @click="deselect()" />
        </div>
    </Transition>
    <div class="box2">
        <ToggleIconPlusMinus @click="showMore = !showMore" :active="!showMore" :text="'Add ' + entityType.display_name"
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