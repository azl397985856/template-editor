<template>
    <ul class="left-panel-container" @click="onSelect">
        <li>寄件人</li>
        <li>寄件人_邮编</li>
        <li>寄件人_省</li>
    </ul>
</template>

<style lang="less">
   @import './leftPanel.less';
</style>

<script>
    import $ from 'jquery';
    import { mapGetters } from 'vuex'

    module.exports = {
        data: function () {
            return {
                name: 'leftPanel'
            }
        },
        methods: {
            onSelect(e) {
                $('.left-panel-container li').removeClass('active');
                $(e.target).addClass('active');
                this.$store.dispatch('addItem', 1);
                console.log(this.$store.state);
            }
        }
    }
</script>