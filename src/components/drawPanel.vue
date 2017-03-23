<template>
    <div class="draw-panel-container">
        <div
            class="print-item"
            @mousedown="drop"
            @mouseup="drop"
            v-drag="edge"
            v-for="item in printItems"
            :print-key="item.key"
        >
            <i class="el-icon-close" :print-key="item.key" @click="deleteItem" />
            {{item.title}}
        </div>
        <div class="draw-panel-footer">
            <el-button>取消</el-button>
            <el-button type="primary" @click="saveTemplate">保存</el-button>
        </div>
    </div>
</template>

<style lang="less">
   @import './drawPanel.less';
</style>

<script>
    import $ from 'jquery';

    import enums from '../enums/index';
    import { JSONToXML } from '../editor/index';
    import Unit from '../util/unit';

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
            // 不管是拖拽还是改变大小都触发。
            // mouseup 也监听是为了设置可拖动区域。可优化
            drop(e) {
                const templatePic = document.querySelector('.draw-panel-container');
                const tWidth = templatePic.clientWidth;
                const tHeight = templatePic.clientHeight;
                const tTop = templatePic.offsetTop;
                const tLeft = templatePic.offsetLeft;

                const width = e.target.clientWidth;
                const height = e.target.clientHeight;
                const top = e.target.offsetTop;
                const left = e.target.offsetLeft;

                this.edge= {
                    p1: {
                        left: tLeft + e.clientX - left,
                        top: tTop + e.clientY - top,
                    },
                    p2: {
                        left: tLeft + tWidth - e.clientX + left,
                        top: tTop + tHeight - e.clientY + top
                    }
                };
                // dispatch to editor
                console.log('top', top, 'left', left, 'width', width, 'height', height);
                Unit.scale = window.devicePixelRatio;
                const { toMillimeter } = Unit;
                const key = e.target.getAttribute('print-key');
                this.$store.state.printItem = this.$store.state.printItem.map(item => {
                    if (key === item.key) {
                        item.style ={
                            top: toMillimeter(top),
                            left: toMillimeter(left),
                            width: toMillimeter(width),
                            height: toMillimeter(height)
                        }
                    }
                    return item;
                });
            },
            translatePrintItem(items) {
                return items.map(item => {
                    const ret = {};
                    ret.layout = {};
                    ret.layout.$ = {};
                    ret.layout.text = `<![CDATA[<%=_data.${item.key}%>]]>`
                    ret.layout.$ = item.style;
                    return ret;
                })
            },
            deleteItem(e) {
                const key = e.target.getAttribute('print-key');
                this.$store.state.printItem = this.$store.state.printItem.filter(item => item.key !== key);
            },
            saveTemplate() {
                const XML = JSONToXML(this.translatePrintItem(this.$store.state.printItem));
                console.info(XML);
            }
        },
        computed: {
            printItems(vueComponent) {
                return vueComponent.$store.state.printItem;
            }
        }
    }
</script>