<script setup lang="ts">
import TrashIcon from '@/components/icons/IconTrash.vue'
import TrashIconSolid from '@/components/icons/IconTrashSolid.vue'
import PenIcon from '@/components/icons/IconPen.vue'
import PenIconSolid from '@/components/icons/IconPenSolid.vue'
import PopupWrapper from '@/components/helpers/PopupWrapper.vue'
import { ref } from 'vue'
import { deleteOrRestoreEntity } from '@/util/gql/entity'
import FormWrapper from '@/components/helpers/FormWrapper.vue';
import EditBarWrapper from '@/components/edit/EditBarWrapper.vue';

const { entityStore, entityId } = defineProps<{
    entityStore: any,
    entityId: string
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
function setEditMode(edit: boolean) {
    inEditMode.value = showEdit.value = edit;
}
</script>

<template>
    <div :class="[entity.entity_type + '-edit', 'wrapper', 'edit-wrapper']" @mouseenter="showEdit = true"
        @mouseleave="showEdit = false">
        <PopupWrapper :show="inEditMode" @close="setEditMode(false)" :name="'Edit ' + entity.entity_type">
            <!--FormWrapper @submitted="$emit('submitted'); setEditMode(false)" @cancelled="setEditMode(false)" :name="'ID'"
                :description="entity.id">
                <template #inputs>
                    <slot name="form">
                    </slot>
                </template>
            </FormWrapper-->
            <slot name="form">
            </slot>
        </PopupWrapper>
        <EditBarWrapper :show="showEdit">
            <div class="edit hov" @click="inEditMode = !inEditMode">
                <PenIconSolid v-if="inEditMode" />
                <PenIcon v-else />
            </div>
            <div :class="[{ isdeleted: isDel }, 'delete', 'hov']" @click="deleteOrRestore()">
                <TrashIconSolid v-if="isDel" />
                <TrashIcon v-else />
            </div>
            <slot name="options"></slot>
        </EditBarWrapper>
        <slot name="main"></slot>
    </div>
</template>

<style scoped lang="scss">
.isdeleted.delete {
    color: $c-light;
}
</style>
