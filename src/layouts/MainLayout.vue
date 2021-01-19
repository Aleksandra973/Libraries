<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>

    </q-header>



    <q-page-container class="container">

      <router-view />

    </q-page-container>
  </q-layout>
</template>

<script lang="ts">




import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);


    return {leftDrawerOpen}
  }
});
</script>
