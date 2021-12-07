<template>
  <v-app>
    <app-header></app-header>
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import AppHeader from "@/components/common/Header.vue";
import CountTo from 'vue-count-to';
Vue.component('AppHeader', AppHeader);
Vue.component('CountTo', CountTo);
export default {
  name: 'App'
}
</script>

<style>

</style>
