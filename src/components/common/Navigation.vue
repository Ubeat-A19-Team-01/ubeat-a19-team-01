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
                 <span @click="goHome"><v-icon>home</v-icon> Ubeat</span>
            </v-toolbar-title>
             <v-spacer class="hidden-md-and-up"></v-spacer>  
            <v-list  color="blue darken-3" dark flat max-height="59" class="hidden-sm-and-down">
                <v-list-item
                        link
                >
                   <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>

                </v-list-item>
            </v-list>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="search"
                    label="Search for artists or playlists"
                    class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                            v-on="on"
                            class="hidden-sm-and-down"
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
         <v-divider></v-divider>
        <v-list-item  link>
        <v-list-item-icon><v-icon>logout</v-icon></v-list-item-icon>
        <v-list-item-content>
         <v-list-item-title>Sign Out </v-list-item-title>
        </v-list-item-content>
        </v-list-item>      
      </v-list>
            </v-menu>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>  
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" class="hidden-lg-and-up mx-1 mt-10" dark width="auto">
               <v-list color="blue darken-3" dark>
                <v-list-item
                        link
                >
                   <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>

                </v-list-item>                
                  <v-divider></v-divider>
                  <v-list-item>
                   <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="search"
                    label="Search for artists or playlists"
                    ></v-text-field>
                  </v-list-item>
        <v-divider></v-divider>
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
         <v-divider></v-divider>
        <v-list-item  link>
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
                this.$router.push('/')
            }
    }
};  
</script>
<style scoped>

</style>