<template>
    <div class="left-panel-container">
        {{ name }} !!
    </div>
</template>

<style lang="less">
   @import './leftPanel.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                name: 'leftPanel'
            }
        }
    }
</script>