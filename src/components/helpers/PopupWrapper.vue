<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    show: boolean,
    name?: string,
    description?: string,
}>()

</script>

<template>
    <Transition name="fade">
        <div v-if="show" class="popup-comp">
            <div class="box popup comp">
                <div class="name-container fl-col">
                    <p v-if="name" class="name f-l">{{ name }}</p>
                    <p v-if="description" class="description f-m">{{ description }}</p>
                    <button class="close btn" @click="$emit('close')">X Close</button>
                </div>
                <div class="popup-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
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

        & .name-container {
            height: $el-dbl;
        }

        & .close.btn {
            position: absolute;
            top: $el-size;
            right: $el-size;
        }

        & .popup-content {
            margin: $el-size 10%;
            overflow-y: auto;
            height: calc(100% - ($el-dbl * 2));
        }
    }
}
</style>
