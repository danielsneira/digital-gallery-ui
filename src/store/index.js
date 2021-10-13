import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    accessToken: '',
    artist: {}
  },
  mutations: {
    setToken(state, accessToken){
      state.accessToken = accessToken;
      sessionStorage.setItem("accessToken", accessToken);
            
    },
    setArtist(state, artist){
      state.artist = artist;
      sessionStorage.setItem("artist", artist.fullname);
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
