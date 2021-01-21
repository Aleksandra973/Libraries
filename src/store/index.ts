import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
//import libraryModule from './module-example'
import currentLibraryModule from './current-library'
import {CurrentLibrary} from "src/store/current-library/state";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  currentLibraryModule: CurrentLibrary;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      currentLibraryModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
