<template>
    <div>
         <v-card
              class="mx-auto"
              :color=color
              dark
              max-width="400" v-on:click="$emit('DisplayAlbum',id)"
         >
              <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                      <v-card-title
                          class="headline"
                          v-text="Album.collectionName"
                      > </v-card-title>
                      <v-card-subtitle v-text="Album.artistName"></v-card-subtitle>
                  </div>
                  <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                  >
                      <v-img :src="Album.artworkUrl60"></v-img>
                  </v-avatar>
              </div>
         </v-card>
    </div>
</template>

<script>
    import API_ENDPOINT from "../../api/GetEndPoint.js";
    export default {
        inject:['myAlbums'],
        props:['id','color'] , 
        name: "cardAlbum",
        data()
        {
          return {
              Album:{
              }
          }
        },
       created()
       {
        this.myAlbums. getAlbumsById(API_ENDPOINT,this.id).then(
            response=>{                 
            let dataAlbum=response ; 
               if(dataAlbum.resultCount!==0)                  {
                    this.Album = dataAlbum.results[0] ;
                  }
              })
       }
    }
</script>

