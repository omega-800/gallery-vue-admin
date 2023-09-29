<script setup lang="ts">
import TrashIcon from '@/components/icons/IconTrash.vue'
import TrashIconSolid from '@/components/icons/IconTrashSolid.vue'
import PenIcon from '@/components/icons/IconPen.vue'
import PenIconSolid from '@/components/icons/IconPenSolid.vue'
import PopupWrapper from '@/components/helpers/PopupWrapper.vue'
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import { ref } from 'vue'
import { deleteOrRestoreEntity, setFavorite } from '@/util/gql/entity'
import EditBarWrapper from '@/components/edit/EditBarWrapper.vue';
import EditForm from '@/components/edit/EditForm.vue';
import { alterEntity } from '@/util/gql/entity'
import { isImage, isVideo } from '@/util/util'
import { entities, type EntityInfo } from '@/util/entities'
import StarIcon from '@/components/icons/IconStar.vue'
import StarIconSolid from '@/components/icons/IconStarSolid.vue'

const { entityType, entityId } = defineProps<{
    entityType: EntityInfo,
    entityId: string
}>()
console.log(entityType)
const entityStore = entityType.store()
const entity = entityStore.byId(entityId)
const fields = entityStore.fields(entityId)
let isDel = ref(!!entity.date_deleted)
let inEditMode = ref(false);
let showEdit = ref(false)
let isLoading = ref(false);
let isFav = ref(entity.favorite)

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

async function submitEdited(data: any) {
    isLoading.value = true;
    try {
        let newData = await alterEntity(isImage(entity) ? 'image' : isVideo(entity) ? 'video' : entityType.name, { ...data, id: entity.id });
        entityStore.updateProperties(entity.id, newData)
        setEditMode(false)
    } catch (err) {
        alert(err)
        console.error(err)
    }
    isLoading.value = false;
}
</script>

<template>
    <div :class="[entity.entity_type + '-edit', 'wrapper', 'edit-wrapper']" @mouseenter="showEdit = true"
        @mouseleave="showEdit = false">
        <LoadingComp v-if="isLoading" />
        <PopupWrapper :show="inEditMode" @close="setEditMode(false)" :name="'Edit ' + entity.entity_type">
            <EditForm :fields="fields" @submitted="submitEdited" />
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
            <div :class="[{ isfavorite: entity.favorite }, 'favorite hov']" @click="setFav()">
                <StarIconSolid v-if="entity.favorite" />
                <StarIcon v-else />
            </div>
        </EditBarWrapper>
        <component :is="entityType.name+'-comp'" :[entityType.name]="entity" />
    </div>
</template>

<style scoped lang="scss">
.isdeleted.delete {
    color: $c-light;
}

.isfavorite.favorite {
    color: $c-s-light;
}
</style>
