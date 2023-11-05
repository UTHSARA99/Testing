<template>
    <v-content>
        <v-main class="d-flex align-center justify-center pb-8" style="min-height: 400px">
            <v-sheet width="400" class="mx-auto">
                <v-card class="align-center justify-center" flat color="transparent">
                    <h3>Enter a new Password to Reset the Password.</h3>
                </v-card>
                <br />
                <v-card>
                    <v-form lazy-validation @submit.prevent="onNewPassword">
                        <v-container>

                            <v-text-field label="Enter Password" v-model="password" type="password" required></v-text-field>
                            <v-text-field label="Enter Email" v-model="email" type="text" required></v-text-field>

                            <br />

                            <small>Please update your passsword from Update profile after password reset.</small>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" type="submit">
                                    Submit
                                </v-btn>
                                <v-btn color="red-darken-1" variant="text" @click="dialog = false">
                                    Cancel
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
        password: "",
        email: "",
    }),

    methods: {

        async sendPassword(payload) {
            const postData = payload;
            let email = this.email;
            let url = `${server.baseURL}/auth/login/resetpassword/new/${email}`;
            const response = await axios.post(url, postData).then((response) => {
                console.log(response);
                this.$router.push({ name: 'login'});
            }).catch((error) => {
                console.log(error);
            });
        },

        onNewPassword() {
            const payload = {
                password: this.password,
            };
            console.log(payload);
            this.sendPassword(payload);
        },


    }

}

</script>