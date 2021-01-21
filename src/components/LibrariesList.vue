<template>
  <div class="q-pa-md">
    <q-table
      title="Каталог"
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
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from '@vue/composition-api';
import { SearchModel, SortDirection } from 'src/types/common';
import {getLibraries, getDbLength} from '../servies/service'


export default defineComponent({
  name: "LibrariesList",
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
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
          sortable: true
        },
        { name: 'place', align: 'center', label: 'Местоположение', field: 'place', sortable: true },
        { name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true },
        { name: 'organization', align: 'center', label: 'Юридическое лицо', field: 'organization', sortable: true },
        { name: 'site', align: 'center', label: 'Сайт', field: 'site', sortable: true },
        { name: 'inn', align: 'center', label: 'ИНН', field: 'inn', sortable: true }
      ],
      data: [],

    }
  },
  async mounted (): Promise {
    // get initial data from server (1st page)
    this.pagination.rowsNumber = await getDbLength(this.search)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    async onRequest (props): Promise {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      console.log(filter)

      this.loading = true
      //this.pagination.rowsNumber = getDbLength()
      const startRow = (page - 1) * rowsPerPage

      this.search.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage
      this.search.sortableOptions.sortField = sortBy;
      this.search.sortableOptions.sortDirection = descending === true ? SortDirection.Desc : SortDirection.Asc

      if(filter?.length > 0){
        this.search.filterValue = filter
      } else {
        this.search.filterValue = undefined
      }

      this.data = await getLibraries(this.search) as any
      this.pagination.rowsNumber = await getDbLength(this.search)

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // ...and turn of loading indicator
      this.loading = false

    } 
  }
})
</script>

<style scoped>

</style>
