import Vue from "vue";
import Router from "vue-router";
import Home from "../components/common/Home";
import Album from "../components/albums/Album";
import Artist from "../components/artists/Artist";
import Playlists from "../components/playlists/Playlists";
import Register from '../components/users/register';
import Login from '../components/users/login'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Register",
            component: Register
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/dashboard",
            name: "Home",
            component: Home,
            children: [
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
        },
    ]
});