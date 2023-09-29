<script setup lang="ts">
import ToggleIconWrapper from '@/components/icons/toggle/ToggleIconWrapper.vue'
import StarIconSolid from '@/components/icons/IconStarSolid.vue'
import StarIcon from '@/components/icons/IconStar.vue'

const props = defineProps<{
    active: boolean,
    label?: boolean,
    isfav?: boolean
}>()
</script>

<template>
    <ToggleIconWrapper :class="[{ isfavorite: isfav }, 'icon-star']" :active="active" text="Favorite" :label="label">
        <template #default>
            <StarIcon />
        </template>
        <template #solid>
            <StarIconSolid />
        </template>
    </ToggleIconWrapper>
</template>

<style scoped lang="scss">
.icon-star.isfavorite {
    color: $c-s-light !important;

    &:hover {
        color: $c-s-light !important;
    }
}
</style>