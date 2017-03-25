<template>
    <div>
        <template-header />
        <div class="container">
            <template-left-panel />
            <template-draw-panel />
            <template-right-panel />
        </div>
    </div>
</template>

<script>
     import header from './components/header.vue';
     import rightPanel from './components/rightPanel.vue';
     import drawPanel from './components/drawPanel.vue';
     import leftPanel from './components/leftPanel.vue';

     // registry components
     export default {
        components:{
            'template-header':header,
            'template-right-panel':rightPanel,
            'template-draw-panel':drawPanel,
            'template-left-panel':leftPanel
        }
     }
</script>