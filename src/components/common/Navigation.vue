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

            <v-autocomplete
               :loading="loading"
               :items="itemFound"
               :search-input.sync="search"
               v-model="select"
               cache-items              
               class="hidden-xs-and-down hidden-xs-only mt-3"
               flat
               hide-no-data
               hide-details
              label="Select item to search about"
              solo-inverted  
              item-text="name"         
              item-value="name"
               @change="Onselect"
               @keypress="Onselect"
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
    
      </v-autocomplete>    
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
   import API_ENDPOINT_SECURE  from "../../api/GetSecureEndPoint";
   import _ from 'underscore'; 
    export default {
        name: 'Navigation',
        props: ['logoutUser', 'callUnsetCookie'],
        inject: ['myCookie', 'myUsers', 'myUserSession','mySearch'],
        data() {
            return {
                drawer: false,
                 SelectedItem:[],               
                 items:['Alls','albums','artists','tracks','users'],                
                 loading: false,
                 search: null,
                 select: null,
                 itemFound:[] ,                
                 currentUser :localStorage.getItem('currentUser') , 
                // CurrentUserId:localStorage.setItem('currentUserId', data.id) , 
                 resultUsers:[]  
                 
            };
        },

        computed : {
            routePath: function()
            {
                let routePath  ; 
                localStorage.setItem('searchtype',this.SelectedItem);
                switch(this.SelectedItem) {
                 case "Alls":
                
                 routePath = '/search/'+this.select ; 
                 break;
                 case "albums":
                 routePath  = '/search/albums/'+this.select ;    
                
                 break;
                 case "artists":
                 routePath = '/search/artists/'+this.select;  
                
                 break;
                 case "tracks":
                    routePath = '/search/tracks/'+this.select;
                
                 break;
                 case "users":
                routePath ='/search/users/'+this.select ; 
                
                 break;
                 default:
                routePath  = '/search/'+this.select ; 
                
                }
                return  routePath ;               

            } ,
           

          
        }
        ,
       watch: {
      search (val) {
        let token = this.myCookie.get(this.currentUser) ;               
        //let searchQuery; 
   
              this.loading = true ;      
              
            //     if(this.SelectedItem=='Alls')
            //   {
            //      searchQuery= `search?q=${val}` ;
            //   }
            //   else 
            //   {
            //   searchQuery= `search/${this.SelectedItem}?q=${val}` ; 
            //   }  
         
              this.mySearch.Search(API_ENDPOINT_SECURE,`search?q=${val}`,token).then(
                  response =>{                       

                         this.itemFound =this.dataResult(response) ;
                        // this.loading=false ; 

                  }) 

             this.mySearch.Search(API_ENDPOINT_SECURE,`search/users?q=${val}`,token).then(
                  response =>{                       


                         this.resultUsers   = response ; 
                         let  result =[] ; 

                         this.resultUsers.forEach( user=>{
                         result.push({name:user.name,id:user.id}) ; 
                                   }         
                                 )  
          
                         this.itemFound.concat(result) ;
                         this.loading=false ; 

                  }) 

                  
                         

      }
    },
        methods:{
            Onselect()
            {
                this.$router.push(this.routePath) ; 
            }  
             ,

            navigateToPlaylists(){
                this.$router.push('/playlists')
            },
            goHome(){
                this.$router.push('/dashboard')
            },
            goToUserProfile(){
                this.$router.push('/userProfile');
            },       
      
         dataResult : function(d)
            {
                let Tracks=[] ; 
               let Albums=[]  ; 
               let Artists=[]; 
              // let Users=[] ; 
               let res =[] ; 

              
            Tracks  = _.where(d.results,{wrapperType:"track"})  ;                                   
            Albums = _.where(d.results,{wrapperType:"collection"}) ;                     
            Artists = _.where(d.results,{wrapperType:"artist"}) ; 
            //Users = d; 
 
                        
            Albums.forEach(album => {
              res.push({name:album.collectionName,id:album.collectionId}) ;    
                
            });

            Tracks.forEach( trak =>
            {
                res.push({name:trak.trackName,id:trak.trackId}) ; 
            }

            ) ;

            Artists.forEach( artist =>
            {
                res.push({name:artist.artistName,id:artist.artistId}) ; 
            }

            ) ;
              
        //    Users.forEach( user=>{
        //      res.push({name:user.name,id:user.id}) ; 
        //    }
               
         //  )  //
      
         return res ; 

            }


               
            }
        
    }
</script>
<style scoped>

</style>