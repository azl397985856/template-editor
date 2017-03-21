<template>
    <div class="right-panel-container">
       {{ name }} !!
    </div>
</template>

<style lang="less">
   @import './rightPanel.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                name: 'right panel'
            }
        }
    }
</script>