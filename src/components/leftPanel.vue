<template>
    <ul class="left-panel-container" @click="onSelect">
        <li v-for="item in printItem" :print-item="JSON.stringify(item)" :print-key="item.key">
            {{
                item.title
            }}
        </li>
    </ul>
</template>

<style lang="less">
   @import './leftPanel.less';
</style>

<script>
    import $ from 'jquery';
    import { rect, image } from '../enums/index';
    module.exports = {
        data: function () {
            return {
                name: 'leftPanel',
                printItem: rect.concat(image)
            }
        },
        methods: {
            onSelect(e) {
                // add active class to selected item
                $('.left-panel-container li').removeClass('active');
                $(e.target).addClass('active');
                
                // dispatch
                this.$store.dispatch('addItem', JSON.parse(e.target.getAttribute('print-item')));
            }
        }
    }
</script>