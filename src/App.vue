<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      document.title = to.meta.title || "";
    },
    immediate: true
  },
};
</script>

<style>
</style>