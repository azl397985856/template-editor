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
            <el-input-number v-model="currentStyle.fontSize" size="small" @change="handleFontSizeChange" :min="1" :max="50">
            </el-input-number>
        </div>
        <div class="right-panel-fw">
            字形：
             <el-radio-group v-model="currentStyle.fw"  @change="handleShapChange">
                <el-radio-button size="small" label="B"></el-radio-button>
                <el-radio-button size="small" label="I"></el-radio-button>
                <el-radio-button size="small" label="U"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="right-panel-al">
            对齐：
            <el-radio-group v-model="currentStyle.al" @change="handleAlignChange">
                <el-radio-button size="small" label="L"></el-radio-button>
                <el-radio-button size="small" label="C"></el-radio-button>
                <el-radio-button size="small" label="R"></el-radio-button>
            </el-radio-group>
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
                    fontFamily: 'key1',
                    label: '宋体'
                 }, {
                    fontFamily: 'key2',
                    label: '黑体'
                 }, {
                    fontFamily: 'key3',
                    label: '扁桃体'
                 }, {
                    fontFamily: 'key4',
                    label: '斜体'
                 }, {
                    fontFamily: 'key5',
                    label: '呵呵体'
                }],
                    fontFamily: '扁桃体',
                    al: '',
                    fw: '',
                    fontSize: '12'
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
            handleAlignChange(align) {
                 // dispatch style
                 this.$store.dispatch('editStyle', {
                    align
                });
            },
             handleShapChange(fontWeight) {
                 // dispatch style
                 this.$store.dispatch('editStyle', {
                    fontWeight
                });
            }
        },
         computed: {
            currentStyle(vueComponent) {
                return vueComponent.$store.state.currentStyle;
            }
        }
    }
</script>