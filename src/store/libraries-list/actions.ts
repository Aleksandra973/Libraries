import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import {CurrentLibraryResponse, CurrentLibrary, CurrentLibraryState} from './state';
import axios from 'axios';

const actions: ActionTree<CurrentLibraryState, StateInterface> = {
  async getLibrary ({commit}, id) {
    try {
      let response = await axios.get<CurrentLibraryResponse[]> ('http://localhost:3000/libraries',
        {params: {_id: id}});
      let currentLibrariesResponse: CurrentLibraryResponse = response.data[0]


      let currentLibrary: CurrentLibrary = {
        name: currentLibrariesResponse?.data?.general?.name,
        fullAddress: currentLibrariesResponse?.data?.general?.address?.fullAddress,
        description: currentLibrariesResponse?.data?.general?.description,
        email: currentLibrariesResponse?.data?.general?.contacts?.email,
        phone: currentLibrariesResponse?.data?.general?.contacts?.phones?.length > 0
          ? currentLibrariesResponse?.data?.general?.contacts?.phones[0].value
          : '',
        image: currentLibrariesResponse?.data?.general?.image?.url,
      }
      commit('setLibrary', currentLibrary);
    } catch (e){
      console.log(e)
      return e;
    }
  }
};

export default actions;

