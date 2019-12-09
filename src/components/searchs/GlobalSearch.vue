<template>
    <div>
  <v-container>
      <v-content>
 <v-list three-line subheader shapped>
      <v-subheader inset >Albums</v-subheader>
      <v-list-item
        v-for="item in Results.Albums"
        :key="item.collectionId"      
      >     
       <v-list-item-icon>
         <v-icon @click="OnAlbumClick(item.collectionId)"> mdi-library-music</v-icon>
         </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.collectionName" :to="'/album/'+item.collectionId">           
          </v-list-item-title>
          <v-list-item-subtitle >{{item.primaryGenreName +"/"+ item.country }}</v-list-item-subtitle>      
           <v-list-item-subtitle >{{item.releaseDate}} </v-list-item-subtitle>         
           <v-list-item-subtitle v-text="item.copyright"></v-list-item-subtitle>

        </v-list-item-content>
      
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset >Artists</v-subheader>

      <v-list-item
        v-for="item in Results.Artists"
        :key="item.artistId"  
      >
          <v-list-item-icon>
         <v-icon @click="OnArtistClick(item.artistId)"> mdi-artist</v-icon>
         </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.artistName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.primaryGenreName"></v-list-item-subtitle>
        </v-list-item-content>

    
      </v-list-item>
         <v-divider inset></v-divider>

      <v-subheader inset >Tracks</v-subheader>

      <v-list-item
        v-for="item in Results.Tracks"
        :key="item.trackId"  
      >
     
          <v-list-item-icon>
         <v-icon> mdi-music</v-icon>
         </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.trackName"></v-list-item-title>
          <v-list-item-subtitle>{{"Artist :"+item.artistName}} </v-list-item-subtitle>
          <v-list-item-subtitle>{{"Album :"+item.collectionName}} </v-list-item-subtitle>
          <v-list-item-subtitle>{{item.primaryGenreName +"/"+item.country}} </v-list-item-subtitle>       
        </v-list-item-content>

    
      </v-list-item>
         <v-divider inset></v-divider>

      <v-subheader inset>Users</v-subheader>

      <v-list-item
        v-for="item in Results.users"
        :key="item.id"  
      >      
          <v-list-item-icon>
         <v-icon> mdi-account</v-icon>
         </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle>{{item.email}} </v-list-item-subtitle>            
        </v-list-item-content>

    
      </v-list-item>
    </v-list>
  
 
      </v-content>
  </v-container>
    </div>
    
</template>
<script>
import _ from 'underscore';
export default {
    props:['searchResult'] ,
   
    
    computed:{

       Results:function(){
           const obj = this.searchResult;
           const Tracks  = _.where(obj.results,{wrapperType:"track"}); 
           const Albums = _.where(obj.results,{wrapperType:"collection"})
           const Artists = _.where(obj.results,{wrapperType:"artist"}) ;
           const Users = _.where(obj.results,{wrapperType:"user"}) ; 
  
        return {Tracks:Tracks,Albums:Albums,Artists:Artists,Users:Users}; 
            
       }

    },
    methods: {
      OnAlbumClick(AlbumId)
      {
        this.$router.push('/album/'+AlbumId)  ;
      } ,
      OnArtistClick(ArtistId)
      {
        this.$router.push('/artist/'+ArtistId)  ;

      }

    },


}
</script>