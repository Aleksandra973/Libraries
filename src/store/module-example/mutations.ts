import { MutationTree } from 'vuex';
import {LibrariesList} from './state';

const mutation: MutationTree<LibrariesList> = {
  setLibraries: (state, libraries) => {
    state.libraries = libraries;
  }
};

export default mutation;
