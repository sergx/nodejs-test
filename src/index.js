
import './js/common.js'
import './css/main.css'
import './scss/main.scss'
//import './js/common' - Можно и без точки

//import 'vue' // Такая запись актуальна для Модуля, т.к. Webpack найдет все в package.json
//import Vue from 'vue' // Так тоже можно
//import 'bootstrap/dist/css/bootstrap.css' // Можно и css импортировать

window.Vue = require('vue'); // Вроже вот так пишут

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
  el: '#app'
});
