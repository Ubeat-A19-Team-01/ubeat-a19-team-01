import Vue from "vue";
import Router from "vue-router";
import Home from "../components/common/Home";
import Album from "../components/albums/Album";
import Artist from "../components/artists/Artist";
import Playlists from "../components/playlists/Playlists";
import TracksPlaylist from "../components/playlists/TracksPlaylist";
import TrackPerPlaylist from "../components/playlists/TrackPerPlaylist";
import TracksOnlyPerPlaylist from "../components/playlists/TrackOnlyPerPlaylist";

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
            path: "/album/:id",
            name: "Album",
            component: Album ,
            props:true
        },
        {
            path: "/playlists",
            component: Playlists,
            children: [
                {
                    path: '/playlists/:id',
                    component: TrackPerPlaylist,
                    children: [
                        {
                            path: '',
                            component: TracksOnlyPerPlaylist
                        }
                    ]
                },
                {
                    path: '',
                    component: TracksPlaylist,
                },
            ]
        },
    ]
});