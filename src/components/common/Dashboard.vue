<template>
    <div>
        <Navigation v-bind:logoutUser = 'logoutUser'
                    v-bind:callUnsetCookie="callUnsetCookie"
        />
        <v-content class="body">
            <router-view :key="$route.fullPath">
            </router-view>
        </v-content>
    </div>
</template>

<script>
    import Navigation from "../common/Navigation";
    import API_ENDPOINT_SECURE from "../../api/GetSecureEndPoint";
    
    export default {
        name: "Dashboard",
            components: {
            Navigation,
        },
        inject: ['myCookie', 'myUserSession', 'eventBus'],
        data() {
            return {
                removeToken: '',
                userName: 'angelo.com',
            };
        },
        created() {
            this.eventBus.$on('getUserName', () => {
                //this.userName = this.userRegistration.name;
                //alert(this.userRegistration.name)
            })
        },
        methods:{
            logoutUser() {
                this.deleteCookie(this.removeToken);
                this.$router.push('/');
            },
            deleteCookie(name){
                this.myCookie.unset(name)
            },
            callUnsetCookie(){
                try {
                    const userCookie = this.myCookie.get(this.userName);
                    //alert(userCookie);
                    this.myUserSession.getTokenInfo(API_ENDPOINT_SECURE, userCookie).then(data => {
                        this.removeToken = data.name;
                        //alert(data.name)
                    });
                }catch(err){
                    alert(err)
                }
            }
        }
    }
</script>

<style scoped>

</style>