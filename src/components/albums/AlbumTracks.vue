<template>    
<v-data-table :headers="headers" 
  :items="trackList" 
   class="elevation-1" 
   show-select   
   :single-select="singleSelect" 
   v-model="selected"
   item-key="trackNumber"
   ref="datatrack"
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
        <v-select
          
          :items="dataItemsSelect"          
          label="Select PlayList"
          dense 
          ref="playlistSelect"
          @change="selectedSelectItem"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-btn  v-on:click="AddToPlayList">Add to PlayList</v-btn>
      </v-col>
       </v-row>      
      </template>        
            </v-data-table>

</template>
<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import {getTracksByAlbumsById } from '../../api/Albums';
import  Player from '../common/Player';        
        

export default {
     props:['AlbumId'],
     inject: ['myPlaylists'],      
      data() {
    return {
      singleSelect: false,
      //selectedSelectItem:false ,
          selected: [],
       dialog: false,
       trackItem: {              
      },
      dataItemsSelect:[],
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
     this.trackItem = Object.assign({},item)
     this.dialog=true ; 
    }
    ,
   
      close () {
        this.dialog = false
        setTimeout(() => {
          this.trackItem = {trackName:'',previewUrl:''} ; //Object.assign({}, this.defaultTrackItem)
         
        }, 300)
      },
       AddToPlayList()
      {
        //debugger ; 
        const playlistSelected = this.selectedSelectItem() ; 
        let selectTracks= [] 
        selectTracks= this.selectedTrack() ; 
        alert(selectTracks);

       try
       {
       selectTracks.forEach(track=>
         {

          const trackItem =   {
                playlistId: playlistSelected[1].id,
                wrapperType: track.wrapperType,
                kind: track.kind,
                artistId: track.id,
                collectionId: track.collectionId,
                trackId: track.trackId,
                artistName: track.artistName,
                collectionName:track.collectionName,
                trackName:track.trackName ,
                collectionCensoredName: track.collectionCensoredName,
                trackCensoredName: track.trackCensoredName,
                artistViewUrl: track.artistViewUrl,
                collectionViewUrl:track ,
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
            this.myPlaylists.addPlaylistsTracksById(API_ENDPOINT, playlistSelected[1].id, trackItem)

         }  
       ) ; 
       }   
       catch(e)  
       {
          alert(e)
       }
       
       //   try{
          

      //   }

      //   catch(e)
      //           {

      //  alert(e) ; 
      //           }
       //alert(this.selected.lenght) ; 
       //todo test si pas de track selectionné afficher une notification 
       // sinon on ajoute chaq track selectionné à la play list 
      },
        selectedSelectItem()
     {
      /// return false ; 
       return this.$refs.playlistSelect.selectedItems ;

      //return this.$refs.playlistSelect.selectedItems
      // alert(this.$refs.playlistSelect.selectedItems.length) ; 
       

       
     } ,
     selectedTrack()
     {
      return this.$refs.datatrack.selection ; 
     } 

  },
  async  created() {
         getTracksByAlbumsById(API_ENDPOINT,this.AlbumId).then(
        response =>{
             let datatrack=response ; 
             if(datatrack.resultCount>0) 
             {
             this.trackList= datatrack.results ;    

             }
        } ) ; 
        
         const {playlistsT, tracks} = await this.myPlaylists.getPlaylists(API_ENDPOINT);
                this.playlists = playlistsT;
                this.tracks = tracks
        
       this.playlists.forEach(el=>
       {
         const itemS={text:el.name,value:el.id} ; 
         this.dataItemsSelect.push(itemS) ; 
       })

       
            
               // this.playlists = playlistsT;
              
  }
    
}
</script>