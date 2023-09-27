<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    name?: string
    description?: string
}>()

</script>

<template>
    <div class="popup-comp">
        <div class="box popup comp">
            <div class="name-container fl-col">
                <p v-if="name" class="name f-l">{{ name }}</p>
                <p v-if="description" class="description f-m">{{ description }}</p>
            </div>
            <button class="close btn" @click="$emit('close')">X Close</button>
            <div class="popup-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-comp {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: $z-m;

    background-color: transparentize($c-dark, $op-l);

    & .popup {
        top: 10vh;
        left: 10vw;
        height: 80vh;
        width: 80vw;

        & .close.btn {
            position: absolute;
            top: $el-size;
            right: $el-size;
        }

        & .popup-content {
            padding: 10%;
        }
    }
}
</style>
