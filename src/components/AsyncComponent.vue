<template>
  <div>{{ index }} - {{sent}}</div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from '@vue/composition-api';

export default defineComponent({
  name: "AsyncComponent",
  props: {
    index: Number,
    sent: Boolean
  },
  data() {
    return {
      asyncContent: null
    }
  },

  beforeMount() {
    this.timer = setTimeout(() => {
      this.asyncContent = {
        sent: this.sent,
        name: this.sent === true ? 'me' : 'Someone else',
        avatar: this.sent === true ? 'https://cdn.quasar.dev/img/avatar4.jpg' : 'https://cdn.quasar.dev/img/avatar3.jpg',
        stamp: `${Math.floor(this.index / 1000)} minutes ago`,
        text: [`Message with id ${this.index}`]
      }
    }, 200 + Math.random() * 2000)
  },

  beforeDestroy() {
    clearTimeout(this.timer)
  },

  render(h) {
    if (this.asyncContent === Object(this.asyncContent)) {
      return h('q-chat-message', {
        staticClass: 'q-mx-sm',
        key: this.index,
        props: this.asyncContent
      })
    } else {
      const content = [
        h('q-skeleton', {
          staticClass: 'on-left on-right',
          props: {animation: 'none', type: 'text', width: '150px', height: '100px'}
        })
      ]

      content[this.sent === true ? 'push' : 'unshift'](
        h('q-skeleton', {props: {animation: 'none', type: 'QAvatar'}})
      )

      return h('div', {
        staticClass: `row no-wrap items-center q-mx-sm justify-${this.sent === true ? 'end' : 'start'}`,
        style: 'height: 78px',
        key: this.index
      }, content)
    }
  }
})
</script>

<style scoped>

</style>
