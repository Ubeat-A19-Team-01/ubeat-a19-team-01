<template>
    <div>
        <Navigation/>
        <v-content class="body">
            <router-view></router-view>
        </v-content>
        <v-container class="body font-weight-bold" v-if="connected === true">
            <v-row align="center" class="mt-10">
                <h5 class="display-1"> Albums</h5>
            </v-row>
             <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in items" :key="item.color">
                  <app-card-album :id=item.albumId :color=item.color v-on:DisplayAlbum="OnDisplayAlbum(item.albumId )">
                  </app-card-album>
                </v-col>
            </v-row>
            <v-row align="center" class="mt-10">
                <h5 class="display-1"> Artists</h5>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="3" v-for="item in artists" :key="item.color" >
                    <app-card-artist :id=item.ArtistId :color=item.color  :icon=item.icon  v-on:DisplayArtist="OnDisplayArtist(item.ArtistId)" >
                    </app-card-artist>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import cardArtist from "./cardArtist";
    import cardAlbum from "./cardAlbum";
    import Navigation from "../common/Navigation";
    export default {
        name: "Home",
        components: {
            appCardArtist: cardArtist,
            appCardAlbum: cardAlbum,
            Navigation,
        },
        data: () => ({
            items: [{albumId:929463779 , color:'#952170'},
                    {albumId:303156530 , color:'#952175'},
                    {albumId:159292399 , color:'#c51162'},
                    {albumId:254528681 , color:'880e4f'}
            ],

        artists: [
            {ArtistId:140083,color:'#26c6da',icon:'mdi-music'},
            {ArtistId:3941697,color:'#4a148c',icon:'mdi-music'},
            {ArtistId:116851,color:'#c51162',icon:'mdi-music'},
            {ArtistId:3996865,color:'#4a149c',icon:'mdi-music'}
        ],
         connected: true
        }),
        methods:{
             OnDisplayAlbum(id)
             {
                 this.$router.push('/Album/'+id)
             },
             OnDisplayArtist(id){
                 this.$router.push('/artist/'+id) ;
             }
        }
    }
</script>

<style scoped>
.font-weight-bold {
    color: black;
}
</style>