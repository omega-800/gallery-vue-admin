<script setup lang="ts">
import PopupWrapper from '@/components/helpers/PopupWrapper.vue'
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import { ref } from 'vue'
import { deleteOrRestoreEntity, setFavorite } from '@/util/gql/entity'
import EditBarWrapper from '@/components/helpers/EditBarWrapper.vue';
import CompActionForm from '@/components/form/CompActionForm.vue';
import { isImage, isVideo } from '@/util/util'
import { type EntityInfo } from '@/util/entities'
import ToggleIconPen from '@/components/icons/toggle/ToggleIconPen.vue'
import ToggleIconTrash from '@/components/icons/toggle/ToggleIconTrash.vue'
import ToggleIconStar from '@/components/icons/toggle/ToggleIconStar.vue'

const { entityType, entityId } = defineProps<{
    entityType: EntityInfo,
    entityId: string
}>()

const entityStore = entityType.store()
const entity = entityStore.byId(entityId)
let isDel = ref(!!entity.date_deleted)
let inEditMode = ref(false);
let showEdit = ref(false)
let isLoading = ref(false);
let isFav = ref(!!entity.favorite)

async function setFav() {
    isFav.value = !entity.favorite;
    try {
        let dateUpdated = await setFavorite(isImage(entity) ? 'image' : isVideo(entity) ? 'video' : entityType.name, entity.id, isFav.value);
        entityStore.updateProperty(entity.id, 'date_updated', dateUpdated)
        entityStore.updateProperty(entity.id, 'favorite', isFav.value)
    } catch (err) {
        alert(err)
        isFav.value = !isFav.value
    }
}

async function deleteOrRestore() {
    isDel.value = !entity.date_deleted;
    isLoading.value = true;
    try {
        let { updated, deleted } = await deleteOrRestoreEntity(entity.entity_type, entityId, isDel.value);
        entityStore.updateProperty(entityId, 'date_deleted', deleted)
        entityStore.updateProperty(entityId, 'date_updated', updated)
    } catch (err) {
        alert(err)
        isDel.value = !isDel.value
    }
    isLoading.value = false;
}

function setEditMode(edit: boolean) {
    inEditMode.value = showEdit.value = edit;
}
</script>

<template>
    <div :class="[entity.entity_type + '-edit', 'wrapper', 'edit-wrapper']" @mouseenter="showEdit = true"
        @mouseleave="showEdit = false">
        <LoadingComp v-if="isLoading" />
        <PopupWrapper :show="inEditMode" @close="setEditMode(false)" :name="'Edit ' + entity.entity_type">
            <CompActionForm :action="'edit'" :entity-type="entityType" :entity-id="entity.id" @success="setEditMode(false)"
                @cancelled="setEditMode(false)" />
        </PopupWrapper>
        <EditBarWrapper :show="showEdit">
            <ToggleIconPen :active="inEditMode" :label="false" @click="inEditMode = !inEditMode" />
            <ToggleIconStar :active="!!entity.favorite" :label="false" :isfav="!!entity.favorite" @click="setFav()" />
            <ToggleIconTrash :active="isDel" :label="false" :isdel="isDel" @click="deleteOrRestore()" />
        </EditBarWrapper>
        <component :is="entityType.name+'-comp'" :[entityType.name]="entity" />
    </div>
</template>

<style scoped lang="scss"></style>
