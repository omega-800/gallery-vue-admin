<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from 'pinia'

const store = useLoadingStore()
const { items } = storeToRefs(store)

</script>

<template>
    <div class="loading-wrapper">
        <div v-for="item of items" :key="item.id" class="loading-bar">
            <p>{{ item.state.action }} {{ item.name }} {{ item.state.status }} <span v-if="item.state.percent">{{
                item.state.percent }}%</span></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.loading-wrapper {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: $c-light;
    z-index: $z-h;
}
</style>