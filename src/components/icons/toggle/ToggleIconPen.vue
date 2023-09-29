<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import PenIconSolid from '@/components/icons/IconPenSolid.vue'
import PenIcon from '@/components/icons/IconPen.vue'
import { computed, ref } from 'vue';

const props = defineProps<{
    active: boolean,
    label?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper :active="active" class="icon-pen" text='Edit' :label="label">
        <template #default>
            <PenIcon />
        </template>
        <template #solid>
            <PenIconSolid />
        </template>
    </ToggleIconWrapper>
</template>