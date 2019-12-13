<template>
  <v-app class="barre">
    <router-view/>
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
  .barre {
    border-top: #1976D2 solid 7px;
  }
</style>

