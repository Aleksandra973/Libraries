import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import {Library, LibraryList} from './state';
import axios from 'axios';

const actions: ActionTree<LibraryList, StateInterface> = {
  async getLibraries ({commit}) {
    try {
      let libraries: LibraryList[] = await axios.get<LibraryList> ('http://localhost:3000/libraries?_start=20&_limit=1&_sort=nativeId&order=desc', {});

      var res = [ {name: "123"}, { name: "123"} ]

      var mapped = res.map(x=> {
        return  { name: x.name} as Library
      } )

      commit('setLibraries', libraries);
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

