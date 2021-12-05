<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title>{{ artist.fullname }}</v-card-title>

      <v-spacer></v-spacer>

      <v-img :src="image"></v-img>

      <v-card-text>
        <div>{{ artist.fullname }}: "{{ caption }}"</div>
      </v-card-text>
      <v-spacer></v-spacer>
      <div v-if="comments && comments.length > 0" class="comment">
        <v-card v-for="(comment, index) in comments" :key="index">
          <p class="artist-name">{{ comment.artist.fullname }}</p>
          <p class="artist-comment">{{ comment.comment }}</p>
        </v-card>
      </div>
      <v-card-actions>
        <v-text-field
          label="agregar comentario..."
          v-model="comment"
        ></v-text-field>
        <v-btn color="deep-purple lighten-2" text @click="postComment(index)">
          comment
        </v-btn>
        <v-btn icon :color="color" @click="toggleLike">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Art",
  props: {
    _id: String,
    artist: {},
    comments: [],
    comment: String,
    likes: [],
    caption: String,
    image: String,
    createdAt: String,
    color: String,
  },
  data() {
    return {}
  },
  methods: {
    toggleLike() {
      this.like = !this.like;
      this.like ? (this.color = "purple") : (this.color = "white");
    },
    postComment(index) {
      let artId = this.posts[index]._id;
      axios
        .post("/art/comment", {
          artId: artId,
          artist: this.$store.state.artist._id,
          comment: this.comment,
        })
        .then(() => {
          alert("comentario añadido");
          this.comment = "";
          this.getArt();
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>