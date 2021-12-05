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
          <p>Don't have an account? <router-link to="./sign-up">Sign up</router-link></p>
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
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setArtist", response.data.artist);
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
.main-bg {
  background-image: linear-gradient(180deg, #262626cc, #353535cc),
    url("../assets/bg-image.jpg");
  background-color: black;
  background-size: auto;
  background-repeat: repeat;
  background-position: center;
}

.theme--dark.v-card {
  background-color: #1e1e1eee;
  width: 360px;
}

a {
  text-decoration: none;
}
</style>