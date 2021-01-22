import {Library} from "src/types/service";
import {Pagination, SearchModel, SortableOptions} from "src/types/common";

export interface LibrariesState {
  librariesList?: Library[],
  search?: SearchModel
}

export function state(): LibrariesState  {
  let search = new SearchModel();
  search.pagination.page = 1;
  search.pagination.rowsPerPage = 10;

  return  {
    librariesList: undefined,
    search: search
  }
}




export default state;
