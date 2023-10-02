<script setup lang="ts">
import ToggleIconSearch from '@/components/icons/toggle/ToggleIconSearch.vue';

const props = defineProps<{
    placeholder?: string
}>()

let searchVal = ''
</script>

<template>
    <form action="" class="search-comp comp fl-e2e" @submit.prevent="$emit('submitted', searchVal)">
        <input type="text" :placeholder="placeholder || 'Search...'" v-model="searchVal"
            @keyup="$emit('submitted', searchVal)">
        <ToggleIconSearch @click="$emit('submitted', searchVal)" :active="false" />
    </form>
</template>


<style scoped lang="scss">
.search-comp {
    & input {
        width: calc(100% - $el-tpl);
    }
}
</style>
