import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/mutations';
import actions from '@/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: 1,
    totalPages: 10,
  },
  mutations: { ...mutations },
  actions: { ...actions },
});
