import { MutationTree } from 'vuex';
import {LibrariesState} from './state';

const mutation: MutationTree<LibrariesState> = {
  setState: (state, newState:LibrariesState)=> {
    state.search = newState.search
    state.librariesList = newState.librariesList
  }
}

export default mutation;
