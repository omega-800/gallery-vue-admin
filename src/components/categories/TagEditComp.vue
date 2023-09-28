<script setup lang="ts">
import type { Tag } from '@/types/gql/response/Tag'
import { useTagStore } from '@/stores/tags';
import EditCompWrapper from '@/components/helpers/EditCompWrapper.vue';
import TagComp from '@/components/categories/TagComp.vue';
import { ref } from 'vue'

const { tag } = defineProps<{
    tag: Tag
}>()
const tagStore = useTagStore()
const showDesc = ref(false)
</script>

<template>
    <EditCompWrapper :entity-store="tagStore" :entity-id="tag.id">
        <template #form>
            <div>Insert form</div>
        </template>
        <template #main>
            <TagComp :tag="tag" />
        </template>
    </EditCompWrapper>
</template>

<style scoped lang="scss">
.tag-comp {
    background-color: $c-p-light;
    border-radius: 0 $el-pad $el-pad 0;
    height: $el-dbl;
    padding: 0 $el-pad;
    cursor: pointer;
    margin-left: $el-size + $thin;
    //transition: $tr-c-def;

    &:hover {
        background-color: $c-p-mid;

        &::after {
            border-right: $el-size solid $c-p-mid;
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
