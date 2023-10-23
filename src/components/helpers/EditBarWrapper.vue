<script setup lang="ts">
const props = defineProps<{
    show: boolean
}>()
</script>

<template>
    <Transition name="fade">
        <div v-if="show" class="editbar-wrapper wrapper fl-row box">
            <slot></slot>
        </div>
    </Transition>
</template>


<style scoped lang="scss">
.editbar-wrapper {
    position: absolute;
    bottom: 100%;
    right: 0;
    flex-wrap: nowrap;
}
</style>
