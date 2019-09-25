
import './js/common.js'
import './assets/css/main.css'
//import './fonts/HelveticaNeueCyr/stylesheet.css'
import './assets/scss/main.scss'

//import './js/common' - Можно и без точки

//import 'vue' // Такая запись актуальна для Модуля, т.к. Webpack найдет все в package.json
//import Vue from 'vue' // Так тоже можно
//import 'bootstrap/dist/css/bootstrap.css' // Можно и css импортировать

window.Vue = require('vue'); // Это алиас к vue/dist/vue.js, который указан в base.conf 
import store  from './store/store.js';

//import example from '~/example/Example'; // тильда ~  - это алиас к src, который указан в base.conf 

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
  store: store,
  el: '#app'
});
