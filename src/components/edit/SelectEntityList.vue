<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import MinusIcon from '@/components/icons/IconMinus.vue';
import PlusIcon from '@/components/icons/IconPlus.vue';
import PlusIconSolid from '@/components/icons/IconPlusSolid.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { getEntityInfo, isEntity, entities } from '@/util/entities'
import EditBarWrapper from '@/components/edit/EditBarWrapper.vue';
import { ref, computed, reactive } from 'vue'

const emit = defineEmits(['changed'])
const { entityType, selected_ids, exclude_ids, show_deleted } = defineProps<{
    entityType: EntityInfo,
    selected_ids?: string[],
    exclude_ids?: string[],
    show_deleted?: boolean
}>()

let store = entityType.store()
const search = ref('')
const selected: string[] = reactive(JSON.parse(JSON.stringify(selected_ids)) || [])
const showMore = ref(false)

const allEntities = computed(() => {
    const ents = show_deleted ? store[pluralName(entityType.name)] : store.available;
    return ents.filter(e => !selected.includes(e.id) && (exclude_ids == undefined || !exclude_ids.includes(e.id)) && (search.value == '' || e.name.includes(search.value))).sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime())
})
const selectedEntities = computed(() => {
    return selected.map(id => ({ entity: store.byId(id), hovering: ref(false) }))
})
function setSearch(val: string) {
    search.value = val
}
function select(id: string) {
    selected.push(id)
    emit('changed', selected)
}
function deselect(id: string) {
    selected.splice(selected.indexOf(id), 1)
    emit('changed', selected)
}
</script>

<template>
    <fieldset :class="entityType.name + '-select-comp select-comp comp'">
        <legend>{{ pluralName(entityType.display_name) }}</legend>
        <Transition name="fade">
            <div v-if="selectedEntities.length > 0" class="box2">
                <span>Selected</span>
                <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                    <div v-for="ent of selectedEntities" :key="ent.entity.id" class="select-item"
                        @mouseenter="ent.hovering.value = true" @mouseleave="ent.hovering.value = false">
                        <!--EditBarWrapper :show="ent.hovering.value">
                    <MinusIcon :class="['delete', 'hov']" @click="deselect(ent.entity.id)" />
                </EditBarWrapper-->
                        <component :is="entityType.name+'-preview-comp'" :[entityType.name]="ent.entity"
                            @click="deselect(ent.entity.id)" />
                    </div>
                </TransitionGroup>
            </div>
        </Transition>
        <div class="box2">
            <div class="show-more hov named-btn" @click="showMore = !showMore">
                <PlusIconSolid v-if="showMore" />
                <PlusIcon v-else />
                <span>Add {{ selectedEntities.length > 0 ? 'more' : pluralName(entityType.display_name) }}</span>
            </div>
            <Transition name="fade">
                <div v-if="showMore">
                    <SearchComp @submitted="setSearch" />

                    <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                        <component :is="entityType.name+'-preview-comp'" v-for="entity of allEntities" :key="entity.id"
                            :[entityType.name]="entity" @click="select(entity.id)" />
                    </TransitionGroup>
                </div>
            </Transition>
        </div>
    </fieldset>
</template>


<style scoped lang="scss">
.select-item {
    position: relative;
}
</style>