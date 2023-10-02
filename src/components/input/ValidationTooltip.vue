<script setup lang="ts">
import type { FormField } from '@/types/Form';
import { toRefs } from 'vue'
//import { FormField } from '@/types/Form'

const props = defineProps<{
    condition: 'dup' | 'req' | 'dep',
    message?: string,
    error?: string,
    dependant?: string
    valid: boolean
}>()

const { condition, valid, dependant } = toRefs(props)
const [defMessage, defError, defColor] =
    condition.value == 'dup' ? ['Field must be unique', 'Duplicate!', 'orange'] :
        condition.value == 'req' ? ['Field cannot be empty', 'Required!', 'red'] :
            [`Either this or ${dependant?.value || 'other field'} must be filled out!`, `Depends on ${dependant?.value || 'other field'}!`, 'orange']
</script>

<template>
    <span :class="[{ valid }, 'validate', 'message', defColor]">*<template v-if="!valid">{{ error || defError }}</template>
        <span :class="['tooltip', 'message', defColor]">{{ message || defMessage }}</span>
    </span>
</template>

<style scoped lang="scss">
.validate {

    & .tooltip {
        position: absolute;
        bottom: 100%;
        display: none;
    }

    &:hover .tooltip {
        display: block;
    }
}
</style>
