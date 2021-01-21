<template>
  <div>
    <div class="text-h3 main-title q-pa-md">Каталог библиотек</div>
    <LibrariesList></LibrariesList>


  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from '@vue/composition-api';
import LibrariesList from "components/LibrariesList.vue";




let test = async function () {
  await this.$store.dispatch("libraryModule/getLibraries");
  //$store.state.libraryModule.libraries
}

export default defineComponent({
  name: "Libraries",
  components: {LibrariesList},
  setup() {
    return {test}
  },

})
</script>

<style scoped>


</style>
