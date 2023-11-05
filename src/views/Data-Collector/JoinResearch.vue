<template>
  <div>
    <v-container fluid>

      <v-container>
        <div id="search">
          <h1>Join Researches</h1>
          <!-- Integrate a search -->
          <v-menu>
            <template v-slot:activator>
              <v-select v-model="selectedItem" :items="dropdownItems" label="Search by" style="width: 200px"></v-select>
            </template>
          </v-menu>
        </div>
      </v-container>


      <!-- Pop up dialog box -->

      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>
            Request sent successfully. Please wait for the approval.
          </v-card-text>
          <v-card-actions>
            <v-btn color="light red" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- result table -->

      <v-container class="d-flex align-center justify-center" v-if="selectedItem">
        <div id="search-popup">
          <v-text-field v-model="searchString" style="width: 350px;" :label="`Search by ${selectedItem}`"></v-text-field>
          <v-btn color="primary" dark @click="search">Search</v-btn>
        </div>

      </v-container>

      <v-container fluid>
        <div id="search-results-table">
          <!-- Integrate a search results table -->
          <v-toolbar title="Published Researches"></v-toolbar>

          <v-table fixed-header height="160px" style="padding-bottom:20px">
            <thead>
              <tr>
                <th class="text-center">
                  Form ID
                </th>
                <th class="text-center">
                  Form Title
                </th>
                <!-- <th class="text-center">
                  Form Owner
                </th> -->
                <th class="text-center">
                  Description
                </th>
                <th class="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="searchResults.length === 0">
                <td colspan="4" class="text-center">No results found</td>
              </tr>

              <tr v-else v-for="(i) in searchResults" :key="i.id">
                <td class="text-center">{{ i.id }}</td>
                <td class="text-center">{{ i.title }}</td>
                <!-- <td>{{ i.researchOwner }}</td> -->
                <td class="text-center">{{ i.description }}</td>
                <td class="text-center"><v-btn color="green" :loading="loading" @click="joinResearch(i.id); load();"> Join Research </v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-container>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { server } from '../../helper.js';

export default {

  data() {
    return {
      selectedItem: '',
      navigateItem: '',
      dropdownItems: [
        'Research Title',
        'Organization Name',
        '',
      ],
      searchString: '',

      searchResults: [], //store search results.

      joinRequest: '', //store the selected research to join.

      email: '',
      formId: '',
      loading: false,
      dialog: false,


    }
  },

  methods: {
    

    search() {
      if (this.selectedItem === 'Organization Name') {
        const url = `${server.baseURL}/users/search` + "/" + this.searchString + "/organization";
        axios.get(url)
          .then(response => {
            // Handle the response data
            this.searchResults = response.data;
            console.log(this.searchResults);
          })
          .catch(error => {
            // Handle errors, such as displaying an error message
            console.error('Error:', error);
          });
      }
      else if (this.selectedItem === 'Research Title') {
        const url = `${server.baseURL}/users/search` + "/" + this.searchString + "/forms";
        axios.get(url)
          .then(response => {
            // Handle the response data
            this.searchResults = response.data;
            console.log(this.searchResults);
          })
          .catch(error => {
            // Handle errors, such as displaying an error message
            console.error('Error:', error);
          });
      }
      else {
        alert('Please select a search category');
      }

    },

    async joinResearch(selectedResearchId) {
      // Handle the Join button click for the selected research
      this.joinRequest = selectedResearchId;
      this.email = this.$store.getters.getSessionData.user.email;
      const data = {
        email: this.email,
        formId: this.joinRequest,
      }
      const response = await axios.post(`${server.baseURL}/users/sendrequest`, data).then((response) => {
        console.log(response);
        console.log(data);
        // alert("Your request has been sent to the research owner. Please wait for the approval.");

      }).catch((error) => {
        error = error;
        console.log(error);
        alert(error + ". " + "Please try again with a different email.");

      });
    },

    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.dialog = true; //show the dialog box
    },



  }
};
</script>


<style></style>
