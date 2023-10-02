<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import PlusIconSolid from '@/components/icons/IconPlusSolid.vue'
import PlusIcon from '@/components/icons/IconPlus.vue'
import MinusIconSolid from '@/components/icons/IconMinusSolid.vue'
import MinusIcon from '@/components/icons/IconMinus.vue'

const props = defineProps<{
    active: boolean,
    text?: string,
    textMinus?: string,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper :class="active ? 'icon-minus' : 'icon-plus'" :active="active"
        :text="active ? text || 'More' : textMinus || 'Less'" :label="!!text || !!textMinus || label" :disabled="disabled">
        <template #default>
            <MinusIcon v-if="!active" />
            <PlusIcon v-if="active" />
        </template>
        <template #solid>
            <MinusIconSolid v-if="!active" />
            <PlusIconSolid v-if="active" />
        </template>
    </ToggleIconWrapper>
</template>