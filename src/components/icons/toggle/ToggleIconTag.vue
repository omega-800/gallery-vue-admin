<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import TagIconSolid from '@/components/icons/IconTagSolid.vue'
import TagIcon from '@/components/icons/IconTag.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-tag" :active="active" text="Tag" :label="label">
        <template #default>
            <TagIcon />
        </template>
        <template #solid>
            <TagIconSolid />
        </template>
    </ToggleIconWrapper>
</template>