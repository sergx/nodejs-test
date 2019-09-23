import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import example1 from './example1';

export default new Vuex.Store({
  modules:{
    example1: example1
  }
});
