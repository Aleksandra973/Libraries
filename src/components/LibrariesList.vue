<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort

    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" class="filter-input" placeholder="Введите населенный пункт/район">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <span @click="getInfoWithRedirect(props.row.id)" dense flat class="link-about"> {{props.value}}</span>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {defineComponent,} from '@vue/composition-api';
import {SearchModel, SortDirection} from 'src/types/common';
import {LibraryService} from "../servies/service"
import {Library} from "src/types/service";


export default defineComponent({
  name: "LibrariesList",
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      search: new SearchModel(),
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Название библиотеки',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'text-primary cursor-pointer',
          style: 'white-space: pre-wrap',
          headerStyle: 'font-weight: bold'
        },
        { name: 'place', align: 'center', label: 'Местоположение', field: 'place', sortable: true, headerStyle: 'font-weight: bold' },
        { name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true, headerStyle: 'font-weight: bold'},
        { name: 'organization', align: 'center', label: 'Юридическое лицо', field: 'organization', sortable: true, style: 'white-space: pre-wrap', headerStyle: 'font-weight: bold'},
        { name: 'site', align: 'center', label: 'Сайт', field: 'site', sortable: true, headerStyle: 'font-weight: bold' },
        { name: 'inn', align: 'center', label: 'ИНН', field: 'inn', sortable: true, headerStyle: 'font-weight: bold' }
      ],
      data: [],

    }
  },
  async mounted (): Promise<void> {
    // get initial data from server (1st page)

    let storeSearch = this.$store.getters['librariesListModule/search']
     this.pagination.page = storeSearch.pagination.page
     this.pagination.rowsPerPage = storeSearch.pagination.rowsPerPage
     this.pagination.sortBy = storeSearch.sortableOptions.sortField
     this.pagination.descending = storeSearch.sortableOptions.sortDirection !== SortDirection.Asc
     this.filter = storeSearch.filterValue

    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    getInfoWithRedirect (id: string) {
      this.$store.dispatch('currentLibraryModule/getLibrary', id)
      this.$router.push({ path: '/about'})
    },
    async onRequest (props: any): Promise<void> {

      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter ?? ''

      let storeSearch = this.$store.getters['librariesListModule/search']


      this.loading = true

      console.log(1)

      this.search.pagination.page = page;
      this.search.pagination.rowsPerPage = rowsPerPage;
      this.search.sortableOptions.sortDirection = descending === true ? SortDirection.Desc : SortDirection.Asc


      if(filter?.length > 0){
        this.search.filterValue = filter
      } else {
        this.search.filterValue = ''
      }

      if(sortBy?.length > 0){
        this.search.sortableOptions.sortField = sortBy;
      }

      await this.$store.dispatch('librariesListModule/getLibraries', this.search)

      this.data = this.$store.getters["librariesListModule/libraries"] ?? [] as Library

      this.pagination.rowsNumber = await LibraryService.getDbLength(this.search)

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // ...and turn of loading indicator
      this.loading = false
      var tmp = this.search;

      this.search = new SearchModel()
      this.search.pagination.page = tmp.pagination.page
      this.search.pagination.rowsPerPage = tmp.pagination.rowsPerPage
      this.search.filterValue = tmp.filterField
      this.search.sortableOptions.sortField = tmp.sortableOptions.sortField
      this.search.sortableOptions.sortDirection = tmp.sortableOptions.sortDirection


      console.log(2)
      }
  }
})
</script>

<style scoped>
.link-about{
  text-transform: none
}

.filter-input{
  width: 280px;
}
</style>
