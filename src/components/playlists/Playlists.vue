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
                                    <span class="headline">{{ formTitle }}</span>
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
                                                <v-text-field v-model="editPlaylist.fat" label="Fat (g)"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary"  @click="save">Save</v-btn>
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
                            @click="deleteItem(item)"
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
                    <v-btn color="primary" @click="initialize">No Data Right Now</v-btn>
                </template>
            </v-data-table>
        </v-container>
        <app-add-playlist :playlists="playlists"></app-add-playlist>
    </div>
</template>
<script>
    import AddPlaylist from "./AddPlaylist";
    export default {
        name: "Playlists",
        components: {
           AppAddPlaylist: AddPlaylist
        },
        inject: ['myPlaylists'],
        data: () => ({
            url: 'https://ubeat.herokuapp.com/unsecure/',
            playlists: [],
            tracks: [],
            playlistsLoaded: true,
            dialog: false,
            editDelete: false,
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
            editedIndex: -1,
            addPlaylist: {
                name: '',
                email: '',
            },
            editPlaylist: {
                name: '',
                email: '',
            },
            getPlaylist: {
                name: '',
                email: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Get Playlist' : 'Edit Playlist'
            },
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
        },

        methods: {
            initialize () {

            },

            editPlaylists (playlistId, name) {
                try{
                   const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.modifyPlaylistsById(this.url, playlistId, name).then( () => {
                        this.editPlaylist.name = name;
                        this.editPlaylist.email = this.playlists[playlistIndex].owner.email;
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
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.getPlaylistsById(this.url).then( () => {
                            this.getPlaylist.name = name;
                            this.getPlaylist.email = this.playlists[playlistIndex].owner.email;
                    });
                }catch(e){
                    alert(e)
                }
                this.editDelete = true
            },

            deleteItem (playlistId) {
                try{
                    const playlistIndex = this.playlists.findIndex(singlePlaylist => singlePlaylist.id === playlistId);
                    this.myPlaylists.deletePlaylistsById(this.url).then(() => {
                        confirm('Are you sure you want to delete this item?') && this.playlists.splice(playlistIndex, 1)
                    });
                }catch(e){
                    alert(e)
                }
            },

            close () {
                this.dialog = false;
                this.editDelete = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.playlists[this.editedIndex], this.editedItem)
                } else {
                    this.playlists.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>