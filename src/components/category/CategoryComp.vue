<script setup lang="ts">
import type { Category } from '@/types/gql/response/Category'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import { ref, toRefs, computed } from 'vue'
import { oppositeColor } from '@/util/util';

const props = defineProps<{
    category: Category,
    selectable?: boolean
}>()
const { category } = toRefs(props)
const showDesc = ref(false)
const categoryColor = computed(() => category.value.color || '$c-p-light')
const bgColor = computed(() => category.value.color ? category.value.color + '40' : '#C4EFBE40'/* '$c-p-light' */)
//const textColor = computed(() => oppositeColor(category.value.color))
const textColor = '#000'
</script>

<template>
    <CompWrapper :entity="category" :class="[{ selectable: !!selectable }, 'fl-col-c', 'hov-sh']">
        <p class="name f-s">{{ category.name }}</p>
        <p v-if="category.description && showDesc" class="description f-s">{{ category.description }}</p>
    </CompWrapper>
</template>

<style scoped lang="scss">
.category-comp {
    background-color: v-bind(bgColor);
    color: v-bind(textColor);
    border-radius: $el-pad;
    height: $el-dbl;
    @include outline-def;
    outline-offset: -#{$el-pad};
    outline-color: v-bind(categoryColor);

    &.isdeleted {
        background-color: $c-light;
    }

    @mixin orangecat {
        outline-color: $c-s-light;
    }

    &.isfavorite {
        @include orangecat;
    }

    &.selectable {
        cursor: pointer;

        &:hover {
            background-color: $c-p-mid;
        }

        &.isfavorite {
            &:hover {
                @include orangecat;
                opacity: $op-h;
            }
        }
    }
}
</style>
