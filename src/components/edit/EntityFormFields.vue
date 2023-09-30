<script setup lang="ts">
import { isEntity, getEntityInfo, type EntityType } from '@/util/entities';
import { ref, reactive, computed } from 'vue';
import SelectEntityList from '@/components/edit/SelectEntityList.vue';
//import { FormField } from '@/types/Form'

const emit = defineEmits(['altered'])
const props = defineProps<{
    fields: { [key: string]: any },
}>()
const inputs = reactive(props.fields)

const isSelectEntities = (key: any): boolean => key.endsWith('_ids') && isEntity(key.slice(0, -4))
const getEntitiesKey = (key: any): EntityType => key.slice(0, -4) as EntityType
function setValues(key: any, values: string[]) {
    props.fields[key] = values
}

const isSelectEntity = (key: any): boolean => key.endsWith('_id') && isEntity(key.slice(0, -3))
const getEntityKey = (key: any): EntityType => key.slice(0, -3) as EntityType
function setValue(key: any, value: string) {
    props.fields[key] = value
}

function inputType(value: any): string {
    if (typeof value == 'boolean') return 'checkbox'
    if (typeof value == 'number') return 'number'
    return 'text'
}
</script>

<template>
    <template v-for="(value, key, index) in inputs" :key="index">
        <template v-if="isSelectEntities(key)">
            <SelectEntityList :entity-type="getEntityInfo(getEntitiesKey(key))" :selected_ids="value"
                @altered="(value) => { setValues(key, value); $emit('altered', fields) }" />
        </template>
        <template v-else-if="isSelectEntity(key)">
        </template>
        <template v-else>
            <div class="input-group box2">
                <label :for="`${key}${index}`">{{ key }}</label>
                <input :type="inputType(value)" :name="`${key}${index}`" :placeholder="value" v-model="inputs[key]"
                    @input="$emit('altered', fields)">
            </div>
        </template>
    </template>
</template>

<style scoped lang="scss"></style>
