import Vue from 'vue';
const App = require('./app.vue');
import './entry.less';

Vue.component('my-component', {
  template: '<div>123</div>'
})
new Vue({
    el: '#app',
    render: h => h(App)
});