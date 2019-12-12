<template>    
<v-data-table :headers="headers" 
  :items="trackList" 
   class="elevation-1" 
   show-select   
   :single-select="singleSelect" 
   v-model="selected"
   item-key="trackNumber"
   >
    <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ trackItem.trackName }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <Player :Musicfile="trackItem.previewUrl" />
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>      
            </v-card-actions>
          </v-card>
        </v-dialog>    
    </template>
   <template v-slot:item.action="{item }">
      <v-icon
        medium
        class="mr-2" 
        @click="playTrack(item)"
      >
     play_circle_filled
      </v-icon>
    </template>
    <template  v-slot:footer>
        <v-row align="center" class="ml-4" >
             <v-col class="d-flex" cols="12" sm="6">
            <v-select v-if="selected.length>0"
              v-model="playlistSelect"
              :items="dataItemsSelect"
              label="Select PlayList"
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-btn v-if="playlistSelect.length>0 && selected.length>0" v-on:click="AddToPlayList">Add to PlayList</v-btn>
          </v-col>
           </v-row>
           <v-row>
           <v-col>
              <v-alert
              v-model=alert
              :color=messageInfo.color
                  dismissible
                  type="success"
                >
                 {{messageInfo.text}}
              </v-alert>
             </v-col>
        </v-row>
      </template>        
 </v-data-table>
</template>
<script>
import API_ENDPOINT_SECURE from '../../api/GetSecureEndPoint' ; 
import  Player from '../common/Player';
export default {
     props:['AlbumId'],
     inject: ['myPlaylists','myAlbums','myCookie'],      
      data() {
    return {
      singleSelect: false,       
       alert :false ,   
       messageInfo:{color:'' ,text:''} ,            
       selected: [],
       dialog: false,      
       trackItem: {              
      },
      dataItemsSelect:[],
      playlistSelect:[], 
      playlists: [],
      tracks: [],
       headers:[
           {text: '(All)',
            align: 'left',
            sortable: false,
            value: ''},
                  {text:'#',value:'trackNumber'},
                  {text:'Title',value:'trackName'},
                  {text:'Artist',value:'artistName'},
                  {text:'Lenght',value:'trackTimeMillis'},
                  {text:'Play',value:'action',sortable:false},
              ],
      trackList: [
      ],
       users: {
               name: localStorage.getItem('currentUser') , 
              email: localStorage.getItem('currentemail')   
              //password: "19Team28"
            }
      };
  },
  components:{Player} ,
   methods: {
    millisToMinutes: function(timeMillis) {
      let result = "";
      let minutes = parseInt(timeMillis / 60000);
      let seconds = timeMillis % 60000;
      seconds = (seconds + "").slice(0, 2);
      result = minutes + "." + seconds;
      return result;
    }   ,
    playTrack(item)
    {
     this.trackItem = Object.assign({},item);
     this.dialog=true ; 
    },
   
    close () {
        this.dialog = false;
        setTimeout(() => {
          this.trackItem = {trackName:'',previewUrl:''};
         
        }, 300)
      },
       AddToPlayList()
      {
        try
        {
        this.selected.forEach(track=>
          {

          const trackItem =   {
                playlistId: this.playlistSelect,
                wrapperType: track.wrapperType,
                artistId: track.id,
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
            };
            this.myPlaylists.addPlaylistsTracksById(API_ENDPOINT_SECURE, this.playlistSelect, trackItem,this.token);
            this.alert=true ;             
             this.messageInfo.color="success" ; 
             this.messageInfo.text="Track(s) has been added "
         }  
       ) ; 
       }   
       catch(e)  
       {
         this.alert=true ;             
         this.messageInfo.color="error" ; 
         this.messageInfo.text=e
       }
      },
  },
  computed:{
    token()
    {
      return this.myCookie.get(this.users.name) ; 
    }
  }
  ,
  async  created() {
         
         this.myAlbums.getTracksByAlbumsById(API_ENDPOINT_SECURE,this.AlbumId,this.token).then(
        response =>{
             let datatrack=response ; 
             if(datatrack.resultCount>0) 
             {
             this.trackList= datatrack.results;
             }
        });

     const {playlistsT, tracks} = await this.myPlaylists.getPlaylists(API_ENDPOINT_SECURE,this.token);
        this.playlists = playlistsT.filter(({owner}) => this.users.email === owner.email);
        this.tracks = tracks;
        
       this.playlists.forEach(el=>
       {
         const itemS={text:el.name,value:el.id} ; 
         this.dataItemsSelect.push(itemS) ;
       })
  }
}
</script>