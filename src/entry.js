import Vue from 'vue';

import App from './app.vue';
import store from './store/index';

import './entry.less';
import 'element-ui/lib/theme-default/index.css';

import ElementUI from 'element-ui';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});