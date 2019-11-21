<template>
  <v-app>
    <router-view></router-view>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  inject: ['myPlaylists', 'myArtists'],
  data: () => ({
    // 
    
  }),
};
</script>

<style scoped>
  .body {
    background-color: white;
  }
</style>

