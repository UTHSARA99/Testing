<template>
    <div>
        <div class="container" style="padding-top: 10px">
            <h3>Accept Join Requests</h3>
<!-- {{ snackbar }} -->

            <v-toolbar title="Published Forms">
                <v-card class="mx-auto" color="grey-lighten-3" max-width="400" min-width="250">
                    <v-card-text>
                        <v-text-field :loading="loading" v-model="searchQuery" density="compact" variant="solo"
                            label="Search" append-inner-icon="mdi-magnify" single-line hide-details
                            @click:append-inner="onClick"></v-text-field>
                    </v-card-text>
                </v-card>


            </v-toolbar>

            <v-table fixed-header height="368px" style="padding-bottom:20px">
                <thead>
                    <tr>
                        <th class="text-center">
                            Form ID
                        </th>
                        <th class="text-center">
                            Form Title
                        </th>
                        <th class="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in createdForms" :key="i.id">
                        <td class="text-center">{{ i.id }}</td>
                        <td class="text-center">{{ i.title }}</td>
                        <td><v-btn v-if="hasRequests(i.id)" @click="showRequests(i.id, i.title)">View Join Requests</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>


        <div class="container" style="padding-top: 40px;">
            <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
                                    <b>
                                        {{ text }}
                                    </b>
                                    <template v-slot:actions>
                                        <v-btn color="white" variant="text" @click="snackbar = false">
                                            Close
                                        </v-btn>
                                    </template>
                                </v-snackbar>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <h3> {{ heading}}</h3>

                    </v-col>
                    <v-col v-for="i in selectedReqs" :key="i.userId" cols="12" sm="6" md="4" lg="3">
                        <v-card class="mx-auto" max-width="344">
                            <v-card-item>
                                <div>
                                    <v-avatar color="purple" size="x-large">
                                        <span class="text-h5">{{ i.fname[0] }}</span>
                                    </v-avatar>
                                    <div class="text-overline mb-1">

                                    </div>
                                    <div class="text-h6 mb-1">
                                        {{ i.fname + " " + i.lname }}
                                    </div>
                                    <!-- <div class="text-caption">Data Collector.ID {{ i.uid }}. See Profile.</div> -->
                                    <div>
                                        Data Collector
                                        <br>
                                        Requested to join on: {{ i.createdAt.slice(0, 10) }}

                                    </div>
                                </div>
                            </v-card-item>

                            <v-card-actions>
                                <v-btn variant="tonal" @click="acceptCard(i.userId)">
                                    Accept
                                </v-btn>
                                <v-btn variant="tonal" @click="declineCard(i.userId)">
                                    Decline
                                </v-btn>

                               
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
<br><br>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";


//ACCEPT, DELETE and viewing profile capability...
// SEPARATE HISTORY of approvals (who's in res grp- form) Table, BUT, state management? must be synced right?
export default {
    name: 'JoinRequests',
    mounted() {
        //const org = JSON.stringify({ orgId: 2 })//this.$route.params.orgId);
        const email = { email: this.$store.getters.getSessionData.user.email }
        this.getforms(email);
        this.getrequests(email);
    },

    data() {
        return {
            //         snackbar: false,
            //   alertMessage: "Accepted JOin Requested successfully!",

            heading: "",
            showMessage: false,
            //Snakbar
            snackbar: false,
            text: "Accepted Join Requested successfully!",
            timeout: 3000,

            createdForms: [],
            formRequests: [],
            selectedTitle: '', //
            selectedFormId: '',
            selectedReqs: [],


        }
    },

    methods: {
        async acceptCard(userID) {

            const data = {
                userId: userID,
                formId: this.selectedFormId,
                status: true, //set to 1 for accpted
            }
            try {
                // Send to backend
                await this.addMemberToBackend(data);
                //show Alert
                //this.snackbar = true;
                //render updated list of requests
                await this.getrequests({ email: this.$store.getters.getSessionData.user.email });
                this.showRequests(this.selectedFormId, this.selectedTitle);
            } catch (error) {
                console.error(error);
                // Handle any errors that may occur during the async operations
            }

        },
        async declineCard(userID) {

            const data = {
                userId: userID,
                formId: this.selectedFormId,
                status: false, //set to 2 once databse is updated
            }
            try {
                // Send to backend
                await this.addMemberToBackend(data);
                //show Alert
                //this.snackbar = true;
                //render updated list of requests
                await this.getrequests({ email: this.$store.getters.getSessionData.user.email });
                this.showRequests(this.selectedFormId, this.selectedTitle);
            } catch (error) {
                console.error(error);
                // Handle any errors that may occur during the async operations
            }

        },
        async addMemberToBackend(data) {
            try {
                console.log('Calling api...');
                const response = await axios.post(`${server.baseURL}/admin/addmember`, data,
                    {
                        headers: {
                            'Content-Type': 'application/json'  //not sure if this is needed
                        }
                    }
                );
                console.log('Called api successfully!');
                console.log(response);
                this.text = response.data.message;
                this.snackbar = true;

                //this.getforms()
            } catch (error) {
                console.log(error);
            }

        },

        //mounting
        async getforms(data) {
            //get the list of Json forms from a get request upon mounting

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

        async getrequests(data) {
            //get the list of forms and their requests upon mounting

            try {
                console.log('Calling api...get reqs!');
                const response = await axios.post(`${server.baseURL}/admin/getrequests`, data,
                    {
                        headers: {
                            'Content-Type': 'application/json'  //not sure if this is needed
                        }
                    }
                );
                console.log('Called api successfully!');
                console.log(response);

                this.formRequests = response.data;

            } catch (error) {
                console.log(error);
            }
        },

        //upon rendering published forms table, show 'VIEW REQUESTS' button only if there are requests for each form
        hasRequests(ogFormId) {
            for (let i = 0; i < this.formRequests.length; i++) {
                if (this.formRequests[i].formId === ogFormId) {
                    return true;
                }
            }
            return false;

        },

        //upom clicking "view requests", show the requests for that form
        showRequests(formID, formTitle) {
            this.heading = "Join Requests for " + formTitle;
            this.selectedTitle = formTitle;
            this.selectedFormId = formID;

            let matchFound = false;
            this.formRequests.forEach((item) => {
                if (item.formId === formID) {
                    this.selectedReqs = item.request;
                    console.log("selected reqs");
                    console.log(this.selectedReqs);
                    matchFound = true;
                }
            });

            // Check if no matching formId was found, then set this.selectedReqs to an empty array
            if (!matchFound) {
                this.selectedReqs = [];
            }
        },

        //Regarding Search
        onClick() {
            this.loading = true,
                console.log(this.searchQuery)

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },
    }


}

</script>

<style>
.card-icon .card-buttons {
    /* Set the buttons container to have absolute positioning */
    bottom: 10px;
    /* Adjust the distance from the bottom as needed */
    left: 0;
    /* Align the buttons to the left */
    width: 100%;
    /* Make the buttons span the full width of the card */
    text-align: center;
    /* Center-align the buttons horizontally */
}

.card-icon .card-buttons button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
}

.card-icon .card-buttons button:hover {
    background-color: #0056b3;
}
</style>