import { MutationTree } from 'vuex';
import { Library } from './state';

const mutation: MutationTree<Library> = {
 //someMutation (/* state: ExampleStateInterface */) {
    // your code
  //}
  setLibraries: (state, libraries) => {
    state.libraries = libraries;
  }
};

export default mutation;
