import Vue from 'vue'
import axios from "axios";
import VueAxios from 'vue-axios';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api'
//production baseURL
//axios.defaults.baseURL = '/api' 

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)
