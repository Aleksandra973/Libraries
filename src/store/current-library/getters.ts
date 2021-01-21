import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import {CurrentLibrary} from './state';

const getters: GetterTree<CurrentLibrary, StateInterface> = {
 // someAction (/!* context *!/) {
    // your code
  //}
  library(state) {
    return state;
  },
};

export default getters;
