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
                > <v-list-item-title @click="navigateToPlaylists">Playlists</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-spacer/>
            <v-text-field
                flat
                solo-inverted
                hide-details             
                label="Select item to search about"
                class="hidden-xs-and-down hidden-xs-only mt-3"
                v-model="ItemToSearch"
            >
            <template slot="prepend">
             <v-select :items="items"
                placeholder="open to select"
                 item-text="name"
                 item-value="id"
                 v-model="SelectedItem"
                 solo-inverted flat  hide-details dense
                 class="mb-2"
             >

              </v-select>
               </template>
           <template slot="append" v-if="ItemToSearch!==''">
           <v-btn flat hide-details solo-inverted :to="routePath"  color="blue darken-3" >
             <v-icon >search</v-icon>
           </v-btn>
           </template> 
            </v-text-field>
            <v-spacer/>
            <v-menu open-on-click bottom offset-y>
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
                            @click="callUnsetCookie"
                        >
                            <v-img
                                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                alt="User John"
                            >
                            </v-img></v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item  link @click="goToUserProfile">
                        <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Profile</v-list-item-title>
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
                    <v-menu open-on-click bottom offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                large
                                v-on="on"
                            >
                                <v-avatar
                                    size="32px"
                                    item
                                    @click="callUnsetCookie"
                                >
                                    <v-img
                                        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                        alt="User John"
                                    >
                                    </v-img></v-avatar>
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-item  link @click="goToUserProfile">
                                <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Profile</v-list-item-title>
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
        props: ['logoutUser', 'callUnsetCookie'],
        inject: ['myCookie', 'myUsers', 'myUserSession'],
        data() {
            return {
                drawer: false,
                 SelectedItem:[],
                 ItemToSearch:'' , 
                 items:['Alls','albums','artists','tracks','users'],
            };
        },

        computed : {
            routePath: function()
            {
                let routePath  ; 
                localStorage.setItem('searchtype',this.SelectedItem);
                switch(this.SelectedItem) {
                 case "Alls":
                
                 routePath = '/search/'+this.ItemToSearch ; 
                 break;
                 case "albums":
                 routePath  = '/search/albums/'+this.ItemToSearch ;    
                
                 break;
                 case "artists":
                 routePath = '/search/artists/'+this.ItemToSearch ;  
                
                 break;
                 case "tracks":
                    routePath = '/search/tracks/'+this.ItemToSearch;
                
                 break;
                 case "users":
                routePath ='/search/users/'+this.ItemToSearch ; 
                
                 break;
                 default:
                routePath  = '/search/'+this.ItemToSearch  ; 
                
                }
                return  routePath ;               

            }
          
        }
        ,

        methods:{
            navigateToPlaylists(){
                this.$router.push('/playlists')
            },
            goHome(){
                this.$router.push('/dashboard')
            },
            goToUserProfile(){
                this.$router.push('/userProfile');
            },
            // Search(){
                
            //        let token = this.myCookie.get(this.currentUser) ; 
     
            //   this.mySearch.Search(API_ENDPOINT,this.SelectedItem,this.ItemToSearch,token).then(
            //       response =>{
            //             //this.searchResult = response ; 
            //             localStorage.setItem('searchResult',JSON.stringify(response));

            //       }) ; 

            
            //  this.$router.push('/search') ; 

           // },
             
  
        //    navigateToSearchs()
        //    {

        //          let routePath  ;   
        //           localStorage.setItem('searchtype',this.SelectedItem)
        //         switch(this.SelectedItem) {
        //          case "Alls":
                
        //          routePath = '/search/'+this.ItemToSearch ; 
        //          break;
        //          case "albums":
        //          routePath  = '/search/albums/'+this.ItemToSearch ;    
                
        //          break;
        //          case "artists":
        //          routePath = '/search/artists/'+this.ItemToSearch ;  
                
        //          break;
        //          case "tracks":
        //             routePath = '/search/tracks/'+this.ItemToSearch;
                
        //          break;
        //          case "users":
        //         routePath ='/search/users/'+this.ItemToSearch ; 
                
        //          break;
        //          default:
        //         routePath  = '/search/'+this.ItemToSearch  ; 
                
        //         }
        //         //return  routePath ; 
        //           this.$router.push(routePath) ;            


        //     }
           

               
            }
        
    }
</script>
<style scoped>

</style>