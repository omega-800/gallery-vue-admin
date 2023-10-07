<script setup lang="ts">
import type { Entry } from '@/types/gql/response/Entry';
import ToggleIconPlusMinus from '@/components/icons/toggle/ToggleIconPlusMinus.vue';
import { toRefs } from 'vue'

const emit = defineEmits(['selected'])
const props = defineProps<{
    entityName: string,
    entity: Entry,
    add?: boolean
}>()
const { entity } = toRefs(props) 
</script>

<template>
    <div :class="['select-item', add ? 'select' : 'deselect']">
        <component :is="entityName+'-preview-comp'" :[entityName]="entity" />
        <ToggleIconPlusMinus :active="!!add" class="toggle-icon" />
    </div>
</template>
<style lang="scss">
.select-item {
    position: relative;
    cursor: pointer;

    & .toggle-icon {
        opacity: 0;
        position: absolute;
        top: calc(50% - $el-size);
        left: calc(50% - $el-size);
        z-index: $z-h;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: $c-p-dark;
        opacity: 0;
        transition: $tr-op-def;
    }

    &:hover {
        &::after {
            opacity: $op-h;
        }

        & .toggle-icon {
            opacity: 1;
        }

        &.deselect .toggle-icon {
            color: $c-s-dark;
        }

        &.select .toggle-icon {
            color: $c-p-light;
        }
    }
}
</style>