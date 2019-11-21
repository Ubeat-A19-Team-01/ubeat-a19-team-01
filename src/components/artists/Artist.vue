<template>
  <div class="componentPage">
    <div class="container">
      <h1 class="artistName">{{artist.artistName}}</h1>
      <div class="artistDataContainer">
        <div class="artistImageContainer">
          <a
            :href="artist.artistLinkUrl"
            style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?kind=artist&bubble=apple_music) no-repeat;width:158px;height:45px;"
          ></a>
        </div>
        <div class="artistTableInfo">
          <table>
               <tr>
              <td>Genre</td>
              <td>{{artist.primaryGenreName}}</td>
            </tr>
          </table>
        </div>
      </div>  
      <h1 class="artistAlbumsTitle">Albums</h1>
      <div class="artistAlbumsContainer">
        <ul>
          <li v-for="album in albums" :key="album.collectionId" >
              <app-card-album :id=album.collectionId  v-on:DisplayAlbum="OnDisplayAlbum(album.collectionId)">                 
              </app-card-album>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
   import API_ENDPOINT from "../../api/GetEndPoint.js";  
   import cardAlbum from "../common/cardAlbum";
    export default {
        name: "Artist",
        inject: ['myArtists'],
        components:{ appCardAlbum: cardAlbum} , 
        data: () => ({
            url:API_ENDPOINT ,
            artist: {artistName:'',artistLinkUrl:'',primaryGenreName:''},
            albums:[]             
        }),
        methods:{
             OnDisplayAlbum(id)
             {
                 this.$router.push('/Album/'+id)
             } 
        },
         async created(){
            try{
                const {result} = await this.myArtists.getArtistsById(this.url, this.$route.params.id);
                this.artist = {artistName:result[0].artistName ,artistLinkUrl:result[0].artistLinkUrl,primaryGenreName:result[0].primaryGenreName };
               const dataAlbum =await this.myArtists.getAlbumsByArtistsId(this.url, this.$route.params.id);
                this.albums=dataAlbum.result.slice(0,3) ;
            }catch(e){
                alert(e)
            }
        }
    }
</script>

<style scoped>
.componentPage {
  width: 100%;
}

.container {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.artistName {
  font-size: 3rem;
  text-align: center;
  width: 100%;
}

.artistDataContainer {
  min-width: 300px;
  flex: 1;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.artistImageContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  align-items: center;
}

.artistImageContainer > img {
  border-radius: 35%;
  margin: 10px;
  max-width: 350px;
  overflow: hidden;
  width: 90%;
}

.artistTableInfo {
  align-items: center;
  display: flex;
  font-size: 1em;
  min-width: 200px;
}

.artistTableInfo > table > tr > td {
  padding-left: 15px;
}
.artistAlbumsTitle {
  font-size: 2em;
  padding-top: 20px;
}

.artistAlbumsContainer > ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 20px;
  text-align: center;
}

.artistAlbumsContainer > ul > li {
  max-width: 350px;
  margin: auto;
  margin-bottom: 20px;
}

.artistAlbumsContainer > ul > li > a {
  color: black;
}

.artistAlbumsContainer > ul > li > a:hover {
  color: crimson;
}

.artistAlbumsContainer > ul > li > a > figure {
  margin: 10px;
  max-width: 350px;
  overflow: hidden;
  text-align: center;
}

.artistAlbumsContainer > ul > li > a > figure > img {
  border: 1px solid black;
  border-radius: 3%;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
  max-width: 200px;
  margin: 0;
  padding: 0;
}

.artistAlbumsContainer > ul > li > a > figure > figcaption {
  text-shadow: 1px 1px 3px gray;
}
</style>

