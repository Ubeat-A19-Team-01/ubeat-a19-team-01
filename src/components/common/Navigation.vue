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
                    style="width: 200px; cursor: pointer"
                    class="ml-0 pl-4"
            >
                <span @click="goHome">A19-Team-28</span>
            </v-toolbar-title>
            <v-list  color="blue darken-3" dark flat max-height="59" class="hidden-xs-only">
                <v-list-item
                        link
                >
                   <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>

                </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="search"
                    label="Search for artists or playlists"
                    class="hidden-xs-and-down hidden-xs-only"
            ></v-text-field>
            <v-spacer></v-spacer>
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

                <v-list>
                    <v-list-item
                            style="cursor: pointer"
                            v-for="(item, index) in menu"
                            :key="index"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            dialog: false,
            drawer: null,
            menu: [
                { title: 'Settings' },
                { title: 'Profile' },
                { title: 'Logout' },
            ],
        }),
        methods: {
            navigateToPlaylists(){
                this.$router.push('/playlists')
            },
            goHome(){
                this.$router.push('/')
            }
        }
    }
</script>
<style scoped>

</style>