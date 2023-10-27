<template>
    <v-content>
        <v-main class="d-flex align-center justify-center pb-8" style="min-height: 400px">
            <v-sheet width="400" class="mx-auto">
                <v-card class="align-center justify-center" flat color="transparent">
                    <h3>Create an Organization to initiate surveys.</h3>
                </v-card>
                <br />
                <v-card>
                    <v-form lazy-validation @submit.prevent="onOrganizationSubmit">
                        <v-container>

                            <v-text-field label="Enter Organization Name" v-model="orgname" type="text"
                                required></v-text-field>
                            <v-text-field label="Enter Your Email" v-model="email" :rules="emailRule" type="text"
                                required></v-text-field>
                            {{ this.$store.getters.getEmailAddress }}

                            <br />

                            <small>Please enter an Organization name to create and conduct surveys.</small>

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
import { computed } from 'vue';



export default {
    name: "CreateOrganization",
    data: () => ({
        dialog: true,
        orgname: "",
        email: "",
    }),

    methods: {

        async sendOrganization(payload) {
            const postData = payload;
            const response = await axios.post(`${server.baseURL}/admin/create/organization`, postData).then((response) => {
                // console.log(postData);
                this.$router.push({ name: 'verify-otp' });
                return true;
            }).catch((error) => {
                console.log(error);
                alert(error.response);
            });
        },

        onOrganizationSubmit() {
            const orgData = {
                orgname: this.orgname,
                email: this.email,
            }
            this.sendOrganization(orgData)
            if (true) {
                console.log(orgData);
            }
            else {
                // alert(response.data.message)
            }
        },


    },


    computed: {
        emailRule() {
            return [
                (v) => !!v || 'E-mail is required',
                (v) => (v === this.$store.getters.getEmailAddress) || 'E-mail must match with previous one'
            ]
        },
    }




}
</script>

<style></style>
