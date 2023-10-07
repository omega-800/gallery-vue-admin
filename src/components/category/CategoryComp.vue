<script setup lang="ts">
import type { Category } from '@/types/gql/response/Category'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import { ref, toRefs } from 'vue'
import { oppositeColor } from '@/util/util';

const props = defineProps<{
    category: Category,
    selectable?: boolean
}>()
const { category } = toRefs(props)
const showDesc = ref(false)
const categoryColor = ref(category.value.color || '$c-p-light')
const textColor = ref(oppositeColor(category.value.color))
</script>

<template>
    <CompWrapper :entity="category" :class="[{ selectable: !!selectable }, 'fl-col-c']">
        <p class="name f-s">{{ category.name }}</p>
        <p v-if="category.description && showDesc" class="description f-s">{{ category.description }}</p>
    </CompWrapper>
</template>

<style scoped lang="scss">
.category-comp {
    background-color: v-bind(categoryColor);
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
