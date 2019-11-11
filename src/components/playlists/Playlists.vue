<template>
    <div>
        <v-container>
            <h4  v-if="playlists.length ===0"  class="mb-2"> Please wait a few seconds loading....</h4>
            <v-progress-linear
                    indeterminate
                    color="green darken-2"
                    v-if="playlists.length ===0"
                    class="mb-2"
            >
            </v-progress-linear>
            <v-data-table
                    :headers="headers"
                    :items="playlists"
                    item-key="playlists.id"
                    sort-by="calories"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>All Playlists</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Add Playlist</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Add Playlist</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addPlaylist.name" label="Playlist Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addPlaylist.email" label="Owner Email" type="email"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" @click="addPlaylists">Add</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="editDelete" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit Playlist</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editPlaylist.name" label="Playlist Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editPlaylist.email" label="Owner Email" type="email"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editPlaylist.id" label="Id"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary"  @click="modifyPlaylists(editPlaylist.id, editPlaylist.name)">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="getPlaylistDialog" max-width="600px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Get Playlist</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.id" label="Playlist Id" type="text"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.email" label="Owner Email" type="email"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.ownerName" label="Owner Name" type="text"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.ownerId" label="Owner Id" type="text"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-data-table
                                                        :headers="headersPerPlaylist"
                                                        :items="tracks"
                                                        item-key="tracks.id"
                                                        sort-by="calories"
                                                        class="elevation-1"
                                                >
                                                    <template v-slot:top>
                                                        <v-toolbar flat color="white">
                                                            <v-toolbar-title>Tracks</v-toolbar-title>
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
                                                                @click="editPlaylists(item)"
                                                        >
                                                            edit
                                                        </v-icon>
                                                        <v-icon
                                                                small
                                                                class="mr-2"
                                                                @click="deleteItem(item.id)"
                                                        >
                                                            delete
                                                        </v-icon>
                                                        <v-icon
                                                                small
                                                                @click="getPlaylistId(item)"
                                                        >
                                                            mdi-checkbox-marked-circle
                                                        </v-icon>
                                                    </template>
                                                    <template v-slot:no-data>
                                                        <v-btn color="primary">No Data Right Now</v-btn>
                                                    </template>
                                                </v-data-table>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary"  @click="close">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editPlaylists(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            class="mr-2"
                            @click="deleteItem(item.id)"
                    >
                        delete
                    </v-icon>
                    <v-icon
                            small
                            @click="getPlaylistId(item)"
                    >
                        mdi-checkbox-marked-circle
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary">No Data Right Now</v-btn>
                </template>
            </v-data-table>
        </v-container>
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
                    :headers="headersTrack"
                    :items="myTracks"
                    sort-by="calories"
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
                            @click="deleteItemTrack(item.id)"
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
        name: "Playlists",
        inject: ['myPlaylists'],
        data: () => ({
            url: 'https://ubeat.herokuapp.com/unsecure/',
            playlists: [],
            tracks: [],
            myTracks: [],
            playlistsLoaded: true,
            dialog: false,
            editDelete: false,
            getPlaylistDialog: false,
            headers: [
                {
                    text: 'Playlist Id',
                    align: 'left',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Playlist Name', value: 'name' },
                { text: 'Owner Id', value: 'owner.id' },
                { text: 'Name', value: 'owner.name' },
                { text: 'Emails', value: 'owner.email' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            headersPerPlaylist: [
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
            headersTrack: [
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

            editedIndex: -1,
            addPlaylist: {
                name: '',
                email: '',
            },
            editPlaylist: {
                id: '',
                name: '',
                email: '',
            },
            getPlaylist: {
                id: '',
                name: '',
                email: '',
                ownerName: '',
                ownerId: '',
                track: []
            },
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
                const {playlistsT, tracks} = await this.myPlaylists.getPlaylists(this.url);
                this.playlists = playlistsT;
                this.tracks = tracks
            }catch(e){
                alert(e)
            }
            this.extractTracks()
        },


        methods: {
            editPlaylists (playlistId, name) {
                try{
                    //const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    const index = this.playlists.indexOf(playlistId);
                    this.myPlaylists.modifyPlaylistsById(this.url, playlistId, name).then( () => {
                        this.editPlaylist.name = this.playlists[index].name;
                        this.editPlaylist.id = this.playlists[index].id;
                        this.editPlaylist.email = this.playlists[index].owner.email;
                    });
                }catch(e){
                    alert(e)
                }
                this.editDelete = true
            },
            addPlaylists() {

                    this.myPlaylists.createPlaylists(this.url, this.addPlaylist).then(data => {
                        this.playlists = Object.keys(data).map((k) => data[k])
                    });
                    this.close()

            },

            getPlaylistId (playlistId) {
                try{
                    //const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    const index = this.playlists.indexOf(playlistId);
                    this.myPlaylists.getPlaylistsById(this.url, playlistId.id).then( () => {
                            this.getPlaylist.ownerName = this.playlists[index].owner.name;
                            this.getPlaylist.email = this.playlists[index].owner.email;
                            this.getPlaylist.id = this.playlists[index].id;
                            this.getPlaylist.ownerId = this.playlists[index].owner.id;
                            this.getPlaylist.track = this.playlists[index].tracks;
                    });
                    this.$router.push('/playlists/1')
                }catch(e){
                    alert(e)
                }
                this.getPlaylistDialog = true;
                //const idRoute = this.getPlaylist.id;

            },

            deleteItem (playlistId) {
                try{
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.deletePlaylistsById(playlistId).then(() => {
                      this.playlists.splice(playlistIndex, 1)
                    });
                }catch(e){
                    alert(e)
                }
            },

            close () {
                this.dialog = false;
                this.editDelete = false;
                this.getPlaylistDialog = false;
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.playlists[this.editedIndex], this.editedItem)
                } else {
                    this.playlists.push(this.editedItem)
                }
                this.close()
            },
            modifyPlaylists (playlistId, newName) {
                try{
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.modifyPlaylistsById(this.url, playlistId, newName).then( () => {
                        this.playlists[playlistIndex].name = newName;
                    });
                }catch(e){
                    alert(e)
                }
                this.editDelete = false
            },

            extractTracks(){
                for(let element of this.playlists){
                    if(element.tracks.length !== 0){
                        this.myTracks =(element.tracks)
                    }

                }
            },
            deleteItemTrack (playlistId) {
                try{
                    const playlistIndex = this.myTracks.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    alert(playlistIndex);
                    this.myPlaylists.deletePlaylistsByIdAndTrackId(this.url, this.addTracks.trackId, playlistId).then(() => {
                        this.myTracks.splice(playlistIndex, 1)
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