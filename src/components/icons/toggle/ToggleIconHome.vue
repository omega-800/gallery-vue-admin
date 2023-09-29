<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import HomeIconSolid from '@/components/icons/IconHomeSolid.vue'
import HomeIcon from '@/components/icons/IconHome.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-home" :active="active" text="Home" :label="label" :disabled="disabled">
        <template #default>
            <HomeIcon />
        </template>
        <template #solid>
            <HomeIconSolid />
        </template>
    </ToggleIconWrapper>
</template>