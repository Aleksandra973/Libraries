
import axios from "axios";



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

export async function getDbLength () {
  let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries?_start=1&_limit=1', {});
  let length = +response.headers['x-total-count']
  return length
}

export async function getLibraries (start: number, rowPerPage: number) {
  try{
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
   return libraryList
  } catch (e){
    console.log(e)
    return e;
  }
}
