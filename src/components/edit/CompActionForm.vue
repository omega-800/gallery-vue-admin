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
const isLoading = ref(false);
const store = entityType.store();
const err: { msg: string } = reactive({ msg: '' })

let initialFields = JSON.parse(JSON.stringify(store.fields(entityId)))
let fields = reactive(JSON.parse(JSON.stringify(store.fields(entityId))))

let hasInput = computed(() => JSON.stringify(fields) != '{}' && Object.keys(fields).some((k) => (fields[k]?.length || typeof fields[k] == 'boolean') && fields[k] !== initialFields[k]))

//const handleChange = (data: any) => ()

const reset = () => Object.assign(fields, JSON.parse(JSON.stringify(initialFields)))
const handleSubmit = () => isEdit ? submitEdited() : submitNew()

async function submitNew() {
    isLoading.value = true;
    try {
        // no check needed (image / file) because those are created via upload
        let newData = await addEntity(entityType.name, fields);
        store.add(newData)
        reset();
        emit('success')
    } catch (err: any) {
        console.error(err)
        alert(err)
        err.msg = JSON.stringify(err)
    }
    isLoading.value = false;
}

async function submitEdited() {
    isLoading.value = true;
    try {
        const entity = store.byId(entityId);
        let newData = await alterEntity(isImage(entity) ? 'image' : isVideo(entity) ? 'video' : entityType.name, { ...fields, id: entity.id });
        store.updateProperties(entityId, newData)
        emit('success')
    } catch (err: any) {
        console.error(err)
        alert(err)
        err.msg = JSON.stringify(err)
    }
    isLoading.value = false;
}
</script>

<template>
    <pre v-if="err.msg != ''">ERROR: {{ err.msg }}</pre>
    <LoadingComp v-if="isLoading" />
    <FileUpload v-if="entityType.name as string == 'file' && !isEdit" />
    <FormWrapper v-else :name="(isEdit ? 'Edit ' : 'Create new ') + entityType.display_name" @submitted="handleSubmit"
        @cancelled="reset" :has-input="hasInput">
        <EntityFormFields :fields="fields" />
    </FormWrapper>
</template>

<style scoped lang="scss"></style>
