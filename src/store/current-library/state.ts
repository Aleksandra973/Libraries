import {CurrentLibrary} from "src/types/service";


export interface CurrentLibraryState {
  currentLibrary?: CurrentLibrary
}

export function state(): CurrentLibraryState  {
  return  {
    currentLibrary: undefined
  }
}

/*
function state(): CurrentLibrary{
  return {
    name: '',
    fullAddress: '',
    description: '',
    email: '',
    phone: '',
    image: '',
  }

};*/


export default state;
