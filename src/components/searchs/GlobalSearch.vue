<template>
    <div>

     <v-container class="body font-weight-bold">
             <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Albums" :key="item.collectionId">
                 
                <v-card >           
            <v-card-title >{{item.collectionName}}</v-card-title>
            <v-card-subtitle>{{item.primaryGenreName +"/"+ item.country + " - " + item.artistName }}</v-card-subtitle>
             <v-card-actions>
               <v-icon @click="OnAlbumClick(item.collectionId)" >mdi-library-music</v-icon>  
                <PlaylistDialog  :albumId="item.collectionId"   :add="'album'"/>             
            </v-card-actions>
          </v-card> 
                </v-col>
            </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Artists" :key="item.artistId" >
                 
                    <v-card>           
            <v-card-title >{{item.artistName}}</v-card-title>
            <v-card-subtitle>{{item.primaryGenreName }}</v-card-subtitle>     
             <v-card-actions>
               <v-icon @click="OnArtistClick(item.artistId)"> mdi-artist</v-icon>            
            </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
          <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Tracks" :key="item.trackId">
                    <v-card>           
            <v-card-title >{{item.trackName  + "  "+ "("+ item.primaryGenreName  +")"  }}</v-card-title>
            <v-card-subtitle>{{item.artistName + " - " + item.collectionName +"("+ item.country +")" }} </v-card-subtitle>  

            <v-card-actions>
             <v-icon> mdi-music</v-icon>
             <PlaylistDialog  :trackIt="item" :add="'track'"/>
              
            </v-card-actions>
          </v-card>
                </v-col>
          </v-row>

                 <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in Results.Users" :key="item.id">
                    <v-card  >           
            <v-card-title >{{item.name}}</v-card-title>         
           
             <v-card-subtitle>{{item.email}}</v-card-subtitle>

            <v-card-actions>
             <v-icon> mdi-account</v-icon>
             <v-btn class="ma-2" outlined color="indigo" @click="OnFlowmeClick(item.id)" >follow me</v-btn>
              
            </v-card-actions>
          </v-card>
                </v-col>
            </v-row>     
           
        </v-container> 


    </div>
    
</template>
<script>
import _ from 'underscore';
import PlaylistDialog from '../common/PlaylistDialog'
import API_ENDPOINT_SECURE from '../../api/GetSecureEndPoint' ; 
export default {
    inject:['myUsers','myCookie'] ,    
    props:['searchResult','searchResultUsers'] ,
    components:{PlaylistDialog}  , 
    data(){
      return {
         currentUser: localStorage.getItem('currentUser') 
      }
    } , 
    
    computed:{

       Results:function(){
           const obj = this.searchResult;
           const Tracks  = _.where(obj.results,{wrapperType:"track"}); 
           const Albums = _.where(obj.results,{wrapperType:"collection"})
           const Artists = _.where(obj.results,{wrapperType:"artist"}) ;
           const Users = this.searchResultUsers; 
  
        return {Tracks:Tracks,Albums:Albums,Artists:Artists,Users:Users}; 
            
       } , 
      token()
    {
      return this.myCookie.get(this.currentUser) ; 
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

      },      
      OnFlowmeClick(id)   
      {
        try
        {
          this.myUsers.flowUser(API_ENDPOINT_SECURE,this.token,id) ; 

        }
        catch(err)
        {
         alert(err)
        }
      }
    




    },


}
</script>