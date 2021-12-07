<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title
        >{{ artist.fullname }}
        <v-spacer> </v-spacer>
        <v-btn
          class="text-right"
          :color="followColor"
          text
          @click="toggleFollow"
        >
          {{ followText }}
        </v-btn>
      </v-card-title>

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
        <v-btn color="deep-purple lighten-2" text @click="postComment()">
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
    artist: Object,
    comments: Array,
    likes: Array,
    caption: String,
    image: String,
    createdAt: String,
  },
  data() {
    return {
      comment: "",
      color: "",
      followColor: "deep-purple",
      followText: "follow +",
      like: false,
      follow: false,
    };
  },
  methods: {
    toggleLike() {
      let artId = this._id;
      axios
        .post("/art/like", {
          artId: artId,
          artist: this.$store.state.artist._id,
          like: !this.like,
        })
        .then(() => {
          this.like = !this.like;
          this.like ? (this.color = "purple") : (this.color = "white");
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
    toggleFollow() {
      let follower = this.$store.state.artist._id;
      let following = this.artist._id;

      axios
        .post("/artist/follow", {
          artistFollower: follower,
          artistFollowing: following,
          follow: !this.follow
        })
        .then(() => {
          this.follow = !this.follow;
          this.follow
            ? (this.followColor = "secondary")
            : (this.followColor = "deep-purple");
          this.follow
            ? (this.followText = "following")
            : (this.followText = "follow +");
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
    postComment() {
      let artId = this._id;
      axios
        .post("/art/comment", {
          artId: artId,
          artist: this.$store.state.artist._id,
          comment: this.comment,
        })
        .then(() => {
          alert("comentario añadido");
          this.comment = "";
          this.$emit("new-comment");
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
  },
};
</script>

<style scoped>
.comment {
  width: auto;
  margin-left: 10px;
}

.comment .artist-name {
  font-size: 0.8em;
  font-weight: 600;
}

.comment .artist-comment {
  font-size: 1.2em;
}
</style>