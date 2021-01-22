
import axios from "axios";
import {CurrentLibraryResponse, Library, LibraryResponse} from "src/types/service";
import {SearchModel, SortDirection} from "src/types/common";
import {CurrentLibrary} from "src/types/service";



export async function getDbLength (searchModel: SearchModel): Promise<number> {
  let config: any = getQueryParams(searchModel);
  let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries', config);
  let length: number = +response.headers['x-total-count']
  return length
}

let libraryServicePropertyMap: Map<string, string> = new  Map<string, string>([
  ["place", "data.general.locale.name"],
  ["name", "data.general.name"],
  ["street","data.general.address.street"],
  ["organization", "data.general.organization.name"],
  ["site", "data.general.contacts.website"],
  ["inn", "data.general.organization.inn"]
])

export async function getLibraries (searchModel: SearchModel): Promise<Library[]> {
  try {
    let config: any = getQueryParams(searchModel);
    let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries', config);
    let librariesResponse: LibraryResponse[] = response.data


    let libraryList: Library[] = librariesResponse.map(x => {
      return {
        id: x?._id,
        name: x?.data?.general?.name,
        place: x?.data?.general?.locale?.name,
        street: x?.data?.general?.address?.street,
        organization: x?.data.general?.organization?.name,
        site: x?.data?.general?.contacts?.website,
        inn: x?.data?.general?.organization?.inn
      } as Library
    })
   return libraryList
  } catch (e){
    console.log(e)
    return e;
  }
}
function getQueryParams(searchModel: SearchModel) {
  let config: any = { params: { _start: searchModel.pagination.startRows(), _limit: searchModel.pagination.rowsPerPage } };

  /*if (searchModel.filterValue) {
    config.params["data.general.locale.name"] = searchModel.filterValue;
  }*/

  if (searchModel.sortableOptions?.sortField?.length > 0) {
    config.params['_sort'] = libraryServicePropertyMap.get(searchModel.sortableOptions.sortField as string);
    config.params['_order'] = searchModel.sortableOptions.sortDirection == SortDirection.Asc ? 'asc' : 'desc';
  }

if(searchModel?.filterValue?.length ?? 0 > 0){
  config.params[libraryServicePropertyMap.get('place') as string] = searchModel.filterValue;
}

  return config;
}

export async  function getLibrary (id: string): Promise<CurrentLibrary | null> {
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
    return currentLibrary
  } catch (e){
    console.log(e)
    return null
  }
}
