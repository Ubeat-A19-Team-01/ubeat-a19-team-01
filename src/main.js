import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from"./router"
import PlayLists from "./api/PlayLists";
import Artists from "./api/Artists";
import Albums from "./api/Albums";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  provide: () => ({
    myPlaylists: new PlayLists(),
    myArtists: new Artists(),
    myAlbums: new Albums()
  }),
  render: h => h(App)
}).$mount('#app');
