<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import ImageIconSolid from '@/components/icons/IconImageSolid.vue'
import ImageIcon from '@/components/icons/IconImage.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-image" :active="active" text="Image" :label="label">
        <template #default>
            <ImageIcon />
        </template>
        <template #solid>
            <ImageIconSolid />
        </template>
    </ToggleIconWrapper>
</template>