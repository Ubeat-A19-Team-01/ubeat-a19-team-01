import Vue from "vue";
import Router from "vue-router";
import Home from "../components/common/Home";
import Album from "../components/albums/Album";
import Artist from "../components/artists/Artist";
import Playlists from "../components/playlists/Playlists";
import PlaylistDetail from "../components/playlists/PlaylistDetail";
import AddPlaylist from "../components/playlists/AddPlaylist";
import ModifyPlaylist from "../components/playlists/ModifyPlaylist";
import AddTrackPlaylist from "../components/playlists/AddTrackPlaylist";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/artist",
            name: "Artist",
            component: Artist
        },
        {
            path: "/album",
            name: "Album",
            component: Album
        },
        {
            path: "/playlists",
            component: Playlists,
            children: [
                {
                    path: ':id',
                    name: 'PlaylistDetail',
                    component: PlaylistDetail,
                },
                {
                    path: '',
                    component: AddPlaylist,
                },
                {
                    path: 'modify/:id',
                    component: ModifyPlaylist,
                },
                {
                    path: ':id/tracks',
                    component: AddTrackPlaylist,
                }
            ]
        },
    ]
});