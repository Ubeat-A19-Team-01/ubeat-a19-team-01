<template>
    <div>
       <v-card
            class="mx-auto"
            :color="color"
            dark
            max-width="400"
          v-on:click="$emit('DisplayArtist',id)"
        >
            <v-card-title>
                <v-icon
                    large
                    left
                >
                   {{icon}}
                </v-icon>
                <span class="title font-weight-light">{{Artist.primaryGenreName}}</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold"> </v-card-text>
            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                        <v-img
                            class="elevation-6"
                            :src="avatar"
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{Artist.artistName}}</v-list-item-title>
                    </v-list-item-content>
                    <v-row
                        align="center"
                        justify="end"
                    >
                        <v-icon class="mr-1">mdi-heart</v-icon>
                        <span class="subheading mr-2"></span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">mdi-share-variant</v-icon>
                        <span class="subheading"></span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import API_ENDPOINT from "../../api/GetEndPoint.js";  
    export default {
        props:['id','color','icon'],
        name: "cardArtist" ,
        inject:['myArtists'] ,
        data(){
            return{
            Artist:{artistName:'',primaryGenreName:''},
            avatar:'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
            }
        },
       async created() {
           const {result} =await this.myArtists.getArtistsById(API_ENDPOINT,this.id) ; 
           const dataArtiste = result ; 
           this.Artist={artistName:dataArtiste[0].artistName,primaryGenreName:dataArtiste[0].primaryGenreName};
        },
    }
</script>

<style scoped>
.font-weight-bold {
    color: black;
}
</style>