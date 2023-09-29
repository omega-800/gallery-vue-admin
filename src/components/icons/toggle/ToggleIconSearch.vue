<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import SearchIconSolid from '@/components/icons/IconSearchSolid.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-search" :active="active" text="Search..." :label="label">
        <template #default>
            <SearchIcon />
        </template>
        <template #solid>
            <SearchIconSolid />
        </template>
    </ToggleIconWrapper>
</template>