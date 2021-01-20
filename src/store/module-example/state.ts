export interface LibraryResponse {
  data: {
    general: {
      name: string,
      address: {
        street: string
      }
      contacts: {
        website: string
      },
      locale: {
        name: string
      },
      organization: {
        name: string,
        inn: number
      }
    }

  },

}
export interface Library {
  name: string;
  place: string;
  street: string;
  organization: string;
  site?: string;
  inn: number;
}

export interface LibrariesList{
  libraries: Library[]
}

function state(): LibrariesList{
  return {
    libraries: [] as Library[]
  }

};


export default state;
