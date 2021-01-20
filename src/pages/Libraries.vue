<template>
  <div>
    <div class="text-h2">Libraries</div>
    <LibraryList></LibraryList>
    <button @click="test">test</button>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from '@vue/composition-api';
import LibraryList from "components/LibraryList.vue";



let test = async function () {
  await this.$store.dispatch("libraryModule/getLibraries");
}

export default defineComponent({
  name: "Libraries",
  components: {LibraryList},
  setup() {
    return {test}
  }
})
</script>

<style scoped>

</style>
