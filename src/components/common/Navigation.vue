<template>
    <div id="inspire">
        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue darken-3"
            dark
            height="60"
        >
            <v-toolbar-title
                style="width: 150px; cursor: pointer"
                class="ml-0 pl-4"
            >
                <span @click="goHome"><v-icon>home</v-icon> Ubeat</span>
            </v-toolbar-title>
            <v-list  color="blue darken-3" dark flat max-height="59" class="hidden-xs-only">
                <v-list-item
                  link
                >
                    <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-spacer/>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="search"
                label="Search for artists or playlists"
                class="hidden-xs-and-down hidden-xs-only"
            />
            <v-spacer/>
            <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        large
                        v-on="on"

                    >
                        <v-avatar
                            size="32px"
                            item
                            class="hidden-xs-only"
                        >
                            <v-img
                                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                alt="User John"
                            >
                            </v-img></v-avatar>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item  link>
                        <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider/>
                    <v-list-item  link @click="logoutUser">
                        <v-list-item-icon><v-icon>logout</v-icon></v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Sign Out </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = !drawer"/>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" v-if="drawer !== false" class="hidden-sm-and-up mx-1 mt-10" width="auto">
            <v-list color="blue darken-3" dark>
                <v-list-item
                   link
                >
                    <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        label="Search for artists or playlists"
                    />
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-menu open-on-hover bottom offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                large
                                v-on="on"
                            >
                                <v-avatar
                                    size="32px"
                                    item
                                >
                                    <v-img
                                        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                        alt="User John"
                                    >
                                    </v-img></v-avatar>
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-item  link>
                                <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Settings</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                            <v-list-item  link @click="logoutUser">
                                <v-list-item-icon><v-icon>logout</v-icon></v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Sign Out </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

    export default {
        name: 'Navigation',
        inject: ['myCookie', 'myUsers'],
        data() {
            return {
                drawer: false,
            };
        },
        methods:{
            navigateToPlaylists(){
                this.$router.push('/playlists')
            },
            goHome(){
                this.$router.push('/dashboard')
            },
            logoutUser() {
                this.$router.push('/');
            },
        }
    };
</script>
<style scoped>

</style>