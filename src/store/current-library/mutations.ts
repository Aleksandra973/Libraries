import { MutationTree } from 'vuex';
import {CurrentLibraryState} from './state';
import {CurrentLibrary} from "src/types/service";

const mutation: MutationTree<CurrentLibraryState> = {
  setLibrary: (state, library:CurrentLibrary)=> {
    state.currentLibrary = library
  }
};

export default mutation;
