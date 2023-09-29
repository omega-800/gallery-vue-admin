<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import MinusIconSolid from '@/components/icons/IconMinusSolid.vue'
import MinusIcon from '@/components/icons/IconMinus.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-minus" :active="active" text="Minus" :label="label" :disabled="disabled">
        <template #default>
            <MinusIcon />
        </template>
        <template #solid>
            <MinusIconSolid />
        </template>
    </ToggleIconWrapper>
</template>