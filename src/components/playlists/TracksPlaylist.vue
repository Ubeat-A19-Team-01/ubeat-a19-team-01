<template>
    <div>
       <!--- {{myTracks}} -->
        <v-container>

            <h4  v-if="myTracks.length ===0"  class="mb-2"> Please wait a few seconds loading....</h4>
            <v-progress-linear
                    indeterminate
                    color="green darken-2"
                    v-if="myTracks.length ===0"
                    class="mb-2"
            >
            </v-progress-linear>
            <v-data-table
                    :headers="headers"
                    :items="myTracks"                 
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>All Tracks Per Playlist</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="secondary" dark class="mb-2 mr-2" v-on="on">Add Track</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Add Track</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.name" label="Playlist Id"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.wrapperType" label="Wrapper Type"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.kind" label="King"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artistId" label="Artist Id"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionId" label="Collection Id"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackId" label="Track Id"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artistName" label="Artist Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionName" label="Collection Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackName" label="Track Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionCensoredName" label="Collection Censored Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackCensoredName" label="Track Censored Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artistViewUrl" label="Artist View Url"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionViewUrl" label="Collection View Url"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackViewUrl" label="Track View Url"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.previewUrl" label="Preview Url"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artworkUrl30" label="Artwork Url 30"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artworkUrl60" label="Artwork Url 60"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.artworkUrl100" label="Artwork Url 100"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionPrice" label="Collection Price"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackPrice" label="Track Price"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.releaseDate" label="Release Date"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.collectionExplicitness" label="Collection Explicitness"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackExplicitness" label="Track Explicitness"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.discCount" label="Disc Count"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.discNumber" label="Disc Number"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackCount" label="Track Count"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackNumber" label="Track Number"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.trackTimeMillis" label="Track Time Millis"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.country" label="Country"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.currency" label="Currency"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.primaryGenreName" label="Primary Genre Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.contentAdvisoryRating" label="Content Advisory Rating"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addTracks.radioStationUrl" label="Radio Station Url"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" @click="save">Add</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
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
        name: "AddPlaylists",
        inject: ['myPlaylists'],
        props: ['playlists'],

        data: () => ({
            url: 'https://ubeat.herokuapp.com/unsecure/',
            playlistsLoaded: true,
            myTracks: [],
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
            addTracks: {
                playlistId: '',
                wrapperType: '',
                kind: '',
                artistId: 0,
                collectionId: 0,
                trackId: 0,
                artistName: '',
                collectionName: '',
                trackName: '',
                collectionCensoredName: '',
                trackCensoredName: '',
                artistViewUrl: '',
                collectionViewUrl: '',
                trackViewUrl: '',
                previewUrl: '',
                artworkUrl30: '',
                artworkUrl60: '',
                artworkUrl100: '',
                collectionPrice: 0,
                trackPrice: 0,
                releaseDate: '',
                collectionExplicitness: '',
                trackExplicitness: '',
                discCount: 0,
                discNumber: 0,
                trackCount: 0,
                trackNumber: 0,
                trackTimeMillis: 0,
                country: '',
                currency: '',
                primaryGenreName: '',
                contentAdvisoryRating: '',
                radioStationUrl: ''
            },
        }),

        computed: {

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created(){
            this.extractTracks()
        },
        methods: {
            extractTracks(){
                for(let element of this.playlists){
                    if(element.tracks.length !== 0){
                        this.myTracks =(element.tracks)
                    }

                }
            },
            deleteItem (playlistId) {
                try{
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.deletePlaylistsByIdAndTrackId(this.url, this.addTracks.trackId, playlistId).then(() => {
                        this.myTracks.splice(playlistIndex, 1)
                    });
                }catch(e){
                    alert(e)
                }
            },
            close () {
                this.dialog = false;

            },

            save () {

                this.close()
            },
        },
    }
</script>

<style scoped>

</style>