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
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <span>A19-Team-28</span>
            </v-toolbar-title>
            <v-list  color="blue darken-3" dark flat max-height="59">
                <v-list-item
                        link
                >
                   <v-list-item-title>Playlists</v-list-item-title>

                </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="search"
                    label="Search for artists or playlists"
                    class="hidden-sm-and-down"
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
                            v-for="(item, index) in menu"
                            :key="index"
                            @click="a"
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
    }
</script>
<style scoped>

</style>