<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import PlusIconSolid from '@/components/icons/IconPlusSolid.vue'
import PlusIcon from '@/components/icons/IconPlus.vue'

const props = defineProps<{
    active: boolean,
    text?: string,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-plus" :active="active" :text="text || 'Add'" :label="!!text || label"
        :disabled="disabled">
        <template #default>
            <PlusIcon />
        </template>
        <template #solid>
            <PlusIconSolid />
        </template>
    </ToggleIconWrapper>
</template>