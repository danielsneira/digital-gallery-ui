<template>
  <v-container fluid class="main-bg">
    <div class="text-center">
      <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" v-on="on">Crear publicacion </v-btn>
        </template>
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Crea una publicacion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-actions>
            <v-btn dark id="upload_widget" class="post" @click="openWidget">
              Upload files
            </v-btn>
            <v-text-field label="Descripcion" v-model="caption"></v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-btn dark class="align-center" @click="postArt"> Publicar </v-btn>
          </v-card-actions>
          <div id="preview">
            <v-img
              v-if="imageUrl"
              class="img-preview"
              height="300"
              width="200"
              :src="imageUrl"
            ></v-img>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <div v-if="posts" class="posts">
      <v-card
        v-for="(post, index) in posts"
        :key="index"
        class="mx-auto my-12"
        max-width="374"
      >
        <v-card-title>{{ post.artist.fullname }}</v-card-title>

        <v-spacer></v-spacer>

        <v-img :src="post.image"></v-img>

        <v-card-text>
          <div>{{ post.artist.fullname }}: "{{ post.caption }}"</div>
        </v-card-text>
        <v-spacer></v-spacer>
        <div v-if="post.comments && post.comments.length > 0" class="comment">
          <v-card v-for="(comment, index) in post.comments" :key="index">
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
          <v-btn icon :color='color' @click="toggleLike">
            <v-icon >mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  components: {},
  data() {
    return {
      artist: sessionStorage.getItem("artist"),
      dialog: false,
      imageUrl: null,
      caption: "",
      comment: "",
      posts: [],
      color: "white",
      like: false,
    };
  },
  created() {
    this.getArt();
  },
  methods: {
    getArt() {
      axios
        .get("/art/", {})
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    postArt() {
      axios
        .post("/art/upload", {
          artist: this.$store.state.artist._id,
          image: this.imageUrl,
          caption: this.caption,
        })
        .then(() => {
          this.dialog = false;
          alert("Image uploaded successfully");
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
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
    toggleLike(){
      this.like = !this.like;
      this.like ? this.color = 'purple':this.color = 'white'
    },

    openWidget() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "dw9kvdvau",
            upload_preset: "xs3fuayl",
            sources: ["local", "facebook", "instagram", "google_drive"],
            showAdvancedOptions: false,
            cropping: false,
            multiple: false,
            defaultSource: "local",
            styles: {
              palette: {
                window: "#10173a",
                sourceBg: "#20304b",
                windowBorder: "#7171D0",
                tabIcon: "#79F7FF",
                inactiveTabIcon: "#8E9FBF",
                menuIcons: "#CCE8FF",
                link: "#72F1FF",
                action: "#5333FF",
                inProgress: "#00ffcc",
                complete: "#33ff00",
                error: "#cc3333",
                textDark: "#000000",
                textLight: "#ffffff",
              },
              fonts: {
                default: null,
                "'IBM Plex Sans', sans-serif": {
                  url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                  active: true,
                },
              },
            },
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              this.imageUrl = result.info.url;
            }
          }
        )
        .open();
    },
  },
};
</script>

<style scoped>
#preview {
  margin: auto;
  max-width: 500px;
}

.img-preview {
  overflow: hidden;
  margin: auto;
}
.post {
  width: 200px;
  margin: 0 10px;
}

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