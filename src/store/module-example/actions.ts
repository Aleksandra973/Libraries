import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { Library } from './state';
import axios from 'axios';

const actions: ActionTree<Library, StateInterface> = {
  async getLibraries ({commit}) {
    try {
      let libraries = await axios ('http://localhost:3000/libraries', {
        method: 'GET'
      });

      commit('setLibraries', libraries.data);
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

