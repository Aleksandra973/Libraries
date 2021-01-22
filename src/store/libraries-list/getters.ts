import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import {LibrariesState} from './state';

const getters: GetterTree<LibrariesState, StateInterface> = {

  libraries(state) {
    return state.librariesList;
  },
  search(state) {
    return state.search;
  }
};

export default getters;
