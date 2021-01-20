import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import {Library, LibraryResponse, LibrariesList} from './state';
import axios from 'axios';

const actions: ActionTree<LibrariesList, StateInterface> = {
  async getLibraries ({commit}, start, rowPerPage) {
    try {
      let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries',
        {params: {_start: start, _limit: rowPerPage}});
      let librariesResponse: LibraryResponse[] = response.data


      let libraryList: Library[] = librariesResponse.map(x => {
        return {
          name: x.data.general.name,
          place: x.data.general.locale.name,
          street: x.data.general.address.street,
          organization: x.data.general.organization.name,
          site: x.data.general.contacts.website,
          inn: x.data.general.organization.inn
        } as Library
      })
      commit('setLibraries', libraryList);
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

