import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import {CurrentLibraryState} from './state';

const getters: GetterTree<CurrentLibraryState, StateInterface> = {
 // someAction (/!* context *!/) {
    // your code
  //}
  library(state) {
    return state.currentLibrary;
  },
};

export default getters;
