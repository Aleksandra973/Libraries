<template>
  <div class="q-pa-md">
    <q-table
      title="Каталог"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="search.pagination"
      :filter="search.filterValue"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="search.filterValue" placeholder="Search">
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
import {getLibraries, getDbLength} from '../servies/service'
import {SearchModel, SortableOptions} from "src/types/common";


export default defineComponent({
  name: "LibrariesList",
  data() {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'place',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      search: new SearchModel(),
      columns: [
        {name: 'name', label: 'Название библиотеки', align: 'left', field: 'name', sortable: true},
        {name: 'place', align: 'center', label: 'Местоположение', field: 'place', sortable: true},
        {name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true},
        {name: 'organization', align: 'center', label: 'Юридическое лицо', field: 'organization', sortable: true},
        {name: 'site', align: 'center', label: 'Сайт', field: 'site', sortable: true},
        {name: 'inn', align: 'center', label: 'ИНН', field: 'inn', sortable: true}
      ],
      data: [],

    }
  },
  async mounted(): Promise {
    // get initial data from server (1st page)
    this.pagination.rowsNumber = await getDbLength()
    await this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
    this.search.sortableOptions = new SortableOptions()
    this.search.sortableOptions.sortField = 'place'
  },
  methods: {
    async onRequest(props): Promise {
      const {page, rowsPerPage, sortBy, descending} = props.pagination
      const filter = props.filter

      console.log(sortBy)
      console.log(descending)
      this.pagination.descending = true;

      // emulate server
      /*setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)
*/
      // don't forget to update local pagination object

      this.search.pagination.page = page

      this.pagination.rowsNumber = await getDbLength()
      this.search.pagination.rowsNumber = this.pagination.rowsNumber
      debugger
      if (sortBy?.length > 0) {
        this.search.sortableOptions?.sortField = sortBy;
      }

      this.data = await getLibraries(this.search)

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter(row => row.name.includes(filter))
        : this.original.slice()

      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          )
          : (descending
              ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
              : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
    }
  }


})
</script>

<style scoped>

</style>
