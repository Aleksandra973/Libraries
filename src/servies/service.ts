
import axios from "axios";
import {Library, LibraryResponse} from "src/types/service";
import {SearchModel} from "src/types/common";


export async function getDbLength (): Promise<number> {
  let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries?_start=1&_limit=1', {});
  let length: number = +response.headers['x-total-count']
  return length
}

let libraryServicePropertyMap: Map<string, string> = new  Map<string, string>([
  ["place", "data.general.locale.name"]
])

export async function getLibraries (searchModel: SearchModel) {
  try {
    let config: any = {params: {_start: searchModel.pagination.startRows(), _limit: searchModel.pagination.rowsPerPage}};

    if(searchModel.filterValue){
      config.params["data.general.name"] = searchModel.filterValue;
    }
    if(searchModel.sortableOptions?.sortField?.length > 0){
      config.params['_sort'] = libraryServicePropertyMap.get(searchModel.sortableOptions.sortField ?? '');
      config.params['_order'] = searchModel.sortableOptions.sortDirection
    }
    let response = await axios.get<LibraryResponse[]> ('http://localhost:3000/libraries',config);
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
