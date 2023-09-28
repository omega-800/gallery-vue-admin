<script setup lang="ts">
const props = defineProps<{
    active?: boolean,
    text?: string
}>()
</script>

<template>
    <slot v-if="active" name="solid" class="hov"></slot>
    <slot v-else name="default" class="hov"></slot>
    <span v-if="text">{{ text }}</span>
</template>