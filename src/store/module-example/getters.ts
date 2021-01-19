import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { Library } from './state';

const getters: GetterTree<Library, StateInterface> = {
 // someAction (/* context */) {
    // your code
  //}
  libraries(state) {
    return state.libraries;
  },
};

export default getters;
