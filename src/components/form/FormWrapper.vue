<script setup lang="ts">
import { toRefs } from 'vue';

const emit = defineEmits(['submitted', 'cancelled'])
const props = defineProps<{
    name?: string,
    description?: string,
    hasInput: boolean,
    isCorrect: boolean
}>()
const { hasInput } = toRefs(props)
</script>

<template>
    <form :class="['form-comp', 'comp', 'box']" action="" method="POST" @submit.prevent.stop>
        <div class="name-container fl-col">
            <p v-if="name" class="name f-l">{{ name }}</p>
            <p v-if="description" class="description f-m">{{ description }}</p>
        </div>
        <div class="inputs">
            <slot></slot>
        </div>
        <div class="actions fl-e2e">
            <button class="btn" :disabled="!hasInput || !isCorrect" @click="$emit('submitted')">Submit
                {{ !hasInput ? '(input data first)' : !isCorrect ? '(input is not correct)' : '' }}
            </button>
            <button v-if="hasInput" class="btn" @click="$emit('cancelled')">X Cancel</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
/*.inputs {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: $el-dbl;

    &>* {
        width: 100%;
        justify-self: start;
    }
}*/
</style>
