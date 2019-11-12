<template>
    <div>
        <v-container>
            <v-data-table
                    :headers="headers"
                    :items="tracks"                  
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Tracks Per Playlist</v-toolbar-title>
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
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(item)"
                    >
                        delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary">No Data Right Now</v-btn>
                </template>
            </v-data-table>
        </v-container>

    </div>
</template>
<script>
    export default {
        name: "TrackOnlyPerPlaylist",
        inject: ['myPlaylists'],

        data: () => ({
            url: 'https://ubeat.herokuapp.com/unsecure/',
            playlistsLoaded: true,
            tracks: [],
            dialog: false,
            headers: [
                {
                    text: 'Id',
                    align: 'left',
                    sortable: false,
                    value: '_id',
                },
                { text: 'Track Id', value: 'trackId' },
                { text: 'Artist Id', value: 'artistId' },
                { text: 'Collection Id', value: 'collectionId' },
                { text: 'Artist Name', value: 'tracks.artistName' },
                { text: 'Collection Name', value: 'collectionName' },
                { text: 'Track Name', value: 'trackName' },
                { text: 'Collection Censored Name', value: 'collectionCensoredName' },
                { text: 'Artist View Url', value: 'artistViewUrl' },
                { text: 'Collection View Url', value: 'collectionViewUrl' },
                { text: 'Track View Url', value: 'trackViewUrl' },
                { text: 'Preview Url', value: 'previewUrl' },
                { text: 'Collection Price', value: 'collectionPrice' },
                { text: 'Track Price', value: 'trackPrice' },
                { text: 'Release Date', value: 'releaseDate' },
                { text: 'Country', value: 'country' },
                { text: 'Currency', value: 'currency' },
                { text: 'Primary Genre Name', value: 'primaryGenreName' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
        }),

        computed: {

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        async created(){
            try{
                //this.myPlaylists.getPlaylists(this.url).then(data => this.playlists = Object.keys(data).map((k) => data[k]));
                const {tracks} = await this.myPlaylists.getPlaylists(this.url);
                this.tracks = tracks;
            }catch(e){
                alert(e)
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>