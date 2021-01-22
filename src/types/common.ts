export class Pagination {
  page: number = 1;
  rowsPerPage: number = 10;
  rowsNumber: number = 10;

  startRows = function(this: Pagination): number { return (this.page-1) * this.rowsPerPage}

}

export enum SortDirection {
  Asc,
  Desc
}

export class SortableOptions {
  sortField: string = '';
  sortDirection: SortDirection =  SortDirection.Asc;
}

export class SearchModel {
  filterField: string = '';
  filterValue: string = '';
  pagination: Pagination = new Pagination()
  sortableOptions: SortableOptions = new SortableOptions();
}
