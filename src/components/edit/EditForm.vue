<script setup lang="ts">
import { isEntity, getEntityInfo, type EntityType } from '@/util/entities';
import { ref, reactive, computed } from 'vue';
import SelectEntityList from '@/components/edit/SelectEntityList.vue';
//import { FormField } from '@/types/Form'

const props = defineProps<{
    fields: { [key: string]: any },
}>()

let inProgress = ref(false)
let filledFields: { data: { [key: string]: any } } = reactive({ data: {} })

function cancel() {
    filledFields.data = {};
}
const hasInput = computed(() => JSON.stringify(filledFields.data) != '{}')

const isSelectEntities = (key: any): boolean => key.endsWith('_ids') && isEntity(key.slice(0, -4))
const getEntitiesKey = (key: any): EntityType => key.slice(0, -4) as EntityType
function setValues(key: any, values: string[]) {
    console.log(filledFields, values)
    filledFields.data[key] = values
}

const isSelectEntity = (key: any): boolean => key.endsWith('_id') && isEntity(key.slice(0, -3))
const getEntityKey = (key: any): EntityType => key.slice(0, -3) as EntityType
function setValue(key: any, value: string) {
    filledFields.data[key] = value
}

function inputType(value: any): string {
    let valueType = typeof value;
    if (valueType == 'string') return 'text'
    if (valueType == 'boolean') return 'checkbox'
    if (valueType == 'number') return 'number'
    return 'text'
}
</script>

<template>
    <form :class="[{ inprogress: inProgress }, 'form-comp']" action="" method="POST" enctype="multipart/form-data"
        @submit.prevent="$emit('submitted', filledFields.data)">
        <div class="actions fl-e2e">
            <button class="btn" type="submit" :disabled="!hasInput">
                {{ !hasInput ? 'Submit (input data first) ' : `Submit` }}
            </button>
            <button v-if="hasInput" class="btn" @click="cancel()">X Cancel</button>
        </div>
        <template v-for="(value, key, index) in fields" :key="index">
            <template v-if="isSelectEntities(key)">
                <SelectEntityList :entity-type="getEntityInfo(getEntitiesKey(key))" :selected_ids="value"
                    @changed="(value) => setValues(key, value)" />
            </template>
            <template v-else-if="isSelectEntity(key)">
            </template>
            <template v-else>
                <div class="inputs">
                    <label :for="`${key}${index}`">{{ key }}</label>
                    <input :type="inputType(value)" :name="`${key}${index}`" :placeholder="value"
                        v-model="filledFields.data[key]">
                </div>
            </template>
        </template>
    </form>
</template>

<style scoped lang="scss">
.inputs {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: $el-dbl;

    &>* {
        width: 100%;
        justify-self: start;
    }
}
</style>
