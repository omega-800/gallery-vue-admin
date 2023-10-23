<script setup lang="ts">
import SearchComp from '@/components/input/SearchComp.vue';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
import SelectEntityList from './SelectEntityList.vue';
import SelectEntityItem from './SelectEntityItem.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { ref, computed, reactive, toRefs } from 'vue'
import { entityUtil } from '@/util/entities'
import type { FormField } from '@/types/Form';

const emit = defineEmits(['altered'])
const props = defineProps<{
    entityType: EntityInfo,
    field: FormField,
    exclude_ids?: string[],
    show_deleted?: boolean
}>()

const { entityType, field, exclude_ids, show_deleted } = toRefs(props)

const search = ref('')
const showMore = ref(false)

const isArr = Array.isArray(field.value.value);
const selected_ids = isArr ? reactive(field.value.value) : ref(field.value.value);
console.log(isArr, field.value.value, selected_ids)

const allEntities = computed(() => show_deleted.value ? entityUtil.all(entityType.value) : entityUtil.deleted(entityType.value, false))
const deselectedEntities = computed(() => allEntities.value
    .filter((e: Entry) => (isArr ? !selected_ids.includes(e.id) : selected_ids.value != e.id) && (exclude_ids?.value == undefined || !exclude_ids.value.includes(e.id)) && (search.value == '' || e.name.includes(search.value) || e.id.includes(search.value)))
    .sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime()))

const selectedEntities = computed(() => isArr ? selected_ids.map((id: string) => entityUtil.byId(entityType.value, id)) : entityUtil.byId(entityType.value, selected_ids.value))

const setSearch = (val: string) => search.value = val
const select = (id: string) => isArr ? selected_ids.push(id) : selected_ids.value = id
const deselect = (id: string) => isArr ? selected_ids.splice(selected_ids.indexOf(id), 1) : selected_ids.value = '';

const addText = computed(() => isArr
    ? 'Add ' + (selectedEntities.value.length > 0 ? 'more' : pluralName(entityType.value.display_name))
    : 'Set ' + entityType.value.display_name)
const selectedText = computed(() => isArr
    ? `${selectedEntities.value.length} ${pluralName(entityType.value.display_name)} selected`
    : selectedEntities.value ? `Selected ${entityType.value.display_name}:` : `No ${entityType.value.display_name} selected`)
</script>

<template>
    <div class="box select-entities-comp">
        <Transition name="fade">
            <div>
                <span class="f-m">{{ selectedText }}<slot>
                    </slot></span>
                <SelectEntityList v-if="isArr" :entity-type="entityType" :entities="selectedEntities"
                    @selected="deselect" />
                <SelectEntityItem v-if="!isArr && selectedEntities" :entity="selectedEntities"
                    :entity-name="entityType.name" :add="false" @click="deselect(selectedEntities.id)" />
            </div>
        </Transition>
        <ToggleIconPlusMinus @click="showMore = !showMore" :active="!showMore" :text="addText" text-minus="Show less"
            class="small darker" />
        <Transition name="fade">
            <div v-if="showMore" class="darker">
                <SearchComp @submitted="setSearch" />
                <SelectEntityList :entity-type="entityType" :entities="deselectedEntities" :add="true" @selected="select" />
            </div>
        </Transition>
    </div>
</template>


<style scoped lang="scss">
.select-entities-comp {
    margin: $el-rad;
}

.darker {
    background-color: $c-p-light;
}
</style>