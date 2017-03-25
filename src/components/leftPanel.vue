<template>
    <ul class="left-panel-container" @click="onSelect">
        <li
            v-for="item in printItem"
            :print-item="JSON.stringify(item)"
            :print-key="item.key"
            :class="active"
        >
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
    import { rect, image } from '../enums/index';
    module.exports = {
        data: function () {
            return {
                printItem: rect.concat(image)
            }
        },
        methods: {
            onSelect(e) {
                // add active class to selected item
                const lis = document.querySelectorAll('.left-panel-container li');
                const li = document.querySelector(`[print-key = ${e.target.getAttribute('print-key')}`);
                lis.forEach(li => li.classList.remove('active'));
                li.classList.add('active');

                // dispatch
                this.$store.dispatch('addItem', JSON.parse(e.target.getAttribute('print-item')));
            }
        }
    }
</script>