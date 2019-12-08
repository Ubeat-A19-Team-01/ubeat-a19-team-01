<template>

    <div>
  <v-container>
      <v-content>
 <v-list two-line subheader>
      <v-subheader inset>Albums</v-subheader>

      <v-list-item
        v-for="item in Results.Albums"
        :key="item.collectionId"       
      >
        <v-list-item-avatar>
          <v-icon           
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.collectionName"></v-list-item-title>
          <v-list-item-subtitle >{{item.primaryGenreName +"/"+ item.country }}</v-list-item-subtitle>      
           <v-list-item-subtitle >{{item.releaseDate}} </v-list-item-subtitle>         
           <v-list-item-subtitle v-text="item.copyright"></v-list-item-subtitle>

        </v-list-item-content>
      
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>Artists</v-subheader>

      <v-list-item
        v-for="item in Results.Artists"
        :key="item.artistId"  
      >
        <v-list-item-avatar>
          <v-icon     
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.artistName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.primaryGenreName"></v-list-item-subtitle>
        </v-list-item-content>

    
      </v-list-item>
         <v-divider inset></v-divider>

      <v-subheader inset>Tracks</v-subheader>

      <v-list-item
        v-for="item in Results.Tracks"
        :key="item.trackId"  
      >
        <v-list-item-avatar>
          <v-icon     
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.trackName"></v-list-item-title>
          <v-list-item-subtitle>{{"Artist :"+item.artistName}} </v-list-item-subtitle>
          <v-list-item-subtitle>{{"Album :"+item.collectionName}} </v-list-item-subtitle>
          <v-list-item-subtitle>{{item.primaryGenreName +"/"+item.country}} </v-list-item-subtitle>       
        </v-list-item-content>

    
      </v-list-item>
         <v-divider inset></v-divider>

      <v-subheader inset>Users</v-subheader>
     
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
           const  obj = this.searchResult;
           const   Tracks  = _.where(obj.results,{wrapperType:"track"}); 
           const  Albums = _.where(obj.results,{wrapperType:"collection"})
           const Artists = _.where(obj.results,{wrapperType:"artist"}) ;
           const Users = _.where(obj.results,{wrapperType:"user"}) ; 
  
        return {Tracks:Tracks,Albums:Albums,Artists:Artists,Users:Users}; 
            
       }

    }


}
</script>