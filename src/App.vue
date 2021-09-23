<template>
  <v-app>
    <v-app-bar
      v-if="this.$store.state.accessToken"
      app
      color="transparent"
      dark
    >
      <router-link to="/">Digital Gallery</router-link>
      <v-spacer></v-spacer>
      <v-btn @click="logout" to="login" replace text>
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Exit</span>
      </v-btn>
      <span>{{ artist }}</span>
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
    artist: localStorage.getItem("artist"),

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
      localStorage.clear();
      this.$store.commit("setToken", "");
    },
    checkToken() {
      let tokenLocal = localStorage.getItem("accessToken");
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
};
</script>

<style>
.main-bg {
  background-image: linear-gradient(180deg, #262626cc, #353535cc),
    url("./assets/bg-image.jpg");
  background-color: black;
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  height: 100vh;
}

a {
  text-decoration: none;
  color: #fff;
}

router-link {
  color: white;
}
</style>