import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { LibrariesList } from './state';
import actions from './actions';
//import getters from './getters';
import mutations from './mutations';

const libraryModule: Module<LibrariesList, StateInterface> = {
  namespaced: true,
  actions,
  //getters,
  mutations,
  state
};

export default libraryModule;
