<template>
  <v-container fluid class="main-bg">
    <v-row align="center" justify="center" style="height: 100vh">
      <v-card
        class="mx-auto justify-center text-center sign-up-card"
        elevation="2"
        outlined
      >
        <v-form ref="login" v-model="valid" class="ma-5 pa-5" lazy-validation>
          <h1 class="text-center">Log in</h1>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="teal"
            class="mr-4 my-5"
            @click="logIn"
          >
            Log in
          </v-btn>
          <p>Don't have an account? <a href="./sign-up">Sign up</a></p>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 4) || "Must be more than 5 characters",
    ],
  }),

  methods: {
    logIn() {
      const valid = this.$refs.login.validate();
      if (valid) {
        axios
          .post("/auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$store.commit("setToken", response.data.token);
            this.$store.commit("setArtist", response.data.artist);
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("artist", response.data.artist.fullname);
            this.$router.push("/");
          })
          .catch((error) => {
            alert(error.response.data.msg);
          });
      }
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: #1e1e1eee;
  width: 360px;
}

a {
  text-decoration: none;
}
</style>