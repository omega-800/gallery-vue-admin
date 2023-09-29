<script setup lang="ts">
import { type EntityInfo, type EntityType } from '@/util/entities'
import EntityFormFields from '@/components/edit/EntityFormFields.vue';
import FormWrapper from '@/components/edit/FormWrapper.vue';
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import FileUpload from '@/components/file/FileUpload.vue'
import { computed, reactive, ref } from 'vue'
import { addEntity, alterEntity } from '@/util/gql/entity';
import { isImage, isVideo } from '@/util/util';

const emit = defineEmits(['success'])

const { entityType, action, entityId } = defineProps<{
    entityType: EntityInfo,
    action: 'add' | 'edit',
    entityId?: string
}>()

const isEdit = !!entityId && action == 'edit';
let isLoading = ref(false);
const store = entityType.store();

let fields = reactive(JSON.parse(JSON.stringify(store.fields(entityId))))
let filledFields = JSON.parse(JSON.stringify(fields))
let hasInput = ref(false)

const handleChange = (data: any) => {
    filledFields = data;
    hasInput.value = JSON.stringify(filledFields) != '{}' && Object.keys(filledFields).some((k) => (filledFields[k]?.length || typeof filledFields[k] == 'boolean') && filledFields[k] !== fields[k]);
}
const handleCancel = () => filledFields = JSON.parse(JSON.stringify(fields))
const handleSubmit = () => isEdit ? submitEdited(filledFields) : submitNew(filledFields)

async function submitNew(data: any) {
    isLoading.value = true;
    try {
        // no check needed (image / file) because those are created via upload
        let newData = await addEntity(entityType.name, data);
        store.add(newData)
        fields = store.fields()
        emit('success')
    } catch (err) {
        alert(err)
        console.error(err)
    }
    isLoading.value = false;
}

async function submitEdited(data: any) {
    isLoading.value = true;
    try {
        const entity = store.byId(entityId);
        let newData = await alterEntity(isImage(entity) ? 'image' : isVideo(entity) ? 'video' : entityType.name, { ...data, id: entity.id });
        store.updateProperties(entityId, newData)
        emit('success')
    } catch (err) {
        alert(err)
        console.error(err)
    }
    isLoading.value = false;
}
</script>

<template>
    <LoadingComp v-if="isLoading" />
    <FileUpload v-if="entityType.name as string == 'file' && !isEdit" />
    <FormWrapper v-else :name="(isEdit ? 'Edit ' : 'Create new ') + entityType.display_name" @submitted="handleSubmit"
        @cancelled="handleCancel" :has-input="hasInput">
        <EntityFormFields :fields="fields" @altered="handleChange" />
    </FormWrapper>
</template>

<style scoped lang="scss"></style>
