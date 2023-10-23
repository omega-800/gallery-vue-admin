<script setup lang="ts">
import type { Tag } from '@/types/gql/response/Tag'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import { ref, computed, toRefs } from 'vue'
import { oppositeColor } from '@/util/util';

const props = defineProps<{
    tag: Tag,
    selectable?: boolean
}>()

const { tag } = toRefs(props)
const showDesc = ref(false)
const tagColor = computed(() => tag.value.color || '$c-p-light')
const bgColor = computed(() => tag.value.color ? tag.value.color + '70' : '#C4EFBE70'/* '$c-p-light' */)
const textColor = computed(() => oppositeColor(tag.value.color))
</script>

<template>
    <CompWrapper :entity="tag" :class="[{ selectable: !!selectable }, 'fl-col-c']">
        <p class="name f-s">{{ tag.name }}</p>
        <p v-if="tag.description && showDesc" class="description f-s">{{ tag.description }}</p>
        <span class="line-top line"></span>
        <span class="line-bottom line"></span>
    </CompWrapper>
</template>

<style scoped lang="scss">
.tag-comp {
    background-color: v-bind(bgColor);
    color: v-bind(textColor);
    border-radius: 0 $el-pad $el-pad 0;
    height: $el-dbl;
    padding: 0 $el-pad;
    margin-left: $el-size + $thin;
    border: $bd-def;
    border-color: v-bind(tagColor);
    border-left: none;
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

    .line {
        border-top: $bd-def;
        border-color: v-bind(tagColor);
        width: $el-size * 1.41421;
        position: absolute;
        left: -#{$el-size + 0.15em};
        border-radius: $thin;

        &.line-top {
            top: 0.39em;
            transform: rotate(-45deg);
        }

        &.line-bottom {
            bottom: 0.35em;
            transform: rotate(45deg);
        }
    }

    &::after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        right: 100%;
        top: -#{($thin / 2)};
        border: $el-size solid transparent;
        border-right: $el-size solid v-bind(bgColor);
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
