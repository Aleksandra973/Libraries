<template>
  <div>
    <div class="text-h2">Libraries</div>
    <LibrariesList></LibrariesList>
    <button @click="test">test</button>

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
