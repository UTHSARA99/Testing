

<template>
    <!-- GRID OF ALL CREATED FORMS -->
    <v-container fluid>
        <v-row>
            <v-col v-for="form in createdForms" :key="form" cols="12" md="4"> <!-- cols="12" md="4"-->
                <SurveyElement :form="form"/>
            </v-col>
        </v-row>
    </v-container>


</template>


<script>

import axios from "axios";
import { server } from "../../helper";
import SurveyElement from "./SurveyElement.vue";

export default {
    name: 'SurveyViewer',
    components: { SurveyElement },
    mounted() {
        //const org = JSON.stringify({ orgId: 2 })//this.$route.params.orgId);
        const email = {email: this.$store.getters.getSessionData.user.email}
        this.getforms(email);
        console.log(email);
    },

    data() {
        return {
            dialog: false,
            currentForm: null,

            orgId: 2,
            createdForms: [],  //contains all json objects relevant to all the forms created by user

            /////////////////////////////

            showResponses: true,

        }
    },

    methods: {
      


        async getforms(data) {
            //get the list of Json forms from a get request

            try {
                console.log('Calling api...');
                const response = await axios.post(`${server.baseURL}/admin/getOrgforms`, data,
                    {
                        headers: {
                            'Content-Type': 'application/json'  //not sure if this is needed
                        }
                    }
                );
                console.log('Called api successfully!');
                console.log(response);

                this.createdForms = response.data;
            } catch (error) {
                console.log(error);
            }
        },

    },

    // computed: {
    //     formQuestions() {
    //         return this.questions;
    //     }
    // }

}

</script>



<style scoped>
/* Needs Styling */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;

}

.main-question button {
    background-color: rgb(177, 241, 211);
}

.survey {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

select,
input[type="text"],
input[type="number"],
input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    background-color: #f1f4fe;
}

.options {
    margin-top: 5px;
}

.options input[type="text"] {
    margin-right: 10px;
    background-color: #f9fee9;
}

.options label {
    display: inline;
    margin-right: 10px;
}

.options button {
    background-color: #f5a799;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.responses {
    margin-top: 10px;
}

.responses label {
    display: block;
    margin-top: 5px;
}

.submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>