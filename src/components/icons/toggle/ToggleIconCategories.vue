<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import CategoriesIconSolid from '@/components/icons/IconCategoriesSolid.vue'
import CategoriesIcon from '@/components/icons/IconCategories.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-categories" :active="active" text="Categories" :label="label" :disabled="disabled">
        <template #default>
            <CategoriesIcon />
        </template>
        <template #solid>
            <CategoriesIconSolid />
        </template>
    </ToggleIconWrapper>
</template>