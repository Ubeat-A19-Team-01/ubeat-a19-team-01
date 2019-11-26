<template>
    <v-app id="inspire">
        {{name}}
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
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Ubeat Register</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Username"
                                        name="name"
                                        prepend-icon="person"
                                        type="text"
                                        v-model="userRegistration.name"
                                    />
                                    <v-text-field
                                        label="Email"
                                        name="email"
                                        prepend-icon="email"
                                        type="email"
                                        v-model="userRegistration.email"
                                    />

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="userRegistration.password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text to="/"  color="primary">Login</v-btn>
                                <v-spacer />
                                <v-btn color="primary" class="mr-3 mb-3" @click="registerUser">Register</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import  API_ENDPOINT_SECURE from "../../api/GetSecureEndPoint";

    export default {
        props: {
            source: String,
        },
        inject: ['myUsers'],
        data: () => ({
            userRegistration: {
                name: '',
                email: '',
                password: ''
            },
            name: ''
        }),
        methods: {
            registerUser() {
                try {
                    if(this.userRegistration.name ==='' || this.userRegistration.email === '' || this.userRegistration.password === ''){
                        this.$router.push('/register')
                    } else {
                        const {name} = this.myUsers.signupUsers(API_ENDPOINT_SECURE, this.userRegistration);
                        this.name = name;
                        this.$router.push('/')
                    }
                } catch(err){
                    alert(err)
                }
            },
        }
    }
</script>