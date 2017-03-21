<template>
    <div class="right-panel-container">
        <div class="right-panel-ff">
            字体：
            <el-select v-model="fontFamily" size="small" placeholder="请选择">
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
            <el-input-number v-model="fontSize" size="small" @change="handleFontSizeChange" :min="1" :max="50">
            </el-input-number>
        </div>
        <div class="right-panel-fw">
            字形：
            <el-button size="small">B</el-button>
            <el-button size="small">I</el-button>
            <el-button size="small">U</el-button>
        </div>
        <div class="right-panel-al">
            对齐：
            <el-button size="small">L</el-button>
            <el-button size="small">C</el-button>
            <el-button size="small">R</el-button>
        </div>
    </div>
</template>

<style lang="less">
   @import './rightPanel.less';
</style>

<script>
    module.exports = {
        data: function () {
            return {
                 fontSize: '12',
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
                    fontFamily: ''
                }
        },
        methods: {
            handleFontSizeChange(v) {
                console.log(v)
            }
        }
    }
</script>