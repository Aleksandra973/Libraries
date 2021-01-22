import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
//import libraryModule from './module-example'
import currentLibraryModule from './current-library'
import librariesListModule from './libraries-list'
import {CurrentLibrary, Library} from "src/types/service";


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  currentLibraryModule: CurrentLibrary;
  librariesListModule: Library[];
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      currentLibraryModule,
      librariesListModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
