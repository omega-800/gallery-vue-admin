<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
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
        <div class="inputs">
            <template v-for="(value, key, index) in fields" :key="index">
                <label :for="`${key}${index}`">{{ key }}</label>
                <input :type="inputType(value)" :name="`${key}${index}`" :placeholder="value"
                    v-model="filledFields.data[key]">
            </template>
        </div>
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
