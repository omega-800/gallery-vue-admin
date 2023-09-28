<script setup lang="ts">
import SearchIcon from '@/components/icons/IconSearch.vue'
import SearchIconSolid from '@/components/icons/IconSearchSolid.vue'

let searchVal = ''
</script>

<template>
    <form action="" class="search-comp comp fl-e2e" @submit.prevent="$emit('submitted', searchVal)">
        <input type="text" placeholder="Search..." v-model="searchVal" @keyup="$emit('submitted', searchVal)">
        <SearchIcon class="hov" @click="$emit('submitted', searchVal)" />
    </form>
</template>


<style scoped lang="scss">
.search-comp {
    & input {
        width: calc(100% - $el-tpl);
    }
}
</style>
