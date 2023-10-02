<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import ShopIconSolid from '@/components/icons/IconShopSolid.vue'
import ShopIcon from '@/components/icons/IconShop.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    disabled?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper class="icon-shop" :active="active" text="Shop items" :label="label" :disabled="disabled">
        <template #default>
            <ShopIcon />
        </template>
        <template #solid>
            <ShopIconSolid />
        </template>
    </ToggleIconWrapper>
</template>