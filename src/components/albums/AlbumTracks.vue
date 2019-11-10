<template>    
<v-data-table :headers="headers" :items="trackList" class="elevation-1">
              <template slot="items"   slot-scope="{item}">
                  <tr>          
                  <td class="text-xs-right" >{{item.trackNumber}}</td>
                  <td class="text-xs-right">{{item.trackName}}</td>
                  <td class="text-xs-right">{{item.artistName}}</td>
                  <td class="text-xs-right">{{millisToMinutes(item.trackTimeMillis)}}</td>
                  <td class="text-xs-right">
                       <span>
                <a href="#">
                    <v-icon>play-circle</v-icon>
                 
                </a>
              </span>
                  </td>
                </tr>
              

              </template>
            </v-data-table>

</template>
<script>
import API_ENDPOINT from "../../api/GetEndPoint.js";  
import {getTracksByAlbumsById } from '../../api/Albums';
export default {
     props:['AlbumId'],
      data() {
    return {
       
       headers:[
                  {text:'#',value:'#'},
                  {text:'Title',value:'Title'},
                  {text:'Artist',value:'Artist'},
                  {text:'Lenght',value:'Lenght'},
                  {text:'Play',value:'Play'},

              ],
      trackList: [      
        
      ]
    };
  },
   methods: {
    millisToMinutes: function(timeMillis) {
      let result = "";
      let minutes = parseInt(timeMillis / 60000);
      let seconds = timeMillis % 60000;
      seconds = (seconds + "").slice(0, 2);
      result = minutes + "." + seconds;
      return result;
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