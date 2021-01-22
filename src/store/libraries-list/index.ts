import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, {LibrariesState} from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const librariesListModule: Module<LibrariesState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default librariesListModule;
