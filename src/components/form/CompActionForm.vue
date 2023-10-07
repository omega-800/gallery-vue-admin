<script setup lang="ts">
import { type EntityInfo, type EntityType, isEntity, getEntityInfo } from '@/util/entities'
import FormWrapper from '@/components/form/FormWrapper.vue';
import LoadingComp from '@/components/helpers/LoadingComp.vue'
import FileUpload from '@/components/file/FileUpload.vue'
import { computed, reactive, ref } from 'vue'
import { addEntity, alterEntity } from '@/util/gql/entity';
import { deepCopy, isImage, isValid, isNotEmpty, isVideo } from '@/util/util';
import type { FormField, FormFields } from '@/types/Form';
import SelectEntitiesComp from '@/components/input/SelectEntitiesComp.vue';
import SelectEntityComp from '@/components/input/SelectEntityComp.vue';
import InputComp from '../input/InputComp.vue';
import ValidationTooltip from '../input/ValidationTooltip.vue';

const emit = defineEmits(['success', 'cancelled'])

const { entityType, action, entityId } = defineProps<{
    entityType: EntityInfo,
    action: 'add' | 'edit',
    entityId?: string
}>()

const store = entityType.store();
const isEdit = !!entityId && action == 'edit';
const isLoading = ref(false);
const err: { msg: string } = reactive({ msg: '' })

let initialFields: FormFields = deepCopy(store.fields(entityId))
let fields: FormFields = reactive(deepCopy(initialFields))

const hasInput = computed(() => Object.keys(fields).some((k) => isValid(initialFields[k].value, fields[k].value)))

const isCorrect = (): boolean => !Object.values(fields).some(field => (!field.nullable && !isNotEmpty(field.value)) || (field.unique && isDuplicate(field.value)) || (!!field.dependsOn && !depSatisfied(field)))
const isDuplicate = (val: any) => store.doesExist(val)
const depSatisfied = (val: FormField) => val.value.length > 0 || Object.keys(fields).some(k => fields[k].name == val.dependsOn && fields[k].value.length > 0)

const isSelectEntities = (key: any): boolean => key.endsWith('_ids') && isEntity(key.slice(0, -4))
const getEntitiesKey = (key: any): EntityType => key.slice(0, -4) as EntityType

const isSelectEntity = (key: any): boolean => key.endsWith('_id') && isEntity(key.slice(0, -3))
const getEntityKey = (key: any): EntityType => key.slice(0, -3) as EntityType

const reset = () => Object.assign(fields, deepCopy(initialFields))
const handleSubmit = () => isEdit ? submitEdited(fieldsToData()) : submitNew(fieldsToData())

function fieldsToData(): { [key: string]: any } {
    const data: { [key: string]: any } = {}
    Object.keys(fields).forEach(key => data[key] = fields[key].value)
    return data
}

async function submitNew(data: { [key: string]: any }) {
    isLoading.value = true;
    // no check needed (image / file) because those are created via upload
    addEntity(entityType.name, data)
        .then(newData => {
            store.add(newData)
            reset();
            emit('success')
        })
        .catch(err => handleError(err))
        .finally(() => isLoading.value = false);
}

async function submitEdited(data: { [key: string]: any }) {
    isLoading.value = true;
    const entity = store.byId(entityId);
    alterEntity(isImage(entity) ? 'image' : isVideo(entity) ? 'video' : entityType.name, { ...data, id: entity.id })
        .then(newData => {
            store.updateProperties(entityId, newData)
            emit('success')
        })
        .catch(err => handleError(err))
        .finally(() => isLoading.value = false);
}

function handleError(err: any) {
    console.error(err)
    alert(err)
    err.msg = JSON.stringify(err)
}
</script>

<template>
    <pre v-if="err.msg != ''">ERROR: {{ err.msg }}</pre>
    <LoadingComp v-if="isLoading" />
    <FileUpload v-if="entityType.name as string == 'file' && !isEdit" />
    <FormWrapper v-else :name="(isEdit ? 'Edit ' : 'Create new ') + entityType.display_name" @submitted="handleSubmit"
        @cancelled="reset(); $emit('cancelled')" :has-input="hasInput" :is-correct="isCorrect()">
        <div v-for="(field, key, index) in fields" :key="index" class="input-item">
            <template v-if="isSelectEntities(key)">
                <SelectEntitiesComp :entity-type="getEntityInfo(getEntitiesKey(key))" :field="field">
                    <ValidationTooltip v-if="!!field.dependsOn" :valid="depSatisfied(field)" condition="dep"
                        :dependant="field.dependsOn" />
                </SelectEntitiesComp>
            </template>
            <template v-else-if="isSelectEntity(key)">
                <!--SelectEntityComp :entity-type="getEntityInfo(getEntityKey(key))" :selected_id="field.value"
                    @deselected="field.value = undefined" @selected="(id) => field.value = id" /-->
                <SelectEntitiesComp :entity-type="getEntityInfo(getEntityKey(key))" :field="field" />
            </template>
            <template v-else>
                <InputComp :name="key.toString()" :field="field" @valuechanged="(val) => field.value = val">
                    <ValidationTooltip v-if="!field.nullable" :valid="isNotEmpty(field.value)" condition="req" />
                    <ValidationTooltip v-if="field.unique" :valid="!isDuplicate(fields[key].value)" condition="dup" />
                </InputComp>
            </template>
        </div>
    </FormWrapper>
</template>

<style scoped lang="scss">
.input-item {
    position: relative;
}
</style>
