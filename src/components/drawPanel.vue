<template>
    <div class="draw-panel-container">
        {{ name }} !!
    </div>
</template>

<style lang="less">
   @import './drawPanel.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                name: 'drawPanel'
            }
        }
    }
</script>