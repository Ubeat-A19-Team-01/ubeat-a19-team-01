<template>
    <div>
        <v-container>
            <!-----
            <h4  v-if="playlists.length ===0"  class="mb-2"> Please wait a few seconds loading....</h4>
            <v-progress-linear
                    indeterminate
                    color="green darken-2"
                    v-if="playlists.length ===0"
                    class="mb-2"
            >

            </v-progress-linear>
            --->
            {{tracks}}
            <v-data-table
                    :headers="headers"
                    :items="tracks"
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
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="secondary" dark class="mb-2 mr-2" v-on="on">Add Track</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTrack }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
                    <v-btn color="primary" @click="initialize">No Data Right Now</v-btn>
                </template>
            </v-data-table>
        </v-container>

    </div>
</template>
<script>
    export default {
        name: "AddPlaylists",
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
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Add Playlist' : 'Edit Playlist'
            },
            formTrack () {
                return this.editedIndex === -1 ? 'Add Track' : 'Edit Track'
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
                const {tracks} = await this.myPlaylists.getPlaylists(this.url);
                this.tracks = tracks;
            }catch(e){
                alert(e)
            }
        },
        methods: {
            initialize () {
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item);
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>