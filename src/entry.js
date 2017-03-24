import Vue from 'vue';
import ElementUI from 'element-ui';
import vueDrag from 'vuejs-drag';

import App from './app.vue';
import store from './store/index';

import './entry.less';
import 'element-ui/lib/theme-default/index.css';

Vue.use(vueDrag);
Vue.use(ElementUI);

new Vue({
	el: '#app',
	store,
	render: h => h(App)
});
