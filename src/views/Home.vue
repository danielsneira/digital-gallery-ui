<template>
  <v-container fluid class="main-bg">
    <div class="text-center">
        <CloudinaryWidget 
          @new-post="newPost"
        />
    </div>

    <div v-if="posts" class="posts">
      <div v-for="(post, index) in posts" :key="index">
        <Art
          @new-comment="newComment"
          :_id="post._id"
          :artist="post.artist"
          :caption="post.caption"
          :comments="post.comments"
          :image="post.image"
          :likes="post.likes"
          :createdAt="post.createdAt"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Art from "../components/art.vue";
import CloudinaryWidget from "../components/cloudinaryWidget.vue";

export default {
  name: "Home",

  components: { Art, CloudinaryWidget },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.getArt();
  },
  methods: {
    newComment(){
      this.getArt();
    },
    newPost(){
      this.getArt();
    },
    getArt() {
      axios
        .get("/art/", {})
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
