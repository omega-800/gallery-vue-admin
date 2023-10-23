<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import TrashIconSolid from '@/components/icons/IconTrashSolid.vue'
import TrashIcon from '@/components/icons/IconTrash.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean,
    isdel?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper :active="active" text="Trash" :label="label" :disabled="disabled"
        :class="[{ isdeleted: isdel }, 'icon-trash',]">
        <template #default>
            <TrashIcon />
        </template>
        <template #solid>
            <TrashIconSolid />
        </template>
    </ToggleIconWrapper>
</template>
<style scoped lang="scss">
.icon-trash {
    &.isdeleted {
        color: $c-p-dark !important;

        &:hover {
            color: $c-p-dark !important;
        }
    }

    &:hover {
        color: $c-s-dark;
    }
}
</style>