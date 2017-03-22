<template>
    <div class="draw-panel-container">
        <img class="template-pic" src="assets/sample.jpg" />
        <div
            class="print-item"
            @mouseup="drop"
            v-drag="edge"
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
            return {
                edge: {
                    p1: {
                        top: 0,
                        left: 0
                    },
                    p2: {
                        top:9999,
                        left:9999
                    }
                }
            }
        },
        methods: {
            // 不管是拖拽还是改变大小都触发
            drop(e) {
                const templatePic = document.querySelector('.template-pic');
                const tWidth = templatePic.clientWidth;
                const tHeight = templatePic.clientHeight;
                const tTop = templatePic.offsetTop;
                const tLeft = templatePic.offsetLeft;
                const padding = 10 ; // 拖拽留白宽度
                this.edge= {
                    p1: {
                        left: tLeft + padding,
                        top: tTop + padding,
                    },
                    p2: {
                        left: tLeft + tWidth - padding,
                        top: tTop + tHeight - padding
                    }
                };
                const width = e.target.clientWidth;
                const height = e.target.clientHeight;
                const top = e.y - height;
                const left = e.x - width;
                // console.log('top', top, 'left', left, 'width', width, 'height', height);
            }
        },
        computed: {
            printItems(vueComponent) {
                return vueComponent.$store.state.printItem;
            }
        }
    }
</script>