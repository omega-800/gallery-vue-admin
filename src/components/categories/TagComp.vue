<script setup lang="ts">
import type { Tag } from '@/types/gql/response/Tag'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import { ref } from 'vue'

const { tag } = defineProps<{
    tag: Tag,
    selectable?: boolean
}>()
const showDesc = ref(false)
</script>

<template>
    <CompWrapper :entity="tag" :class="[{ selectable: !!selectable }, 'fl-col-c']">
        <p class="name f-s">{{ tag.name }}</p>
        <p v-if="tag.description && showDesc" class="description f-s">{{ tag.description }}</p>
    </CompWrapper>
</template>

<style scoped lang="scss">
.tag-comp {
    background-color: $c-p-light;
    border-radius: 0 $el-pad $el-pad 0;
    height: $el-dbl;
    padding: 0 $el-pad;
    margin-left: $el-size + $thin;
    //transition: $tr-c-def;

    &.isdeleted {
        @include outline-def;
        outline-offset: -#{$thin};

        &::after {
            border-right: $el-size solid $c-dark;
        }

        &::before {
            background-color: $c-light;
        }
    }

    @mixin orangetag {
        background-color: $c-s-light;

        &::after {
            border-right: $el-size solid $c-s-light;
        }

        &::before {
            background-color: $c-dark;
        }
    }


    &.isfavorite {
        @include orangetag;

    }

    &.selectable {
        cursor: pointer;

        &:hover {
            background-color: $c-p-mid;

            &::after {
                border-right: $el-size solid $c-p-mid;
            }
        }

        &.isfavorite {

            &:hover {
                @include orangetag;
                opacity: $op-h;
            }
        }
    }

    &::after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        right: 100%;
        top: 0;
        border: $el-size solid transparent;
        border-right: $el-size solid $c-p-light;
    }

    &::before {
        content: '';
        width: $thin * 3;
        height: $thin * 3;
        display: block;
        position: absolute;
        right: 100%;
        top: calc(50% - ($thin * 1.5));
        border-radius: 50%;
        background-color: $c-p-dark;
        z-index: $z-l;
    }
}
</style>
