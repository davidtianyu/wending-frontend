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
Vue.component('AppHeader', AppHeader);
export default {
  name: 'App'
}
</script>

<style>

</style>
