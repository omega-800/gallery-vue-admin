<script setup lang="ts">
import TrashIcon from '@/components/icons/IconTrash.vue'
import TrashIconSolid from '@/components/icons/IconTrashSolid.vue'
import PenIcon from '@/components/icons/IconPen.vue'
import PenIconSolid from '@/components/icons/IconPenSolid.vue'
import PopupWrapper from '@/components/helpers/PopupWrapper.vue'
import { ref } from 'vue'
import { deleteOrRestoreEntity } from '@/util/gql/entity'

const { entityStore, entityId } = defineProps<{
    entityStore: any,
    entityId: string,
    classes?: string[]
}>()

const entity = entityStore.byId(entityId)
let isDel = ref(!!entity.date_deleted)
let inEditMode = ref(false);
let showEdit = ref(false)

async function deleteOrRestore() {
    isDel.value = !entity.date_deleted;
    try {
        let { updated, deleted } = await deleteOrRestoreEntity(entity.entity_type, entityId, isDel.value);
        entityStore.updateProperty(entityId, 'date_deleted', deleted)
        entityStore.updateProperty(entityId, 'date_updated', updated)
    } catch (err) {
        alert(err)
        isDel.value = !isDel.value
    }
}
</script>

<template>
    <div :class="[{ isfavorite: !!entity.favorite, isdeleted: isDel }, entity.entity_type + '-comp', 'comp', ...classes]"
        @mouseenter="showEdit = true" @mouseleave="showEdit = false">
        <PopupWrapper v-if="inEditMode" @close="inEditMode = showEdit = false" :name="'Edit ' + entity.entity_type"
            :description="'ID: ' + entity.id">
            <slot name="form"></slot>
        </PopupWrapper>
        <div v-if="showEdit" class="editbar-comp comp fl-row">
            <div class="edit hov" @click="inEditMode = !inEditMode">
                <PenIconSolid v-if="inEditMode" />
                <PenIcon v-else />
            </div>
            <div :class="[{ isdeleted: isDel }, 'delete', 'hov']" @click="deleteOrRestore()">
                <TrashIconSolid v-if="isDel" />
                <TrashIcon v-else />
            </div>
            <slot name="options"></slot>
        </div>
        <slot name="main"></slot>
    </div>
</template>

<style scoped lang="scss">
.editbar-comp {
    position: absolute;
    bottom: 100%;
    right: 0;
    background-color: $c-p-dark;
    flex-wrap: nowrap;

    & .isdeleted.delete {
        color: $c-light;
    }
}
</style>
