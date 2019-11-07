<template>
<v-card href="#" width="200px">
        <v-img :src="Album.AlbumCoverImg" aspect-ratio="1"       
        >
          
        </v-img>
      <v-card-title>{{Album.AlbumTitle }}</v-card-title>
      <v-card-subtitle>{{ Album.ArtistName}}</v-card-subtitle>      
      <v-card-text>{{Album.GenreName}}</v-card-text>   

</v-card> 
</template>

<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import {getAlbumsById} from '../../api/Albums'
    export default {
        props:['AlbumId'],
        name: "Album",
        data :() =>(
            {
              Album:{
                  AlbumTitle:'',
                  ArtistName:'',
                  GenreName:'',
                  AlbumCoverImg:''

              } 
            }

        )
        ,
        created() 
        {
           getAlbumsById(API_ENDPOINT,this.AlbumId).then(
              response=>{
                 
                  let dataAlbum=response ; 
                  if(dataAlbum.resultCount!=0)
                  {
                  this.Album.AlbumTitle = dataAlbum.results[0].collectionName ; 
                  this.Album.ArtistName = dataAlbum.results[0].artistName ; 
                  this.Album.GenreName=dataAlbum.results[0].primaryGenreName;
                  this.Album.AlbumCoverImg=dataAlbum.results[0].artworkUrl100;

                  }

                


              }
          )
        }
    }
</script>

<style scoped>

</style>