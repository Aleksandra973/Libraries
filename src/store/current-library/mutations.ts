import { MutationTree } from 'vuex';
import {CurrentLibrary} from './state';

const mutation: MutationTree<CurrentLibrary> = {
  setLibrary: (state, library)=> {
    state = library
  }
};

export default mutation;
