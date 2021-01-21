<template>
  <div id="q-app">
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
});
</script>
