<template>
  <div>
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
</template>

<script>
import axios from "axios";

export default {
  name: "cloudinaryWidget",
  props: {},
  data() {
    return {
      dialog: false,
      imageUrl: "",
      caption: "",
    };
  },
  methods: {
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
          this.$emit("new-post");
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
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
</style>