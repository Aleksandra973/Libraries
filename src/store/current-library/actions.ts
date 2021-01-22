import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import {CurrentLibraryState} from './state';
import {getLibrary} from "../../servies/service"
import {CurrentLibrary} from "src/types/service";

const actions: ActionTree<CurrentLibraryState, StateInterface> = {
  async getLibrary ({commit}, id) {
    try {
      let currentLibrary: CurrentLibrary | null = await getLibrary(id);
      if (currentLibrary ===null) {
        currentLibrary = {} as CurrentLibrary
      }
      commit('setLibrary', currentLibrary);
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

