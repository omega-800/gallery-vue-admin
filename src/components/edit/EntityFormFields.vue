<script setup lang="ts">
import { isEntity, getEntityInfo, type EntityType } from '@/util/entities';
import { ref, reactive, computed } from 'vue';
import SelectEntityList from '@/components/edit/SelectEntityList.vue';
//import { FormField } from '@/types/Form'

const emit = defineEmits(['altered'])
const props = defineProps<{
    fields: { [key: string]: any },
}>()

let filledFields: { data: { [key: string]: any } } = reactive({ data: JSON.parse(JSON.stringify(props.fields)) })

function cancel() {
    filledFields.data = JSON.parse(JSON.stringify(props.fields));
}

const isSelectEntities = (key: any): boolean => key.endsWith('_ids') && isEntity(key.slice(0, -4))
const getEntitiesKey = (key: any): EntityType => key.slice(0, -4) as EntityType
function setValues(key: any, values: string[]) {
    filledFields.data[key] = values
}

const isSelectEntity = (key: any): boolean => key.endsWith('_id') && isEntity(key.slice(0, -3))
const getEntityKey = (key: any): EntityType => key.slice(0, -3) as EntityType
function setValue(key: any, value: string) {
    filledFields.data[key] = value
}

function inputType(value: any): string {
    if (typeof value == 'boolean') return 'checkbox'
    if (typeof value == 'number') return 'number'
    return 'text'
}
</script>

<template>
    <template v-for="(value, key, index) in fields" :key="index">
        <template v-if="isSelectEntities(key)">
            <SelectEntityList :entity-type="getEntityInfo(getEntitiesKey(key))" :selected_ids="value"
                @altered="(value) => { setValues(key, value); $emit('altered', filledFields.data) }" />
        </template>
        <template v-else-if="isSelectEntity(key)">
        </template>
        <template v-else>
            <div class="input-group box2">
                <label :for="`${key}${index}`">{{ key }}</label>
                <input :type="inputType(value)" :name="`${key}${index}`" :placeholder="value"
                    v-model="filledFields.data[key]" @input="$emit('altered', filledFields.data)">
            </div>
        </template>
    </template>
</template>

<style scoped lang="scss"></style>
