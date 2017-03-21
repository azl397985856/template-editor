<template>
    <div class="header-container">
        {{ name }} !!
    </div>
</template>

<style lang="less">
   @import './header.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                name: 'header'
            }
        }
    }
</script>