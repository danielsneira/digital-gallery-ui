<template>
  <v-container class="main-bg">
    <v-row align="center" justify="center" style="height: 100vh">
      <v-card
        class="mx-auto justify-center text-center sign-up-card"
        elevation="2"
        outlined
      >
        <v-form ref="signup" v-model="valid" class="ma-5 pa-5" lazy-validation>
          <h1 class="text-center">Sign up</h1>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

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

          <v-text-field
            v-model="rePassword"
            :rules="rePasswordRules"
            label="Password confirm"
            type="password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="teal"
            class="mr-4 my-5"
            @click="signUp"
          >
            Sign Up
          </v-btn>
          <p>Have an account? <router-link to="./login">Log in</router-link></p>
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
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 5) || "Must be more than 5 characters",
    ],
    rePassword: "",
  }),
  computed: {
    rePasswordRules() {
      return [
        (v) => !!v || "Please repeat the password here",
        (v) => v === this.password || "passwords must match",
      ];
    },
  },

  methods: {
    signUp() {
      const valid = this.$refs.signup.validate();
      if (valid) {
        axios
          .post("/auth/sign-up", {
            fullname: this.name,
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push("/login");
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