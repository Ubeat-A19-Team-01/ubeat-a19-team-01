<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn    v-on="on" ><v-icon>mdi-playlist-plus</v-icon></v-btn>
      </template>
      <v-card>  
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
           <v-select 
              v-model="playlistSelect"
              :items="dataItemsSelect"
              label="Select PlayList"
              dense class="mt-4"
            ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="AddToPlayList">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import API_ENDPOINT_SECURE from '../../api/GetSecureEndPoint' ; 
export default {
    props:['albumId','trackIt','add'] , 
     inject:['myPlaylists','myCookie','myAlbums'] , 
      data () {
      return {
        dialogm1: '',
        dialog: false,
        playlistSelect:[], 
        dataItemsSelect:[],
        trackList:[] ,       
         users: {
              name: localStorage.getItem('currentUser') , 
              email: localStorage.getItem('currentemail')             
            }
      }
    },
    computed: {
        token()
    {
      return this.myCookie.get(this.users.name) ; 
    }
    },
    
     async  created() {
       

         if(this.albumId!=undefined)
         {
         this.myAlbums.getTracksByAlbumsById(API_ENDPOINT_SECURE,this.albumId,this.token).then(
        response =>{
             let datatrack=response ; 
             if(datatrack.resultCount>0) 
             {
             this.trackList= datatrack.results;
             }
        });
        }
    
     const {playlistsT, tracks} = await this.myPlaylists.getPlaylists(API_ENDPOINT_SECURE,this.token);
        this.playlists = playlistsT.filter(({owner}) => this.users.email === owner.email);
        this.tracks = tracks;
        
       this.playlists.forEach(el=>
       {
         const itemS={text:el.name,value:el.id} ; 
         this.dataItemsSelect.push(itemS) ;
       })
  } , 
  methods: {
   createTrackObjet(playlistId,track) 
   {

    const trackItem =   {
                playlistId: playlistId,
                wrapperType: track.wrapperType,
                artistId: track.artistId,
                kind: track.kind,
                collectionId: track.collectionId,
                trackId: track.trackId,
                artistName: track.artistName,
                collectionName:track.collectionName,
                trackName:track.trackName ,
                collectionCensoredName: track.collectionCensoredName,
                trackCensoredName: track.trackCensoredName,
                artistViewUrl: track.artistViewUrl,
                collectionViewUrl:track.collectionViewUrl ,
                trackViewUrl:track.trackViewUrl,
                previewUrl: track.previewUrl,
                artworkUrl30: track.artworkUrl30,
                artworkUrl60:track. artworkUrl60,
                artworkUrl100: track.artworkUrl100,
                collectionPrice:track.collectionPrice,
                trackPrice:track.trackPrice,
                releaseDate: track.releaseDate,
                collectionExplicitness: track.collectionExplicitness,
                trackExplicitness: track.trackExplicitness,
                discCount: track.discCount,
                discNumber: track.discCount,
                trackCount: track.trackCount,
                trackNumber: track.trackNumber,
                trackTimeMillis:track.trackTimeMillis,
                country: track.country,
                currency: track.currency,
                primaryGenreName: track.primaryGenreName,
                contentAdvisoryRating: track.contentAdvisoryRating,
                radioStationUrl: ''
    } 
       
    return trackItem ;
   }
 , 
    AddToPlayList()
      {
           
      if(this.add=='album') 
      {
        try
        {
        this.trackList.forEach(track=>
          {
       
            this.myPlaylists.addPlaylistsTracksById(API_ENDPOINT_SECURE, this.playlistSelect, this.createTrackObjet(this.playlistSelect,track),this.token);
           
         }  
       ) ; 
       }   
       catch(e)  
       {
         alert(e)          
        
       }
       }
       else 
       {         
    
            this.myPlaylists.addPlaylistsTracksById(API_ENDPOINT_SECURE, this.playlistSelect,this.createTrackObjet(this.playlistSelect,this.trackIt),this.token);

       }    

       this.dialog = false ; 


      }    
  },
}
</script>