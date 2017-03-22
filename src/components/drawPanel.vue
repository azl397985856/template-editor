<template>
    <div class="draw-panel-container">
        <img class="template-pic" src="assets/sample.jpg" />
        <div
            class="print-item"
            @mouseup="drop"
            v-drag
            v-for="item in printItems"
            :print-key="item.key"
        >
            {{item.title}}
        </div>
    </div>
</template>

<style lang="less">
   @import './drawPanel.less';
</style>

<script>
    import enums from '../enums/index';
    import $ from 'jquery';

    module.exports = {
        data: function () {
            // const templatePic = document.querySelector('.template-pic')
            // return {
            //     edge: {
            //         top: templatePic.offsetTop,
            //         left: templatePic.offsetLeft
            //     }
            // }
        },
        methods: {
            // 不管是拖拽还是改变大小都触发
            drop(e) {
                const width = e.target.clientWidth;
                const height = e.target.clientHeight;
                const top = e.y - height;
                const left = e.x - width;
                console.log('top', top, 'left', left, 'width', width, 'height', height);
            }
        },
        computed: {
            printItems(vueComponent) {
                return vueComponent.$store.state.printItem;
            }
        }
    }
</script>