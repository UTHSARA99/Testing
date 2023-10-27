<!-- eslint-disable prettier/prettier -->
/* eslint-disable */
// eslint-disable-next-line vue/multi-word-component-names
<template>
    <!-- <v-app> -->
    <v-layout id="layout" class="rounded-md">
        <v-app-bar id="app-bar" color="rgba(241, 244, 254, 1)">
            <v-row align="center">
                <v-col cols="auto">
                    <!-- Image on the left, 10px from the left corner -->
                    <v-img src="/src/assets/survey-y-logo.png" alt="Your Image"
                        style="margin-left: 10px; height: 40px; width: 90px"></v-img>
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
                        <v-img id="right-bg" src="/src/assets/right-bg.png" alt="Your Image" class="mt-0" style="height: 100%; min-height: 640px; width: 100%"
                            cover>
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
                                    <v-text-field v-model="email" label="E-mail"></v-text-field>
                                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                                    <div style="display: flex">
                                        <v-row max-width="100%" width="500">
                                            <v-col cols="14" md="6" class="pb-0">
                                                <v-checkbox label="Remember Me"></v-checkbox>
                                            </v-col>
                                            <v-col cols="14" md="6">
                                                <v-card-text class="align-center justify-center"><a href="#"
                                                        class="text-body-2 font-weight-regular">Forgot
                                                        Password?</a></v-card-text>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-btn type="submit" block class="mt-4 mb-0 custom-button" color="blue"
                                        variant="outlined" position="relative">Submit</v-btn>
                                </v-form>
                            </v-sheet>
                        </div>
                    </v-row>
                </v-col>
                <!-- </div> -->
            </v-main>
        </v-content>
    </v-layout>
    <!-- </v-app> -->
</template>
// eslint-disable-next-line
<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            // login for demonstration purposes
            const email = this.email;
            const password = this.password;

            if (email === "user@survey.com" && password === "pass") {
                this.$router.push({ name: "dashboard-collector" }); // Navigate to dashboard
            } else {
                // Handle login failure
                console.error("Login failed!");
            }
        },
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
