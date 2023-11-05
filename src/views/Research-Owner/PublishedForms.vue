
<template>
  <div>
    <div class="container" style="padding-top: 10px">
      <h3>Published Forms</h3>


      <v-toolbar title="Published Forms">
        <v-card class="mx-auto" color="grey-lighten-3" max-width="400" min-width="250">
          <v-card-text>
            <v-text-field :loading="loading" v-model="searchQuery" density="compact" variant="solo" label="Search"
              append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
          </v-card-text>
        </v-card>




      </v-toolbar>

      <v-table fixed-header height="368px">
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
            <td class="text-center"><v-btn @click="showSubmissions(i.id, i.title)">Show Submissions</v-btn></td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="container" style="padding-top: 60px">


      <div v-if="showSubissionTable">
        <v-toolbar title="Submissions ">
          <h2>{{ selectedTitle }}</h2>



          <v-btn style="margin-left: 30px" variant="tonal" v-bind="props" @click="toggleTable">Show Entries</v-btn>

          <v-btn style="margin-left: 20px" variant="tonal" @click="downloadSubmissions()">
            DOWNLOAD ALL
          </v-btn>
        </v-toolbar>

        <v-table>
          <thead>
            <tr>
              <th class="text-center">
                Submission ID
              </th>
              <!-- <th class="text-center">
                Submitted By
              </th> -->
              <th class="text-center">
                Date
              </th>
              <th class="text-center">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i) in submissions[0]" :key="i.id">
              <td class="text-center">{{ i.id }}</td>
              <!-- <td>{{ submissions[1][index].fname + " " + submissions[1][index].lname }}</td> -->
              <td class="text-center">{{ i.createdAt.slice(0, 10) }}</td>
              <td class="text-center">{{ i.createdAt.slice(11, 19) }}</td>
            </tr>
          </tbody>
        </v-table>
        <br>
        <br>

      </div>
    </div>

    <!-- form input table -->
    <div>

      <!-- <div >     v-if="showTable" -->
      <div v-if="showTable">

        <v-table>
          <thead>
            <tr>
              <th v-for="(question, index) in qheaders" :key="index">
                <div class="truncate-text">{{ question }}</div>
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in qanswers" :key="index">
              <td v-for="(answer, index) in row" :key="index">
                <div class="truncate-text">{{ answer }} </div>
              </td>
            </tr>

          </tbody>
        </v-table>
      </div>



    </div>




    <br><br><br>
  </div>
</template>


<script>
import axios from "axios";
import { server } from "../../helper";
import ExcelJS from 'exceljs';

export default {
  name: 'PublishedForms',
  mounted() {
    //const org = JSON.stringify({ orgId: 2 })//this.$route.params.orgId);
    const email = { email: this.$store.getters.getSessionData.user.email }
    this.getforms(email);
    console.log(email);
  },

  data() {
    return {
      //related to search
      createdForms: [],

      //table
      showTable: false,
      qheaders: [],
      qanswers: [], //list of lists of answers

      //dialog: false,


      loaded: false,
      loading: false,
      searchQuery: "",


      showSubissionTable: false,
      selectedTitle: '',
      selectedSubs: [],//let's put dummy data for now otherwise should be a prop from the rresearch form selected
      submissions: [],



    };
  },
  methods: {
    async getforms(data) {
      //get the list of Json forms from a get request

      try {
        const response = await axios.post(`${server.baseURL}/admin/getOrgforms`, data,
          {
            headers: {
              'Content-Type': 'application/json'  //not sure if this is needed
            }
          }
        );
        this.createdForms = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async showSubmissions(ID, title) {

      this.showTable = false;
      this.showSubissionTable = true;

      //this.selectedSubs = this.submissions[index].subs;
      this.selectedTitle = title;
      //get the list of Json forms from a get request
      const data = { formId: ID };

      try {
        const response = await axios.post(`${server.baseURL}/admin/getsubmissions`, data,
          {
            headers: {
              'Content-Type': 'application/json'  //not sure if this is needed
            }
          }
        );
        this.submissions = response.data;
        console.log(this.submissions);
      } catch (error) {
        console.log(error);
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

    //EXCEL
    async downloadSubmissions() {
      // Fetch all submissions from your backend
      const submissions = this.submissions[0]     //send all for now, including user id form id time, dats...[0].data;//await this.fetchSubmissions();


      console.log(submissions);
      // Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Submissions for Form A');

      //     // Define the header row
      // question headers
      const question_headers = ['Submission ID'];
      // this.submissions[0].forEach(question => {
      //     questions_row.push(question.question);})

      submissions[0].data.forEach(question => {
        question_headers.push(question.question)

      });

      worksheet.addRow(question_headers);
      console.log("added column headers")

      //     // Add submission data to the worksheet
      submissions.forEach(submission => {

        const answers = [submission.id];
        submission.data.forEach(question => {
          answers.push(question.answer)
        });
        console.log(answers)

        worksheet.addRow(answers);//[submission.id, submission.formId, submission.userId, submission.data /* ... other fields ... */]);
      });
      console.log("added rows")

      //     // Generate a Blob from the Excel workbook
      const blob = await workbook.xlsx.writeBuffer();
      console.log("generated blob")

      //     // Create a download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'form_submissions.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("created download link")
      // 
    },


    toggleTable() {

      this.qheaders = [];
      this.qanswers = [];
      const question_headers = ['Submission ID'];

      this.submissions[0][0].data.forEach(question => {
        question_headers.push(question.question)

      });
      console.log(question_headers)
      this.qheaders = question_headers;

      this.showTable = !this.showTable;

      //     // Add submission data to the worksheet
      this.submissions[0].forEach(submission => {

        const answers = [submission.id];
        submission.data.forEach(question => {
          answers.push(question.answer)
        });
        console.log(answers)

        this.qanswers.push(answers);//[submission.id, q1.answer, q2.answer...
      });
      console.log(this.qanswers)
      this.showTable = true
    },
  }
}

</script>

<style>
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: auto;
  max-width: 100px;
  /* Set your desired maximum cell width */
  max-height: 50px;
}

.truncate-text:hover {
  overflow: auto;
}


.table-head h3 {
  text-align: left;
  margin-top: 10px;
  padding-right: 10px;
}

.table-head button {

  float: right;
  width: 150px;
  height: 40px;
  border: 1px solid blue;
  background: blue;
  color: #fff;
  cursor: pointer;
}

.download-button {
  text-align: right;
}

.form-search input[type='text'] {
  border: 1px solid #e2e8f5;
  background-color: #ffffff;
  height: 30px;
  border-radius: 6px;
  width: 232px;
  padding: 5px 10px;
}
</style>