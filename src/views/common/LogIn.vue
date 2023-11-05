<template>
    <v-layout id="layout" class="rounded-md">
        <v-app-bar id="app-bar" color="rgba(241, 244, 254, 1)">
            <v-row align="center">
                <v-col cols="auto">
                    <!-- Image on the left, 10px from the left corner -->
                    <router-link to="/"><v-img src="@/assets/survey-y-logo.png" alt="Your Image"
                        style="margin-left: 10px; height: 40px; width: 90px"></v-img></router-link>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <span class="title">No Account Yet ? &nbsp; &nbsp;</span>
                    <router-link to="/signup" style="text-decoration: none; color: black;"><v-btn class="custom-button"
                            color="blue" variant="outlined" position="relative">
                            Sign Up
                        </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-content class="mx-auto mb-0 mt-8">
            <v-navigation-drawer location="right">
                <v-list>
                    <v-list-item>
                        <v-img id="right-bg" src="/src/assets/right-bg.png" alt="Your Image" class="mt-0"
                            style="height: 100%; min-height: 640px; width: 100%" cover>
                        </v-img>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main class="d-flex align-center justify-center pt-8 pb-10" style="
            min-height: 500px;
            height: 645px;
            margin-top: 0;
            padding-top: 0;
          ">
                <!-- <div class="d-flex align-center justify-center" style="height: 100vh"> -->
                <v-col>
                    <!-- First Row -->
                    <v-row>
                        <!-- Content for the first row -->
                        <div class="row-content" style="margin-bottom: 30px; margin-top: 0">
                            <v-card class="text-center d-flex" width="400" flat color="transparent">
                                <v-card-text style="line-height: 1.5">
                                    <h2>Account Log In</h2>
                                    <p>Please Log In to Continue to Your Account</p>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-row>
                    <br />
                    <!-- Second Row -->
                    <v-row>
                        <!-- Content for the second row -->
                        <div class="row-content">
                            <v-sheet width="400" class="mx-auto">
                                <v-form fast-fail @submit.prevent="login">
                                    <v-text-field v-model="email" label="E-mail" type="email" :rules="emailRules">
                                    </v-text-field>

                                    <v-text-field v-model="password" label="Password" type="password"
                                        :rules="passwordRules">
                                    </v-text-field>
                                    <div style="display: flex">
                                        <v-row max-width="100%" width="500">
                                            <v-col cols="14" md="6" class="pb-0">
                                                <v-checkbox label="Remember Me"></v-checkbox>
                                            </v-col>
                                            <v-col cols="14" md="6">
                                                <v-card-text class="align-center justify-center"><router-link to="/forgot-password"
                                                        class="text-body-2 font-weight-regular">Forgot
                                                        Password?</router-link></v-card-text>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-btn type="submit" block class="mt-4 mb-0 custom-button" color="blue"
                                        variant="outlined" position="relative">Submit</v-btn>
                                        <!-- <p>{{ this.$store.getters.getSessionData }}</p> -->
                                </v-form>
                            </v-sheet>
                        </div>
                    </v-row>
                </v-col>
                <!-- </div> -->
            </v-main>
        </v-content>
        <FooterDefault></FooterDefault>
    </v-layout>
</template>


<script>
import axios from "axios";
import { server } from "../../helper";
import FooterDefault from "../../components/common/Footer-Default.vue";

export default {
    components: {
        FooterDefault,
    },
    name: "Login",
    data() {
        return {
            email: "",

            password: "",
            
        };
    },

    computed: {
        emailRules() {
            return [
                v => !!v || 'Please enter your e-mail',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ];
        },

        passwordRules() {
            return[
                v => !!v || 'Please enter your password',
        ];
        }

    },



    methods: {
        async login() {
            const userData = {
                email: this.email,
                password: this.password,
            };
            try {
                const response = await axios.post(`${server.baseURL}/auth/login`, userData).then((response) => {
                    console.log(userData);
                    // Move the code that accesses 'response' inside this then block
                    if (response.status === 201) {
                        const responseData = response.data;
                        const user = responseData.user;
                        console.log(response);

                        // Set the session data

                        this.$store.dispatch('setSessionData', responseData);
                        this.$store.dispatch('setLoginStatus', true);
                        // console.log(this.$store.getters.getLoginStatus);

                        //role based login for the users

                        if (user.roleId == 1) {
                            this.$router.push({ name: 'dashboard-research-owner' });
                        }
                        else if (user.roleId == 2) {
                            this.$router.push({ name: 'dashboard-collector' });
                        }
                        else {
                            alert("User Name or Password is incorrect")
                        }
                        // Once logged in, set the global variable to true
                        // this.$isLoggedIn = true;
                        // Access and use responseData here
                        // ...
                    } else {
                        // Handle the case where response.data is undefined
                        console.log("No data");
                    }
                });

            } catch (error) {
                // console.log(userData);
                // console.log(error);
                alert("User Name or Password is incorrect");
            }
        },
        forgotPassword() {
            this.$router.push({ name: 'forgot-password' });
        }
    },
};
</script>
<style scoped>
.color {
    position: absolute;
    background-color: #1976d2;
    height: 100%;
    width: 100%;
    border-radius: 0;
}

#app-bar {
    padding-inline-end: 10px;
}

#right-bg {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#right-h3 {
    font-weight: 400;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0;
    line-height: 24px;
    line-height: 30.5px;
    font-family: "Roboto", sans-serif;
}

#layout {
    align-items: center;
}
</style>
