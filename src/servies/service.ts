
import axios from "axios";
import {Library, LibraryResponse} from "src/types/service";
import {SearchModel, SortDirection} from "src/types/common";
import { LibrariesList } from "src/store/module-example/state";


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

