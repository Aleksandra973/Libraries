import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { LibraryList} from './state';

const getters: GetterTree<LibraryList, StateInterface> = {
 // someAction (/* context */) {
    // your code
  //}
  libraries(state) {
    return state.libraries;
  },
};

export default getters;
