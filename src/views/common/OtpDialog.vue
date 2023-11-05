<template>
    <v-content>
        <v-main class="d-flex align-center justify-center pb-8" style="min-height: 400px">
            <v-sheet width="400" class="mx-auto">
                <v-card class="align-center justify-center" flat color="transparent">
                    <h3>Enter Your OTP</h3>
                </v-card>
                <br />
                <v-card>
                    <v-form lazy-validation @submit.prevent="onOtpSubmit">
                        <v-container>

                            <v-text-field label="Enter OTP Code" v-model="otp" type="text" required></v-text-field>
                            <v-text-field label="Enter Email" v-model="email" type="text" required></v-text-field>

                            <br />

                            <small>Please enter the OTP code sent to your email entered.</small>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" type="submit">
                                    Submit
                                </v-btn>
                                <!-- <v-btn color="red-darken-1" variant="text" @click="back">
                                    Cancel
                                </v-btn> -->
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
    name: "otpDialog",
    data: () => ({
        dialog: true,
        otp: "",
        email: "",
    }),

    methods: {

        async sendOTP(payload) {
            const postData = payload;
                if ((this.$store.getters.getFirstReg)) {
                    const response = await axios.post(`${server.baseURL}/auth/verify`, postData).then((response) => {
                // console.log(postData);
                    this.$router.push({ name: 'login' });
                }).catch((error) => {
                console.log(error);
                alert(error.response.data.message);
            });
                }
                else {
                    const response = await axios.post(`${server.baseURL}/auth/login/resetpassword/OTP`, postData).then((response) => {
                    this.$router.push({ name: 'new-password' });
                }).catch((error) => {
                console.log(error);
                alert(error.response.data.message);
                });
                }
            
        },

        onOtpSubmit() {
            const otpData = {
                otp: this.otp,
                email: this.email,
            }
            this.sendOTP(otpData)
            if (true) {
                console.log(otpData);   
            }
            else {
                // alert(response.data.message)
            }
        },

        // back() {
        //     console.log("Account creation terminated. You will be redirected to the Login Page.");
        //     this.$router.push({ name: 'login' });
        // }


    }




}
</script>

<style></style>
