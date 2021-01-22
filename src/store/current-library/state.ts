import {CurrentLibrary} from "src/types/service";


export interface CurrentLibraryState {
  currentLibrary?: CurrentLibrary
}

export function state(): CurrentLibraryState  {
  return  {
    currentLibrary: undefined
  }
}



export default state;
