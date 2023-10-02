<script setup lang="ts">
import type { FormField } from '@/types/Form';
import { toRefs } from 'vue'
//import { FormField } from '@/types/Form'

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

</script>

<template>
    <div class="input-group">
        <label :for="field.name" class="input-label">{{ field.name }}</label>
        <input :type="type" :name="field.name" :placeholder="field.name" v-model="field.value" :required="!field.nullable">
    </div>
</template>

<style scoped lang="scss"></style>
