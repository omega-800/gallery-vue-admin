<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
    active?: boolean,
    text?: string,
    label?: boolean,
    disabled?: boolean
}>()
let isHover = ref(false)
const showActive = computed(() => [props.active, isHover.value].filter(b => b).length == 1)
</script>

<template>
    <div :class="[{ lnkdisabled: disabled }, 'toggle-icon hov named-btn']" @mouseenter="isHover = disabled ? false : true"
        @mouseleave="isHover = false">
        <div class="w-6 h-6 icon-container">
            <Transition name="fadeicon">
                <slot v-if="showActive" name="solid"></slot>
                <slot v-else name="default"></slot>
            </Transition>
        </div>
        <span v-if="label && text">{{ text }}</span>
    </div>
</template>
<style lang="scss">
.toggle-icon {
    color: $c-p-light;
    display: flex;
    align-items: center;
    gap: $el-pad;
    text-decoration: none;

    & .icon-container {
        position: relative;

        & .w-6.h-6 {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
</style>