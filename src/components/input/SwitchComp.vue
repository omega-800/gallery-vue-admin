<script setup lang="ts">
const emit = defineEmits(['altered'])
const props = defineProps<{
    text?: string,
    small?: boolean
}>()
</script>

<template>
    <div :class="['switch-comp', 'comp', { 'named-switch': text, small }]">
        <label class="switch">
            <input type="checkbox" @change="$emit('altered')">
            <span class="slider round"></span>
        </label>
        <span v-if="text">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
.switch-comp {

    & .switch {
        $s-switch: $el-wrap + $el-pad;
        $s-slider: $el-wrap - $el-pad;
        $s-width: 2 * $el-wrap;
        position: relative;
        display: inline-block;
        width: $s-width; //60px
        height: $s-switch; //34px

        &:hover .slider {
            background-color: $c-p-mid !important;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: $c-p-light;
            -webkit-transition: .4s;
            transition: .4s;

            &:before {
                position: absolute;
                content: "";
                height: $s-slider;
                width: $s-slider;
                left: $el-pad;
                bottom: $el-pad;
                background-color: $c-light;
                -webkit-transition: .4s;
                transition: .4s;
            }

            &.round {
                border-radius: $s-switch;

                &:before {
                    border-radius: 50%;
                }
            }
        }

        & input {
            opacity: 0;
            width: 0;
            height: 0;

            &:checked+.slider {
                background-color: $c-p-mid;

                &:before {
                    -webkit-transform: translateX($s-slider);
                    -ms-transform: translateX($s-slider);
                    transform: translateX($s-slider);
                }
            }

            &:focus+.slider {
                box-shadow: 0 0 1px $c-p-mid;
            }
        }
    }

    &.small {
        $s-switch: $el-size + $el-pad;
        $s-slider: $el-size - $el-pad;
        $s-width: 2 * $el-size;

        & .switch {
            width: $s-width; //60px
            height: $s-switch; //34px

            .slider {
                &:before {
                    height: $s-slider;
                    width: $s-slider;
                    left: $el-pad;
                    bottom: $el-pad;
                }

                &.round {
                    border-radius: $s-switch;
                }
            }

            & input:checked+.slider:before {
                -webkit-transform: translateX($s-slider);
                -ms-transform: translateX($s-slider);
                transform: translateX($s-slider);
            }
        }
    }
}
</style>