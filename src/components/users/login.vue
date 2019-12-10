<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-alert type="error" v-if="loginError === true" class="mb-3">
                            Your email and password are not correct or empty. Please try again.
                        </v-alert>
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Ubeat Login</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Email Address"
                                        name="login"
                                        prepend-icon="person"
                                        type="email"
                                        v-model="userLogin.email"
                                    />

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="userLogin.password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text to="/register"  color="primary">Register</v-btn>
                                <v-spacer />
                                <v-btn  color="primary" class="mr-3 mb-3" @click="loginUser">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import API_ENDPOINT_SECURE from "../../api/GetSecureEndPoint";

    export default {
        props: {
            source: String,
        },
        inject: ['myCookie', 'myUsers'],
        data: () => ({
          loginError: false,
          userLogin: {
            email: '',
            password: ''
        },
           userInfo: {
              name: ''
           }
        }),
        methods: {
            loginUser() {
                try {
                    if(this.userLogin.email === '' || this.userLogin.password === ''){
                        this.loginError = true;
                        setTimeout(() =>{ this.loginError = false}, 3000);
                        this.$router.push('/');
                    } else if(this.userLogin.email !== '' && this.userLogin.password === ''){
                        const userName = localStorage.getItem('currentUser');
                        if(userName){
                            this.checkCookie(userName);
                            alert(userName)
                        } else {
                            this.loginError = true;
                            setTimeout(() =>{this.loginError = false}, 3000);
                        }
                    } else {
                        this.myUsers.loginUsers(API_ENDPOINT_SECURE, this.userLogin).then(data => {
                            if(this.userLogin.email === data.email){
                                this.myCookie.set(data.name, data.token);
                                // this.$currentUser=data.name ;
                                localStorage.setItem('currentUser', data.name) ;
                                this.userInfo.name = data.name;
                                this.checkCookie(data.name);
                                this.$router.push('/dashboard')
                            }
                        });
                    }
                } catch(err){
                    alert(err)
                }
            },

            checkCookie(name){
                let userCookie = this.myCookie.get(name);
                if(!userCookie){
                    this.$router.push('/')
                } else {
                    this.$router.push('/dashboard')
                }
            }
        }
    }
</script>