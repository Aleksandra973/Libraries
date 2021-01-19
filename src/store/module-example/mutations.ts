import { MutationTree } from 'vuex';
import { LibraryList } from './state';

const mutation: MutationTree<LibraryList> = {
 //someMutation (/* state: ExampleStateInterface */) {
    // your code
  //}
  setLibraries: (state, libraries) => {
    state.libraries = libraries;
  }
};

export default mutation;
