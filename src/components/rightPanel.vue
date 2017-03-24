<template>
    <div class="right-panel-container">
        <div class="right-panel-ff">
            字体：
            <el-select
                @change="handleFontFamilyChange"
                v-model="currentStyle.fontFamily"
                size="small"
                placeholder="请选择"
            >
                    <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.fontFamily"
                    >
                    </el-option>
            </el-select>
        </div>
        <div class="right-panel-fs">
            字号：
            <el-input-number v-model="currentStyle.fontSize" size="small" @change="handleFontSizeChange" :min="12" :max="50">
            </el-input-number>
        </div>
        <div class="right-panel-fw">
            字形：
            <el-checkbox-group v-model="currentStyle.fw"  @change="handleShapChange">
                <el-checkbox size="small" label="粗体"></el-checkbox>
                <el-checkbox size="small" label="斜体"></el-checkbox>
                <el-checkbox size="small" label="下划线"></el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<style lang="less">
   @import './rightPanel.less';
</style>

<script>
    import $ from 'jquery';

    module.exports = {
        data: function () {
            return {
                 options: [{
                    fontFamily: 'Serif',
                    label: '宋体'
                 }, {
                    fontFamily: 'Sans-serif',
                    label: '黑体'
                 }, {
                    fontFamily: 'Monospace ',
                    label: '扁桃体'
                 }, {
                    fontFamily: 'Cursive ',
                    label: '斜体'
                 }, {
                    fontFamily: 'Fantasy ',
                    label: '呵呵体'
                }],
                }
        },
        methods: {
            handleFontSizeChange(fontSize) {
                // dispatch style
                this.$store.dispatch('editStyle', {
                    fontSize
                });
            },
            handleFontFamilyChange(fontFamily) {
                // dispatch style
                this.$store.dispatch('editStyle', {
                    fontFamily
                });

            },
             handleShapChange(v) {
                 let shape = {
                     fontWeight: "",
                     fontStyle: "",
                     textDecoration: ""
                 };
                 if (v.indexOf('粗体') !== -1) {
                     shape.fontWeight = 'bold';
                 }
                 if (v.indexOf('斜体') !== -1) {
                     shape.fontStyle = 'italic ';
                 }
                 if(v.indexOf('下划线') !== -1) {
                     shape.textDecoration = 'underline';
                 }
                 // dispatch style
                 this.$store.dispatch('editStyle', { ...shape });
            }
        },
         computed: {
            currentStyle(vueComponent) {
                return vueComponent.$store.state.currentStyle;
            }
        }
    }
</script>