<template>
  <div>
    <div class="text-h2 main-title">Libraries</div>
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
  .main-title {
    margin-top: 30px;
    margin-bottom: 40px;
    font-weight: 350;
  }

</style>
