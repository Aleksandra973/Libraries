<template>
  <div class="q-pa-md">
    <q-virtual-scroll
      style="max-height: 300px; overflow-x: hidden"
      :items-size="size"
      :items-fn="getItems"
      :virtual-scroll-item-size="40"
      separator
    >
      <template v-slot="{ item, index }">
        <async-component :key="index" :index="item.index" :sent="item.sent"></async-component>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from '@vue/composition-api';
import AsyncComponent from "components/AsyncComponent.vue";


const size = 100000
const allItems = Array(size).fill(null).map((_, index) => ({
  index,
  sent: Math.random() > 0.5
}))

export default defineComponent ({
name: "LibraryList",

  components: {
    AsyncComponent
  },
  data () {
    return {
      size
    }
  },
  methods: {
    getItems (from, size) {

      const items = []

      for (let i = 0; i < size; i++) {
        items.push(allItems[from + i])
      }

      console.log(items.length)

      return Object.freeze(items)
    },
  },

})
</script>

<style scoped>

</style>
