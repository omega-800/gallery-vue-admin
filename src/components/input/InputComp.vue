<script setup lang="ts">
import type { FormField } from '@/types/Form';
import { toRefs } from 'vue'
import SwitchComp from './SwitchComp.vue';
//import { FormField } from '@/types/Form'

const emit = defineEmits(['valuechanged'])
const props = defineProps<{
    name: string,
    field: FormField
}>()

const { name, field } = toRefs(props)

const type = (typeof field.value.value == 'boolean') ? 'checkbox' :
    (typeof field.value.value == 'number') ? 'number' :
        (field.value.value instanceof Date) ? 'date' :
            (name.value == 'color') ? 'color' :
                'text'

let val = type == 'date'
    ? `${field.value.value.getFullYear()}-${field.value.value.toLocaleString("default", { month: "2-digit" })}-${field.value.value.toLocaleString("default", { day: "2-digit" })}`
    : field.value.value

const emitVal = () => emit('valuechanged', type == 'date' ? new Date(val) : val)
</script>

<template>
    <div class="input-group">
        <label :for="field.name" class="input-label f-m">{{ field.name }}<slot></slot></label>
        <SwitchComp v-if="type == 'checkbox'" @altered="val = !val" :small="true" />
        <input v-else :type="type" :name="field.name" :placeholder="field.name" v-model="val" :required="!field.nullable"
            @input="emitVal()">
    </div>
</template>

<style scoped lang="scss"></style>
