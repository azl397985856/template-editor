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
            :style="item.editStyle"
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
    import $ from 'jquery';

    import { JSONToXML, XMLToJSON } from '../editor/index';

    import enums from '../enums/index';
    import { getTemplate } from '../services/index';
    import { stringifyStyle, parseStyle } from '../util/style';
    import { toMillimeter } from '../util/unit';
    import { DEFAULT_STYLE } from '../config/index';

    module.exports = {
        created() {
            const template = XMLToJSON(getTemplate());
            const page = template.layout;
            const items = page.layout;
            const printItems = [];

            // 生成print-items
            // more filed to be translated
            // see http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpmlSpec.html#chapter3
            for(let key in items) {
                const ret = {};
                const item = items[key];
                const { top, left, width, height } = item.$;
                ret.id = item.$.id;
                ret.style = {
                    top,
                    left,
                    width,
                    height
                }
                ret.editStyle = parseStyle(item.text.$.style);
                ret.title = item.text.$['editor:_printName_'];
                ret.key = item.text._.match(/\..*%/)[0].slice(1, -1);
                printItems.push(ret);
            }

            this.$store.state.printItems = printItems;
            
            // 同步style数据到右侧面板
            printItems.forEach(item => this.editStyle(item.id));
            console.info(items)
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
                const scale = window.devicePixelRatio;
                const id = e.target.getAttribute('id');
                this.$store.state.printItems = this.$store.state.printItems.map(item => {
                    item.active = false; // for style editing
                    if (id === item.id) {
                        item.style ={
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
                this.$store.dispatch('editStyle', item.editStyle || DEFAULT_STYLE);
            },
            onItemClick(e) {
                const id = e.target.getAttribute('id');
                if (!id) return;
                this.editStyle(id);
            },
            translatePrintItem(items) {
                // more filed to be translated
                // see http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpmlSpec.html#chapter3
                return items.map(item => {
                    const ret = {};

                    if (!item.id) return ret;
                    ret.layout = {};
                    ret.layout.$ = {};
                    ret.layout.text = {};
                    ret.layout.text._ = `<![CDATA[<%=_data.${item.key}%>]]>`;
                    ret.layout.text.$ = {};
                    ret.layout.text.$.style = stringifyStyle(item.editStyle);
                    ret.layout.$ = item.style;
                    return ret;
                })
            },
            deleteItem(e) {
                const id = e.target.getAttribute('id');
                this.$store.state.printItems = this.$store.state.printItems.map(item => {
                    if (item.id === id) {
                        item = {};
                    }
                    return item;
                });
            },
            saveTemplate() {
                const XML = JSONToXML(this.translatePrintItem(this.$store.state.printItems));
                console.info(XML);
            }
        },
        computed: {
            printItems(vueComponent) {
                return vueComponent.$store.state.printItems;
            }
        }
    }
</script>