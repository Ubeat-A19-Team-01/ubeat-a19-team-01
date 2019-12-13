<template>
    <v-container
        fill-height
        grid-list-xl
    >
        <v-layout
            justify-center
            wrap
        >
            <v-flex
                xs12
                md4
            >
                <material-card class="v-card-profile">
                    <v-avatar
                        slot="offset"
                        class="mx-auto d-block"
                        size="130"
                    >
                        <img alt=""
                           src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                        >
                    </v-avatar>
                    <v-card-text class="text-sm-center">
                        <h4 class="card-title font-weight-regular"> <b>Name:</b> {{userInfo.name}}</h4>
                        <h4 class="card-title font-weight-regular"> <b>Email:</b> {{userInfo.email}}</h4>
                    </v-card-text>
                    <v-list subheader>
                        <v-subheader>Recent following</v-subheader>

                        <v-list-item
                                v-for="item in myFollowings"
                                :key="item.email"

                        >
                            <v-avatar>
                                <v-icon size="40">mdi-account-circle</v-icon>
                            </v-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"/>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.email"/>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon  @click="OnUnfollow(item.id)">mdi-thumb-down</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import API_ENDPOINT_SECURE from "../../api/GetSecureEndPoint";

    export default {
        data: () => ({
            status: true,
            userInfo: {
                id: '',
               name: '',
               email: '',
            },
            myFollowings: [],
            userCookie: '',
            items: [
                { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
                { active: false, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                { active: false, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                { active: false, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            ],
            items2: [
                { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
            ],
        }),
        inject: ['myCookie', 'myUserSession', 'myUsers'],
        methods: {
          async  OnUnfollow(id)
            {
                try{
                      const userName = localStorage.getItem('currentUser');
                     this.userCookie = this.myCookie.get(userName);
                      await this.myUsers.unfollowUser(API_ENDPOINT_SECURE,this.userCookie,id) ; 
                       
                    

                }catch(err)
                {
                    alert(err) ; 
                }

            }
        },
        async created(){
            try {
                const userName = localStorage.getItem('currentUser');
                this.userCookie = this.myCookie.get(userName);
                await this.myUserSession.getTokenInfo(API_ENDPOINT_SECURE, this.userCookie).then(data => {
                    this.userInfo.name = data.name;
                    this.userInfo.email = data.email;
                    this.userInfo.id = data.id;
                    this.myFollowings = data.followings ;
                });

                // this.myUsers.getUser(API_ENDPOINT_SECURE, this.userInfo.id, this.userCookie).then(data => {
                //      data.following.map((eachElement) => this.myFollowings.push(eachElement));
                //     //alert(data)
                // });
            }catch(err){
                alert(err)
            }
        }
    }
</script>