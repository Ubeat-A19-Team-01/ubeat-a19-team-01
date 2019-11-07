<template>
<v-container fluid>
    <v-layout wrap row justify-space-between>
    <v-flex>
  <Album :AlbumId=Id  ></Album>
  </v-flex>
    </v-layout>
</v-container>
  
  
</template>

<script>
import Album from '../albums/Album.vue'
    export default {
        name: "Home",
        components:{
            Album
        } , 
         data :() =>(
            {
              Id:'929463779'
            }

        )
    }
</script>

<style scoped>

</style>