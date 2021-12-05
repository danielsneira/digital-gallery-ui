<template>
  <v-app>
    <v-app-bar
      v-if="this.$store.state.accessToken"
      app
      dark
    >
      <router-link to="/">Digital Gallery</router-link>
      <v-spacer></v-spacer>
      <router-link to="/profile">{{ this.$store.state.artist.fullname }}</router-link>
      <v-spacer></v-spacer>
      <v-btn @click="logout" to="login" replace text>
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Exit</span>
      </v-btn>
    </v-app-bar>
    <v-main class="main-bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data: () => ({
    //
  }),
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      document.title = to.meta.title || "Digital Gallery";
    },
    immediate: true,
  },
  created() {
    this.checkToken();
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$store.commit("setToken", "");
    },
    checkToken() {
      let tokenLocal = sessionStorage.getItem("accessToken");
      const CURRENT_ROUTE = this.$router.currentRoute.name;
      if (tokenLocal) {
        this.$store.commit("setToken", tokenLocal);
        this.accessToken = tokenLocal;
      }
      let tokenVuex = this.$store.state.accessToken;
      if (
        !tokenVuex &&
        CURRENT_ROUTE !== "Login" &&
        CURRENT_ROUTE !== "Sign up"
      ) {
        return this.$router.push("login");
      }
    },
  },
  computed: {
    artist() {
      return sessionStorage.getItem("artist")
    }
  }
};
</script>

<style>
.main-bg {
  background-color: #0a0a0a;

}

a {
  text-decoration: none;
  color: #fff;
}

router-link {
  color: white;
}
</style>