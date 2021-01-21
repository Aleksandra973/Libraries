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
