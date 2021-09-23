import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    artist: {}
  },
  mutations: {
    setToken(state, accessToken){
      state.accessToken = accessToken;
    },
    setArtist(state, artist){
      state.artist = artist;
    }
  },
  actions: {
    setToken(context, accessToken){
      context.commit('setToken', accessToken);
    },
    setArtist(context, artist){
      context.commit('setArtist', artist);
    }
  },
  modules: {
  }
})
