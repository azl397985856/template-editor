<template>
    <div class="right-panel-container">
        <div class="right-panel-ff">
            字体：
            <el-select
                @change="handleFontFamilyChange"
                v-model="editStyle.fontFamily"
                size="small"
                placeholder="请选择"
            >
                    <el-option
                        v-for="font in fonts"
                        :label="font.label"
                        :value="font.fontFamily"
                    >
                    </el-option>
            </el-select>
        </div>
        <div class="right-panel-fs">
            字号：
            <el-input-number v-model="editStyle.fontSize" size="small" @change="handleFontSizeChange" :min="12" :max="50">
            </el-input-number>
        </div>
        <div class="right-panel-fw">
            字形：
            <el-checkbox-group v-model="editStyle.fw"  @change="handleShapChange">
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
    import { fonts, mapper } from '../config/index';

    module.exports = {
        data: function () {
            return {
                 fonts,
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
                 if (v.indexOf(mapper.bold) !== -1) {
                     shape.fontWeight = 'bold';
                 }
                 if (v.indexOf(mapper.italic) !== -1) {
                     shape.fontStyle = 'italic';
                 }
                 if(v.indexOf(mapper.underline) !== -1) {
                     shape.textDecoration = 'underline';
                 }
                 // dispatch style
                 this.$store.dispatch('editStyle', { ...shape });
            }
        },
        computed: {
            editStyle () {
                return this.$store.state.editStyle;
            }
        }
    }
</script>