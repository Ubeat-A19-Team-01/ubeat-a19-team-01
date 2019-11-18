<template>
  <div class="componentPage">
    <div class="container">
      <div class="albumDataContainer">
        <div class="albumImageContainer">
          <img
            v-bind:src="albumData.artworkUrl100" alt="album"
          />
          <a
            v-bind:href="albumData.collectionViewUrl"
            style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2007-11-14&kind=album&bubble=apple_music) no-repeat;width:158px;height:45px;"
          ></a>
        </div>
        <div class="albumTableDescription">
          <table>
            <tr>
              <td>Album:</td>
              <td>{{albumData.collectionName}}</td>
            </tr>
            <tr>
              <td>Artist:</td>
              <td><router-link :to=getArtistRoute>{{albumData.artistName}}</router-link></td>
            </tr>
            <tr>
              <td>Release Date:</td>
              <td>{{convertDate(albumData.releaseDate)}}</td>
            </tr>
            <tr>
              <td>Genre:</td>
              <td>{{albumData.primaryGenreName}}</td>
            </tr>
            <tr>
              <td>{{albumData.trackCount}} songs</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="albumTracksContainer">
        <AlbumTracks :AlbumId="AlbumId" ></AlbumTracks>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumTracks from '../albums/AlbumTracks.vue';
import API_ENDPOINT from "../../api/GetEndPoint.js";
export default {
    components:{AlbumTracks},
    inject: ['myAlbums'] ,       
  data() {
    return {
      routeArtist : '' ,   
      AlbumId:this.$route.params.id , 
      albumData: {
      }
    };
  },
  computed:{
      getArtistRoute()
      {
       return '/artist/'+this.albumData.artistId
      }
  },
   methods: {    
    convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  let d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
}
  },
  created() {
        this.myAlbums.getAlbumsById(API_ENDPOINT,this.AlbumId).then(
    response => {
        let dataAlbum=response ;
        if(dataAlbum.resultCount!==0)                  {
            this.albumData = dataAlbum.results[0] ;
        }
     })
  }  
};
</script>

<style scoped>
.componentPage {
  width: 100%;
}

.container {
  margin-top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

/* Album image and description */
.albumDataContainer {
  min-width: 300px;
  flex: 1;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}
/* image */
.albumImageContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  align-items: center;
}
.albumImageContainer > img {
  width: 200px;
  overflow: hidden;
  margin: 10px;
}
.albumImageContainer > a {
  margin-top: 10px;
  margin-bottom: 10px;
}

/* description */
.albumTableDescription {
  min-width: 200px;
  margin: 0 auto;
}
.albumTableDescription > table {
  border-collapse: separate;
  border-spacing: 20px 3px;
}
.albumTableDescription > td {
  padding-left: 30px;
}

/* Tracks */
.albumTracksContainer {
  padding: 15px;
  flex: 4;
  margin-top: 10px;
}

/* .albumTracksContainer .artistName:hover  {
  font: red;
} */

a {
  color: rgb(54, 54, 54);
}

a:hover {
  color: rgba(214, 38, 61, 0.882);
}
</style>
