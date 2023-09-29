<script setup lang="ts">

const { entity } = defineProps<{
    entity: any,
}>()

</script>

<template>
    <div
        :class="[{ isfavorite: !!entity.favorite, isdeleted: !!entity.date_deleted }, entity.entity_type + '-comp', 'comp']">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.isdeleted {
    outline-color: $c-dark;
    background-color: $c-light;
}
</style>
