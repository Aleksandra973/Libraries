import { MutationTree } from 'vuex';
import {LibrariesState} from './state';
import {Library} from "src/types/service";
import {SearchModel} from "src/types/common";

const mutation: MutationTree<LibrariesState> = {
  setLibrary: (state, libraries:Library[])=> {
    state.librariesList = libraries
  },
  setSearchModel: (state, searchModel: SearchModel)=>{
  state.search = searchModel
  }
  }
;

export default mutation;
