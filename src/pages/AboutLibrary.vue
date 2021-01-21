<template>

<div>
  <span class="text-h4">{{library.name}}</span>
  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-12"><label>Адрес:</label> </div>
    <div class="col-md-8 col-sm-8 col-xs-12">{{library.fullAddress}}</div>
  </div>

  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-12"><label>Описание:</label> </div>
    <div class="col-md-8 col-sm-8 col-xs-12" v-html="library.description">{{library.description}}</div>
  </div>

  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-12"><label>Email:</label> </div>
    <div class="col-md-8 col-sm-8 col-xs-12">{{library.email}}</div>
  </div>

  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-12"><label>Телефон:</label> </div>
    <div class="col-md-8 col-sm-8 col-xs-12">{{library.phone}}</div>
  </div>

  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-12"><label>КДПВ:</label> </div>
    <div class="col-md-8 col-sm-8 col-xs-12"><img v-bind:src="library.image"/> </div>
  </div>

</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import {CurrentLibrary} from "src/store/current-library/state";


export default {
name: "AboutLibrary",
  computed: {
    library : {
      get() { return this.$store.getters["currentLibraryModule/library"] ?? {} as CurrentLibrary }
    }
  }
}

//console.log(this.$store.getters.library)

</script>

<style scoped>
  label {
    font-size: 16px;
    font-weight: 500;
  }

  img {
    max-width: 100%;
  }
</style>
