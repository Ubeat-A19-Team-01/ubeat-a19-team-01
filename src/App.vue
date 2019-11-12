<template>
  <v-app>
    <Navigation/>
    <v-content class="body">
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/common/Navigation";


export default {
  name: 'App',
  components: {
    Navigation,
  },
  inject: ['myPlaylists', 'myArtists'],
  data: () => ({
    // 
    
  }),
};
</script>

<style scoped>

</style>

