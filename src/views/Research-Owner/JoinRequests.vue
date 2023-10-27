<template>
    <div>
        <div class="container" style="padding-top: 10px">
            <h3>Accept Join Requests</h3>


            <v-toolbar title="Published Forms">
                <v-card class="mx-auto" color="grey-lighten-3" max-width="400" min-width="250">
                    <v-card-text>
                        <v-text-field :loading="loading" v-model="searchQuery" density="compact" variant="solo"
                            label="Search" append-inner-icon="mdi-magnify" single-line hide-details
                            @click:append-inner="onClick"></v-text-field>
                    </v-card-text>
                </v-card>


            </v-toolbar>

            <v-table fixed-header height="160px" style="padding-bottom:20px">
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
                    <tr v-for="(i, index) in submissions" :key="i.id">
                        <td>{{ i.id }}</td>
                        <td>{{ i.title }}</td>
                        <td><v-btn v-show="i.reqs.length > 0" @click="showRequests(index)">View Join Requests ({{
                            i.reqs.length }})</v-btn></td>
                    </tr>
                </tbody>
            </v-table>
        </div>


        <div class="container" style="padding-top: 40px;">
            <v-container fluid>
                <v-row>
                    <v-col v-for="i in selectedReqs" :key="i.uid" cols="12" sm="6" md="4" lg="3">
                        <v-card class="mx-auto" max-width="344">
                            <v-card-item>
                                <div>
                                    <v-avatar color="purple" size="x-large">
                                        <span class="text-h5">{{ i.name[0] }}</span>
                                    </v-avatar>
                                    <div class="text-overline mb-1">

                                    </div>
                                    <div class="text-h6 mb-1">
                                        {{ i.name }}
                                    </div>
                                    <div class="text-caption">Data Collector.ID {{ i.uid }}. See Profile.</div>
                                </div>
                            </v-card-item>

                            <v-card-actions>
                                <v-btn>
                                    Accept
                                </v-btn>
                                <v-btn>
                                    Delete
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

    </div>
</template>

<script>

//ACCEPT, DELETE and viewing profile capability...
// SEPARATE HISTORY of approvals (who's in res grp- form) Table, BUT, state management? must be synced right?
export default {
    name: 'JoinRequests',
    data() {
        return {
            selectedTitle: '',
            selectedReqs: [],
            submissions: [
                { id: 24, title: 'Form 2', reqs: [{ uid: 231, name: "John Doe" }, { uid: 232, name: "Jane Turner" }, { uid: 233, name: "Mark Green" }] },
                { id: 25, title: 'Form 3', reqs: [] },
                { id: 26, title: 'Form 4', reqs: [{ uid: 237, name: "Pam Murphy" }, { uid: 238, name: "Ronda James" }, { uid: 233, name: "Mark Green" }] },
                { id: 27, title: 'Form 5', reqs: [{ uid: 231, name: "John Doe" }, { uid: 232, name: "Jane Turner" }, { uid: 233, name: "Mark Green" }, { uid: 234, name: "Sam Brown" }] },
                { id: 28, title: 'Form 6', reqs: [] }]
            ,
        }
    },

    methods: {

        showRequests(index) {

            this.selectedReqs = this.submissions[index].reqs;
            this.selectedTitle = this.submissions[index].title;
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