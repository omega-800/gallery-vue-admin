<script setup lang="ts">
import type { Gallery } from '@/types/gql/response/Gallery'
import CompWrapper from '@/components/helpers/CompWrapper.vue';
import FileComp from '@/components/file/FileComp.vue';
import { useFileStore } from '@/stores/files'
import { ref } from 'vue'

const { gallery } = defineProps<{
    gallery: Gallery,
}>()

const fileStore = useFileStore()
</script>

<template>
    <CompWrapper :entity="gallery" :class="['fl-col-c']">
        <p class="name f-l">{{ gallery.name }}</p>
        <FileComp v-for="file_id of gallery.file_ids" :key="file_id" :file="fileStore.byId(file_id)" />
    </CompWrapper>
</template>

<style scoped lang="scss">
.gallery-comp {
    background-color: $c-p-light;
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


    &.isfavorite {
        background-color: $c-s-light;

    }

}
</style>
