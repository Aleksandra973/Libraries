export interface CurrentLibraryResponse {
  data: {
    general: {
      name: string,
      description: string,
      address: {
        fullAddress: string
      }
      contacts: {
        email: string,
        phones: [
          {value: string}
        ]
      },
      image: {
        url: string
      },

    }

  },

}
export interface CurrentLibrary {
  name: string;
  fullAddress: string;
  description: string;
  email: string;
  phone?: string;
  image: string;
}

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
