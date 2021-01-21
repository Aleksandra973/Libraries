import { MutationTree } from 'vuex';
import {CurrentLibrary, CurrentLibraryState} from './state';

const mutation: MutationTree<CurrentLibraryState> = {
  setLibrary: (state, library:CurrentLibrary)=> {
    state.currentLibrary = library
  }
};

export default mutation;
