<template>
    <div>    
            <v-container class="body font-weight-bold">
             <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Albums" :key="item.collectionId">
                  <app-card-album :id="item.collectionId" v-on:DisplayAlbum="OnDisplayAlbum(item.collectionId )">
                  </app-card-album>
                </v-col>
            </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Artists" :key="item.artistId" >
                    <app-card-artist :id=item.artistId   v-on:DisplayArtist="OnDisplayArtist(item.artistId)" >
                    </app-card-artist>
                </v-col>
            </v-row>
          <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Tracks" :key="item.trackId">
                    <v-card    color="#385F73" dark >           
            <v-card-title >{{item.trackName}}</v-card-title>

            <v-card-subtitle>{{item.artistName}}</v-card-subtitle>

            <v-card-actions>
               <v-icon> mdi-music</v-icon> 
              
            </v-card-actions>
          </v-card>
                </v-col>
            </v-row>     


           
        </v-container>
    </div>
</template>
<script>
 import _ from 'underscore';
  import cardArtist from "../common/cardArtist";
  import cardAlbum from "../common/cardAlbum";
export default {
    props:['searchResult'] ,
    components:{
            appCardAlbum: cardAlbum,
            appCardArtist: cardArtist
            } , 
   
    
    computed:{

       Results:function(){
           const obj = this.searchResult;
           const Tracks  = _.where(obj.results,{wrapperType:"track"}); 
           const Albums = _.where(obj.results,{wrapperType:"collection"})
           const Artists = _.where(obj.results,{wrapperType:"artist"}) ;
           const Users = _.where(obj.results,{wrapperType:"user"}) ; 
  
        return {Tracks:Tracks,Albums:Albums,Artists:Artists,Users:Users}; 
            
       }


    }
    ,methods: {
          OnDisplayAlbum(id)
             {
                 this.$router.push('/Album/'+id)
             },
               OnDisplayArtist(id){
                 this.$router.push('/artist/'+id) ;
             }, 

         


    },
}
</script>