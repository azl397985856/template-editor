<template>
    <div class="draw-panel-container">
        <div
            class="print-item"
            v-show="item.id"
            @click="onItemClick"
            @mousedown="drop"
            @mouseup="drop"
            v-drag="edge"
            v-for="item in printItems"
            :id="item.id"
            :style="item.style"
        >
            <i class="el-icon-close" :id="item.id" @click="deleteItem" />
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
    import { JSONToXML, XMLToJSON } from '../editor/index';

    // services
    import { getTemplate } from '../services/index';

    import { toMillimeter } from '../util/unit';

    import { DEFAULT_STYLE } from '../config/index';

    module.exports = {
        created() {
            // init printItem
            const printItems = XMLToJSON(getTemplate());
            this.$store.state.printItems = printItems;
            
            // this.editStyle: 同步style数据到右侧面板
            printItems.forEach(item => this.editStyle(item.id));
        },
        data: function () {
            return {
                edge: {
                    p1: {
                        top: 0,
                        left: 0
                    },
                    p2: {
                        top:9999, // infinite
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

                // TODO: 仅仅在需要的时候计算edge
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

                // change item‘s pos when movinh
                console.log('top', top, 'left', left, 'width', width, 'height', height);
                const scale = window.devicePixelRatio;
                const id = e.target.getAttribute('id');
                this.$store.state.printItems = this.$store.state.printItems.map(item => {
                    item.active = false; // for style editing
                    if (id === item.id) {
                        item.pos ={
                            top: toMillimeter(top, scale),
                            left: toMillimeter(left, scale),
                            width: toMillimeter(width, scale),
                            height: toMillimeter(height, scale)
                        }
                        item.active = true;
                    }
                    return item;
                });
            },
            editStyle(id) {
                const item = this.$store.state.printItems.filter(_item => _item.id === id)[0];
                this.$store.dispatch('editStyle', item.style || DEFAULT_STYLE);
            },
            onItemClick(e) {
                const id = e.target.getAttribute('id');
                if (!id) return;
                // apply style when selected
                this.editStyle(id);
            },
            deleteItem(e) {
                const id = e.target.getAttribute('id');
                // 不可以使用filter
                this.$store.state.printItems = this.$store.state.printItems.map(item => {
                    if (item.id === id) {
                        item = {};
                    }
                    return item;
                });
            },
            saveTemplate() {
                const XML = JSONToXML(this.$store.state.printItems);
                console.info(`parsed XML:${XML}`);
            }
        },
        computed: {
            printItems() {
                return this.$store.state.printItems;
            }
        }
    }
</script>