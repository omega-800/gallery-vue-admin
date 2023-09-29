<script setup lang="ts">
import SearchComp from '@/components/filter/SearchComp.vue';
import ToggleIconPlus from '@/components/icons/toggle/ToggleIconPlus.vue';
import ToggleIconMinus from '@/components/icons/toggle/ToggleIconMinus.vue';
import type { Entry } from '@/types/gql/response/Entry';
import type { EntityInfo } from '@/util/entities';
import { pluralName } from '@/util/gql/request';
import { ref, computed, reactive } from 'vue'
import { entityUtil } from '@/util/entities'

const emit = defineEmits(['altered'])
const { entityType, selected_ids, exclude_ids, show_deleted } = defineProps<{
    entityType: EntityInfo,
    selected_ids?: string[],
    exclude_ids?: string[],
    show_deleted?: boolean
}>()

const search = ref('')
const selected: string[] = reactive(JSON.parse(JSON.stringify(selected_ids)) || [])
const showMore = ref(false)
const allEntities = computed(() => show_deleted ? entityUtil.all(entityType) : entityUtil.deleted(entityType, false))
const deselectedEntities = computed(() => {
    return allEntities.value
        .filter(e => !selected.includes(e.id) && (exclude_ids == undefined || !exclude_ids.includes(e.id)) && (search.value == '' || e.name.includes(search.value)))
        .sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime())
        .map(ent => ({ entity: ent, hovering: ref(false) }))
})
const selectedEntities = computed(() => {
    return selected.map(id => ({ entity: entityUtil.byId(entityType, id), hovering: ref(false) }))
})
function setSearch(val: string) {
    search.value = val
}
function select(id: string) {
    selected.push(id)
    emit('altered', selected)
}
function deselect(id: string) {
    selected.splice(selected.indexOf(id), 1)
    emit('altered', selected)
}
</script>

<template>
    <fieldset :class="entityType.name + '-select-comp select-comp comp'">
        <legend>{{ pluralName(entityType.display_name) }}</legend>
        <Transition name="fade">
            <div v-if="selectedEntities.length > 0" class="box2">
                <span>{{ selectedEntities.length + ' ' + pluralName(entityType.display_name) }} Selected</span>
                <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                    <div v-for="ent of selectedEntities" :key="ent.entity.id" class="select-item deselect"
                        @mouseenter="ent.hovering.value = true" @mouseleave="ent.hovering.value = false"
                        @click="deselect(ent.entity.id)">
                        <!--EditBarWrapper :show="ent.hovering.value">
                    <MinusIcon :class="['delete', 'hov']" @click="deselect(ent.entity.id)" />
                </EditBarWrapper-->
                        <component :is="entityType.name+'-preview-comp'" :[entityType.name]="ent.entity" />
                        <ToggleIconMinus v-if="ent.hovering.value" :active="true" :label="false" />
                    </div>
                </TransitionGroup>
            </div>
        </Transition>
        <div class="box2">
            <ToggleIconPlus @click="showMore = !showMore" :active="!showMore"
                :text="'Add ' + (selectedEntities.length > 0 ? 'more' : pluralName(entityType.display_name))" />
            <Transition name="fade">
                <div v-if="showMore">
                    <SearchComp @submitted="setSearch" />

                    <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                        <div v-for="ent of deselectedEntities" :key="ent.entity.id" class="select-item select"
                            @mouseenter="ent.hovering.value = true" @mouseleave="ent.hovering.value = false"
                            @click="select(ent.entity.id)">
                            <component :is="entityType.name+'-preview-comp'" :[entityType.name]="ent.entity" />
                            <ToggleIconPlus v-if="ent.hovering.value" :active="true" :label="false" />
                        </div>

                    </TransitionGroup>
                </div>
            </Transition>
        </div>
    </fieldset>
</template>


<style scoped lang="scss">
.select-item {
    position: relative;
    cursor: pointer;

    &:hover {


        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: $c-p-dark;
            opacity: $op-h;
        }

        & .toggle-icon {
            position: absolute;
            top: calc(50% - $el-size);
            left: calc(50% - $el-size);
            z-index: $z-h;
        }

        &.deselect .toggle-icon {
            color: $c-s-dark;
        }

        &.select .toggle-icon {
            color: $c-p-light;
        }
    }
}
</style>