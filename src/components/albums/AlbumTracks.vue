<template>    
<v-data-table :headers="headers" 
  :items="trackList" 
   class="elevation-1" 
   show-select   
   :single-select="singleSelect" 
   v-model="selected"
   item-key="trackNumber">
   
    <template v-slot:top>
      <v-toolbar flat color="white">       
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
      </v-toolbar>
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
             
            </v-data-table>

</template>
<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import {getTracksByAlbumsById } from '../../api/Albums';
import  Player from '../common/Player';        
        

export default {
     props:['AlbumId'],
      
      data() {
    return {
      singleSelect: false,
        selected: [],
       dialog: false,
       trackItem: {              
      },
      
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
        
      ]
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
      }
  },
    created() {
         getTracksByAlbumsById(API_ENDPOINT,this.AlbumId).then(
        response =>{
             let datatrack=response ; 
             if(datatrack.resultCount>0) 
             {
             this.trackList= datatrack.results ;    

             }
        } )   
  }
    
}
</script>