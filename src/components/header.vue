<template>
    <div class="header-container">
        {{ name }}
    </div>
</template>

<style lang="less">
   @import './header.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                name: '模板编辑器（alpha）'
            }
        }
    }
</script>