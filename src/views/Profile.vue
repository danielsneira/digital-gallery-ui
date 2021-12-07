<template>
  <v-container fluid class="main-bg">
    <div class="text-center">
      <div class="text-center">
        <CloudinaryWidget @new-post="newPost" />
      </div>
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
  name: "Profile",

  components: { Art, CloudinaryWidget },

  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getArtByArtist();
  },
  methods: {
    getArtByArtist() {
      let artistId = this.$store.state.artist._id;
      axios
        .get(`/art/artist/${artistId}`)
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    newComment() {
      this.getArtByArtist();
    },
    newPost() {
      this.getArtByArtist();
    },
  },
};
</script>
