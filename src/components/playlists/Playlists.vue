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
                        />
                        <v-spacer/>
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
                                                <v-text-field v-model="addPlaylist.name" label="Playlist Name" type="text"/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addPlaylist.owner" label="Owner Email" type="email" disabled/>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
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
                                                <v-text-field v-model="editPlaylist.name" label="Playlist Name" type="text"/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editPlaylist.email" label="Owner Email" type="email" disabled/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editPlaylist.id" label="Id" disabled/>
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
                                                <v-text-field v-model="getPlaylist.id" label="Playlist Id" type="text" disabled/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.email" label="Owner Email" type="email" disabled/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.ownerName" label="Owner Name" type="text" disabled/>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="getPlaylist.ownerId" label="Owner Id" type="text" disabled/>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-data-table
                                                    :headers="headersTrack"
                                                    :items="myTracks"
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
                                                            />
                                                            <v-spacer/>
                                                        </v-toolbar>
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
                                    <v-spacer/>
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
            <v-data-table
                :headers="headersTrack"
                :items="myTracks"
                :item-key="myTracks.playlistIdTrack"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>All Tracks Per Playlist</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        />
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon
                        small
                        @click="deleteItemTrack(item)"
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
    import API_ENDPOINT from "../../api/GetSecureEndPoint.js";
    import API_ENDPOINT_SECURE from "../../api/GetSecureEndPoint";

    export default {
        name: "Playlists",
        inject: ['myPlaylists', 'myCookie', 'myUserSession'],
        data: () => ({
            userInfo: {
              name: "",
              email: "",
            },
            playlists: [],
            tracks: [],
            myTracks: [],
            dataReturned: [],
            playlistIdTrack: {},
            playlistsLoaded: true,
            dialog: false,
            dialogTrack: false,
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
            headersTrack: [
                {
                    text: 'Playlist Id',
                    align: 'left',
                    sortable: false,
                    value: 'id',
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
            addPlaylist: {
                name: '',
                owner: '',
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
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        async created(){
            try{
                const userName = localStorage.getItem('currentUser');
                const userCookie = this.myCookie.get(userName);
                await this.myUserSession.getTokenInfo(API_ENDPOINT_SECURE, userCookie).then(data => {
                    this.userInfo.name = data.name;
                    this.userInfo.email = data.email;
                    this.addPlaylist.name = data.name;
                    this.addPlaylist.owner = data.email
                    //alert(data.name)
                });
                const cookie = this.userInfoAndToken();
                const {playlistsT, tracks} = await this.myPlaylists.getPlaylists(API_ENDPOINT, cookie);
                this.playlists = playlistsT.filter(({owner}) => this.userInfo.email === owner.email);
                this.tracks = tracks;
            }catch(e){
                alert(e)
            }
            this.extractTracks()
        },
        methods: {
            editPlaylists (playlistId, name) {
                try{
                    const cookie = this.userInfoAndToken();
                    const index = this.playlists.indexOf(playlistId);
                    this.myPlaylists.modifyPlaylistsById(API_ENDPOINT, playlistId, name, cookie).then( () => {
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
                const cookie = this.userInfoAndToken();
                this.myPlaylists.createPlaylists(API_ENDPOINT, this.addPlaylist, cookie).then(data => {
                    this.playlists.push(data)
                });
                this.close()
            },

            getPlaylistId (playlistId) {
                try{
                    const cookie = this.userInfoAndToken();
                    const index = this.playlists.indexOf(playlistId);
                    this.myPlaylists.getPlaylistsById(API_ENDPOINT, playlistId.id, cookie).then( () => {
                            this.getPlaylist.ownerName = this.playlists[index].owner.name;
                            this.getPlaylist.email = this.playlists[index].owner.email;
                            this.getPlaylist.id = this.playlists[index].id;
                            this.getPlaylist.ownerId = this.playlists[index].owner.id;
                            this.getPlaylist.track = this.playlists[index].tracks;
                    });
                }catch(e){
                    alert(e)
                }
                this.getPlaylistDialog = true;
            },

            deleteItem (playlistId) {
                try{
                    const cookie = this.userInfoAndToken();
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.deletePlaylistsById(playlistId, cookie).then(() => {
                      this.playlists.splice(playlistIndex, 1)
                    });
                }catch(e){
                    alert(e)
                }
            },

            close () {
                this.dialog = false;
                this.dialogTrack = false;
                this.editDelete = false;
                this.getPlaylistDialog = false;
            },

            modifyPlaylists (playlistId, newName) {
                try{
                    const cookie = this.userInfoAndToken();
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.modifyPlaylistsById(API_ENDPOINT, playlistId, newName, cookie).then( () => {
                        this.playlists[playlistIndex].name = newName;
                    });
                }catch(e){
                    alert(e)
                }
                this.editDelete = false
            },

            extractTracks(){
                for(let element of this.playlists){
                    let arrayTrack = [];
                    if(element.tracks.length !== 0){
                        arrayTrack =(element.tracks);
                        this.playlistIdTrack.id = element.id;
                        this.myTracks = arrayTrack.map((eachData) => Object.assign(this.playlistIdTrack, eachData))
                    }
                }
            },
            deleteItemTrack (playlistId) {
                try{
                    const cookie = this.userInfoAndToken();
                    const playlistIndex = this.myTracks.findIndex(singlePlaylist => singlePlaylist.trackId === playlistId.trackId);
                    this.myPlaylists.deletePlaylistsByIdAndTrackId(playlistId.id, playlistId.trackId, cookie).then(() => {
                        this.myTracks.splice(playlistIndex, 1)
                    });
                }catch(e){
                    alert(e)
                }
            },
            userInfoAndToken(){
                const userName = localStorage.getItem('currentUser');
                return this.myCookie.get(userName);

            }
        },
    }
</script>

<style scoped>

</style>