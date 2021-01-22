export interface LibraryResponse {
  _id: string,
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
  id: string;
  name: string;
  place: string;
  street: string;
  organization: string;
  site?: string;
  inn: number;
}

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
