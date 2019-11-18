import Vue from "vue";
import Router from "vue-router";
import Home from "../components/common/Home";
import Album from "../components/albums/Album";
import Artist from "../components/artists/Artist";
import Playlists from "../components/playlists/Playlists";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/artist/:id",
            name: "Artist",
            component: Artist,
            props:true
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
        },
    ]
});