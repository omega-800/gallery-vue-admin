<script setup lang="ts">

const { entity, classes } = defineProps<{
    entity: any,
    classes?: string[]
}>()

</script>

<template>
    <div
        :class="[{ isfavorite: !!entity.favorite, isdeleted: !!entity.date_deleted }, entity.entity_type + '-comp', 'comp', ...classes]">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss"></style>
