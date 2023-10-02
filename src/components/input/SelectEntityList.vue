<script setup lang="ts">
import SearchComp from '@/components/input/SearchComp.vue';
import IconPlusSolid from '@/components/icons/IconPlusSolid.vue';
import IconMinusSolid from '@/components/icons/IconMinusSolid.vue';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
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
    show_deleted?: boolean
}>()

const { entityType, selected_ids, exclude_ids, show_deleted } = toRefs(props)

const search = ref('')
const showMore = ref(false)

const allEntities = computed(() => show_deleted.value ? entityUtil.all(entityType.value) : entityUtil.deleted(entityType.value, false))
const deselectedEntities = computed(() => {
    return allEntities.value
        .filter((e: Entry) => !selected_ids.value.includes(e.id) && (exclude_ids?.value == undefined || !exclude_ids.value.includes(e.id)) && (search.value == '' || e.name.includes(search.value) || e.id.includes(search.value)))
        .sort((a: Entry, b: Entry) => b.date_added.getTime() - a.date_added.getTime())
        .map((ent: Entry) => ({ entity: ent, hovering: ref(false) }))
})
const selectedEntities = computed(() => selected_ids.value.map(id => ({ entity: entityUtil.byId(entityType.value, id), hovering: ref(false) })))

const setSearch = (val: string) => search.value = val
const select = (id: string) => selected_ids.value.push(id)
const deselect = (id: string) => selected_ids.value.splice(selected_ids.value.indexOf(id), 1)

</script>

<template>
    <!--fieldset :class="entityType.name + '-select-comp select-comp comp'">
    <legend>{{ pluralName(entityType.display_name) }}</legend-->
    <Transition name="fade">
        <div v-if="selectedEntities.length > 0" class="box2">
            <span>{{ selectedEntities.length + ' ' + pluralName(entityType.display_name) }} Selected</span>
            <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                <div v-for="ent of selectedEntities" :key="ent.entity.id" class="select-item deselect"
                    @mouseenter="ent.hovering.value = true" @mouseleave="ent.hovering.value = false"
                    @click="deselect(ent.entity.id)">
                    <component :is="entityType.name+'-preview-comp'" :[entityType.name]="ent.entity" />
                    <IconMinusSolid v-if="ent.hovering.value" class="toggle-icon" />
                </div>
            </TransitionGroup>
        </div>
    </Transition>
    <div class="box2">
        <ToggleIconPlusMinus @click="showMore = !showMore" :active="!showMore"
            :text="'Add ' + (selectedEntities.length > 0 ? 'more' : pluralName(entityType.display_name))"
            text-minus="Show less" />
        <Transition name="fade">
            <div v-if="showMore">
                <SearchComp @submitted="setSearch" />
                <TransitionGroup name="list" tag="div" :class="[entityType.name + '-list', 'list', 'fl-row-nj']">
                    <template v-if="deselectedEntities.length > 0">
                        <div v-for="ent of deselectedEntities" :key="ent.entity.id" class="select-item select"
                            @mouseenter="ent.hovering.value = true" @mouseleave="ent.hovering.value = false"
                            @click="select(ent.entity.id)">
                            <component :is="entityType.name+'-preview-comp'" :[entityType.name]="ent.entity" />
                            <IconPlusSolid v-if="ent.hovering.value" class="toggle-icon" />
                        </div>
                    </template>
                    <div v-else>No entries :(</div>
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>


<style scoped lang="scss">
.select-item {
    position: relative;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: $c-p-dark;
        opacity: 0;
        transition: $tr-op-def;
    }

    &:hover {
        &::after {
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