<template>
<v-card  :elevation="hover ? 24 : 6" href="#">
        <v-img>
          
        </v-img>
      <v-card-title>{{ AlbumTitle }}</v-card-title>
      <v-card-subtitle>{{ ArtistName}}</v-card-subtitle>
      <v-card-text>{{GenreName}}</v-card-text>   

</v-card> 
</template>

<script>
    export default {
        props:['AlbumTitle','ArtistName','GenreName'],
        name: "Album"
    }
</script>

<style scoped>

</style>