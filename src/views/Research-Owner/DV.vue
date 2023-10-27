<template>
    <div>
        <div class="container" style="padding-top: 10px">
            <h3>Visualize Data From Forms</h3>


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
                        <td><v-btn @click="visualize(index)">Visualize</v-btn></td>
                    </tr>
                </tbody>
            </v-table>
        </div>





        <div>


            <v-container fluid>


                <!-- Large Card -->


                <v-card v-if="selectedTitle==='Form 2'">
                    <v-card-title>{{ selectedTitle }}</v-card-title>
                    <div style="margin-bottom:30px">
                        <v-row>
                            <v-col >
                                <v-card>
                                    <v-card-title>RESPONSES RECIEVED :{{ titles.length }}</v-card-title>
                                </v-card>
                                <v-card>
                                    <v-card-title>First Submission: July 16 2023</v-card-title>
                                    <v-card-title>Last Submission: September 14 2023</v-card-title>
                                </v-card>
                                <v-card>
                                    <v-card-title>Form Description</v-card-title>
                                    This Form is aimed to collect data on the number of people who have been diagnosed with Hypertension in the last five years.
                                </v-card>
                            </v-col>
                        </v-row></div>
                    <v-spacer></v-spacer>

                    <v-row>
                        <v-col v-for="title in titles" :key="title.id" cols="12" sm="8" md="6" lg="4">

                            <v-card class="mx-auto" max-width="500">
                                <v-card-title>{{ title.text }}</v-card-title>
                                <div v-if="title.type === 'bar'">
                                    <apexchart max-width="100%" min-width="300" type="bar" :options="title.options"
                                        :series="title.series"></apexchart>
                                </div>
                                <div v-else-if="title.type === 'donut'">
                                    <apexchart width="380" type="donut" :options="title.options" :series="title.series">
                                    </apexchart>
                                </div>

                                <div v-else-if="title.type === 'line'">
                                    <apexchart max-width="100%" type="line" :options="title.options" :series="title.series">
                                    </apexchart>

                                </div>
                                <div v-else>
                                    <v-card-subtitle max-width="100%">This Question type does not support
                                        visualization</v-card-subtitle>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-card>
            </v-container>
        </div>





    </div>
</template>

<script>
export default {
    name: 'DV',
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

            titles: [
                {
                    id: 1, text: 'Question 1',
                    type: 'bar',
                    options: {
                        chart: {
                            id: 'vuechart-example'
                        },
                        xaxis: {
                            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                        }
                    },
                    series: [{
                        name: 'series-1',
                        data: [30, 40, 45, 50, 49, 60, 70, 91]
                    }]
                },
                {
                    id: 2, text: 'Question 2',
                    type: 'donut',
                    options: {},
                    series: [44, 55, 41, 17, 15]
                },
                {
                    id: 3, text: 'Question 3',
                    type: 'bar',
                    options: {
                        chart: {
                            id: 'vuechart-example'
                        },
                        xaxis: {
                            categories: [1, 2, 3, 4, 5]
                        }
                    },
                    series: [{
                        name: 'series-1',
                        data: [67, 3, 43, 12, 9]
                    }]
                },
                {
                    id: 4, text: 'Question 4',
                    type: 'bar',
                    options: {
                        chart: {
                            id: 'vuechart-example'
                        },
                        xaxis: {
                            categories: ["water", "fire", "earth", "air"]
                        }
                    },
                    series: [{
                        name: 'series-1',
                        data: [75, 96, 45, 12]
                    }]
                },
                {
                    id: 5, text: 'Question 5',
                    type: 'line',
                    options: {
                        chart: {
                            id: 'vuechart-example'
                        },
                        xaxis: {
                            categories: ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7"]
                        }
                    },
                    series: [{
                        name: 'series-1',
                        data: [23, 56, 75, 92, 46, 23, 87]
                    }]
                },
                {
                    id: 6, text: 'Question 6',
                    type: 'bar',
                    options: {
                        chart: {
                            id: 'vuechart-example'
                        },
                        xaxis: {
                            categories: [1, 2, 3, 4, 5]
                        }
                    },
                    series: [{
                        name: 'series-1',
                        data: [67, 3, 43, 12, 9]
                    }]
                },
                {
                    id: 7, text: 'Question 7',
                    type: 'none'
                },

                { id: 8, text: 'Question 8', type: 'none' },
                { id: 9, text: 'Question 9', type: 'none' },
            ]

        }
    },

    methods: {

        visualize(index) {

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