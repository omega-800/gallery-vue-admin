<script setup lang="ts">
import type { Tag } from '@/types/gql/response/Tag'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import { ref } from 'vue'

const { tag } = defineProps<{
    tag: Tag,
    selectable?: boolean
}>()
const showDesc = ref(false)
const tagColor = tag.color || '$c-p-light'
const textColor = oppositeColor(tag.color)

function oppositeColor(color?: string): any {
    if (!color) return '#000'
    var m = color.substring(1).match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
    if (!m) return '#000'
    var r = parseInt(m[0], 16), g = parseInt(m[1], 16), b = parseInt(m[2], 16);
    if (!r) return '#000'
    return (((r * 299) + (g * 587) + (b * 114)) / 1000) < 127 ? '#fff' : '#000';
}
</script>

<template>
    <CompWrapper :entity="tag" :class="[{ selectable: !!selectable }, 'fl-col-c']">
        <p class="name f-s">{{ tag.name }}</p>
        <p v-if="tag.description && showDesc" class="description f-s">{{ tag.description }}</p>
    </CompWrapper>
</template>

<style scoped lang="scss">
.tag-comp {
    background-color: v-bind(tagColor);
    color: v-bind(textColor);
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
        @include outline-def;
        outline-offset: -#{$thin};
        outline-color: $c-s-light;

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
        border-right: $el-size solid v-bind(tagColor);
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
        background-color: v-bind(textColor);
        z-index: $z-l;
    }
}
</style>
