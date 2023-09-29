<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import FolderIconSolid from '@/components/icons/IconFolderSolid.vue'
import FolderIcon from '@/components/icons/IconFolder.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-folder" :active="active" text="Files" :label="label" :disabled="disabled">
        <template #default>
            <FolderIcon />
        </template>
        <template #solid>
            <FolderIconSolid />
        </template>
    </ToggleIconWrapper>
</template>