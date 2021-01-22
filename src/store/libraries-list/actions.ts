import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import {LibrariesState} from './state';
import {LibraryService} from "../../servies/service"
import {SearchModel} from "src/types/common";
import {Library} from "src/types/service";

const actions: ActionTree<LibrariesState, StateInterface> = {
  async getLibraries ({commit}, searchModel: SearchModel) {
    try {
      let librariesList: Library[] = await LibraryService.getLibraries(searchModel)
      commit('setLibrary', librariesList);
      //commit('setSearchModel', searchModel)
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

