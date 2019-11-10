<template>
    <div>
        <v-container>
            <h4  v-if="resultFilter.length ===0"  class="mb-2"> Please wait a few seconds loading....</h4>
            <v-progress-linear
                    indeterminate
                    color="green darken-2"
                    v-if="resultFilter.length ===0"
                    class="mb-2"
            >

            </v-progress-linear>
            <v-data-table
                    :headers="headers"
                    :items="resultFilter"
                    :item-key="artists.artistId"

                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Artist Photo</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            @click="getPlaylistId(item)"
                    >
                        mdi-checkbox-marked-circle
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">No Data Right Now</v-btn>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: "Artist",
        inject: ['myArtists'],
        data: () => ({
            url: `https://ubeat.herokuapp.com/unsecure/`,
            id: 3941697,
            artists: [],
            resultFilter: [],
            resultCount: '',
            headers: [
                {
                    text: 'Result Count',
                    align: 'left',
                    sortable: false,
                    value: 'resultCount',
                },
                {
                    text: 'Wrapper Type',
                    align: 'left',
                    sortable: false,
                    value: 'wrapperType',
                },
                { text: 'Artist Type', value: 'artistType' },
                { text: 'Artist Name', value: 'artistName' },
                { text: 'Artist Link Url', value: 'artistLinkUrl' },
                { text: 'Artist Id', value: 'artistId' },
                { text: 'Amg Artist Id', value: 'amgArtistId' },
                { text: 'Primary Genre Name', value: 'primaryGenreName' },
                { text: 'Primary Genre Id', value: 'primaryGenreId' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
        }),
        async created(){
            try{
                const {result} = await this.myArtists.getArtistsById(this.url, this.id);
                this.resultFilter = result;

                //this.resultFilter.push({resultCount})
                //this.myArtists.getAlbumsByArtistsId(this.url, this.id).then(data => this.artists.push(data));
                //this.myArtists.getAlbumsByArtistsId(this.url, this.id).then(data => this.artists = Object.keys(data).map((k) => data[k]))
            }catch(e){
                alert(e)
            }
        },
        computed: {
            result: function(){
                return this.artists.results
            }
        },
        methods: {

            getPlaylistId (playlistId) {
                try{
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myArtists.getAlbumsByArtistsId(this.url).then( () => {
                        this.getPlaylist.name = name;
                        this.getPlaylist.email = this.playlists[playlistIndex].owner.email;
                    });
                }catch(e){
                    alert(e)
                }
            },
        },
    }
</script>

<style scoped>

</style>