<template>
    <div class="header-container">
        {{ title }}
    </div>
</template>

<style lang="less">
   @import './header.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                title: '模板编辑器（alpha）'
            }
        }
    }
</script>