<script setup lang="ts">
import { isEntity, getEntityInfo, type EntityType } from '@/util/entities';
import { ref, reactive, computed, toRefs } from 'vue';
import SelectEntityList from '@/components/input/SelectEntityList.vue';
import type { FormFields } from '@/types/Form';
//import { FormField } from '@/types/Form'

const props = defineProps<{
    fields: FormFields,
    entityName: EntityType
}>()
const { fields } = toRefs(props)

const isSelectEntities = (key: any): boolean => key.endsWith('_ids') && isEntity(key.slice(0, -4))
const getEntitiesKey = (key: any): EntityType => key.slice(0, -4) as EntityType
function setValues(key: any, values: string[]) {
    fields.value[key].value = values ? values : []
}

const isSelectEntity = (key: any): boolean => key.endsWith('_id') && isEntity(key.slice(0, -3))
const getEntityKey = (key: any): EntityType => key.slice(0, -3) as EntityType
function setValue(key: any, value: string) {
    fields.value[key].value = value
}

function inputType(key: any, value: any): string {
    if (typeof value == 'boolean') return 'checkbox'
    if (typeof value == 'number') return 'number'
    if (key == 'color') return 'color'
    return 'text'
}

const isEmpty = (value: any) => !value || value == ''
</script>

<template>
    <template v-for="(field, key, index) in fields" :key="index">
        <template v-if="isSelectEntities(key)">
            <SelectEntityList :entity-type="getEntityInfo(getEntitiesKey(key))" :selected_ids="field.value"
                @altered="(value) => setValues(key, value)" />
        </template>
        <template v-else-if="isSelectEntity(key)">
        </template>
        <template v-else>
            <div class="input-group box">
                <label :for="`${key}${index}`">{{ field.name }}
                    <span v-if="!field.nullable" :class="[{ empty: isEmpty(fields[key].value) }, 'required']">*
                        <template v-if="isEmpty(fields[key].value)">Required!</template>
                    </span>
                </label>
                <input :type="inputType(key, field.value)" :name="`${key}${index}`" :placeholder="field.name"
                    v-model="fields[key].value" :required="!field.nullable">
            </div>
        </template>
    </template>
</template>

<style scoped lang="scss">
.required.empty {
    background-color: $c-s-dark;
    border-radius: $el-pad;
}

.unique.duplicate {
    background-color: $c-s-light;
    border-radius: $el-pad;
}
</style>
