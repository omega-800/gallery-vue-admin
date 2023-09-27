<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const props = defineProps<{
    name?: string,
    description?: string
}>()
const hasInput = false;
</script>

<template>
    <form :class="['form-comp', 'comp']" action="" method="POST" enctype="multipart/form-data"
        @submit.prevent="$emit('submitted')">
        <div class="name-container fl-col">
            <p v-if="name" class="name f-l">{{ name }}</p>
            <p v-if="description" class="description f-m">{{ description }}</p>
        </div>
        <div class="actions fl-e2e">
            <button class="btn" type="submit" :disabled="!hasInput">
                {{ !hasInput ? 'Submit (input data first) ' : `Submit` }}
            </button>
            <button v-if="hasInput" class="btn" @click="$emit('cancelled')">X Cancel</button>
        </div>
        <div class="inputs">
            <slot name="inputs"></slot>
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
