<template>
    <div class="loader-wrap cover">
    </div>
    <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader-wrap {
    background-color: $c-light;
    opacity: $op-m;
    z-index: $z-mh;
}

.loader {
    z-index: $z-h;
    position: absolute;
    top: calc(50% - ($el-ten / 2));
    left: calc(50% - ($el-ten / 2));
    width: $el-ten;
    height: $el-ten;
    @extend %spinner;
}
</style>