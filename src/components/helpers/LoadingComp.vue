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
    border: $el-size solid $c-p-dark;
    /* Light grey */
    border-top: $el-size solid $c-p-light;
    /* Blue */
    border-radius: 50%;
    width: $el-ten;
    height: $el-ten;
    opacity: $op-h;

    animation: spin 2s linear infinite;
}


@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>