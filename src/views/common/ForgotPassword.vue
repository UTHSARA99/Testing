<template>
    <v-content>
        <v-main class="d-flex align-center justify-center pb-8" style="min-height: 400px">
            <v-sheet width="400" class="mx-auto">
                <v-card class="align-center justify-center" flat color="transparent">
                    <h3>Enter Your Email to Reset the Password.</h3>
                </v-card>
                <br />
                <v-card>
                    <v-form lazy-validation @submit.prevent="onResetPassword">
                        <v-container>

                            <v-text-field label="Enter Email" v-model="email" type="text" required></v-text-field>

                            <br />

                            <small>Please enter the Email you provided when registered.</small>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" type="submit">
                                    Submit
                                </v-btn>
                                <v-btn color="red-darken-1" variant="text" @click="back">
                                    Back
                                </v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-form>
                </v-card>
            </v-sheet>
        </v-main>
    </v-content>
</template>


<script>
import axios from 'axios';
import { server } from '../../helper.js';
import router from '../../router/index.js';



export default {
    name: "passwordForgot",
    data: () => ({
        dialog: true,
        email: "",
    }),

    methods: {

        async sendEmail(payload) {
            const postData = payload;
            const response = await axios.post(`${server.baseURL}/auth/login/resetpassword`, postData).then((response) => {
                console.log(response);
                this.$router.push({ name: 'verify-otp'});
            }).catch((error) => {
                console.log(error);
            });
        },

        onResetPassword() {
            const payload = {
                email: this.email,
            };
            console.log(payload);
            this.sendEmail(payload);
        },

        back() {
            console.log("Reset terminated. You will be redirected to the Login Page.");
            this.$router.push({ name: 'login'});
        }


    }

}

</script>