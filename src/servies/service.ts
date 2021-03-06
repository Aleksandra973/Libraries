
import axios from "axios";
import {CurrentLibraryResponse, Library, LibraryResponse, CurrentLibrary} from "src/types/service";
import {SearchModel, SortDirection} from "src/types/common";



export class LibraryService {

  static server_address = 'http://195.54.213.13:3001';

  private static getQueryParams(searchModel: SearchModel) {
    let config: any = { params: { _start: searchModel.pagination.startRows(), _limit: searchModel.pagination.rowsPerPage } };

    if (searchModel.sortableOptions?.sortField?.length > 0) {
      config.params['_sort'] = this.libraryServicePropertyMap.get(searchModel.sortableOptions.sortField as string);
      config.params['_order'] = searchModel.sortableOptions.sortDirection == SortDirection.Asc ? 'asc' : 'desc';
    }

    if(searchModel?.filterValue?.length ?? 0 > 0){
      config.params[this.libraryServicePropertyMap.get('place') as string] = searchModel.filterValue;
    }

    return config;
  };

  public static async getLibrary (id: string): Promise<CurrentLibrary | null> {
    try {
      let response = await axios.get<CurrentLibraryResponse[]> (`${this.server_address}/libraries`,
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
  };
  public static async getLibraries (searchModel: SearchModel): Promise<Library[]> {
    try {
      let config: any = this.getQueryParams(searchModel);
      let response = await axios.get<LibraryResponse[]> (`${this.server_address}/libraries`, config);
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
  };
  private static libraryServicePropertyMap: Map<string, string> = new  Map<string, string>([
    ["place", "data.general.locale.name"],
    ["name", "data.general.name"],
    ["street","data.general.address.street"],
    ["organization", "data.general.organization.name"],
    ["site", "data.general.contacts.website"],
    ["inn", "data.general.organization.inn"]
  ]);



  public static async getDbLength (searchModel: SearchModel): Promise<number> {
    let config: any = this.getQueryParams(searchModel);
    let response = await axios.get<LibraryResponse[]> (`${this.server_address}/libraries`, config);
    let length: number = +response.headers['x-total-count']
    return length
  }
}
