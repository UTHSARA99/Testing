
<template>
<div>
    <div class="container" style="padding-top: 10px">
        <h3>Published Forms</h3>
  

        <v-toolbar title="Published Forms">  
      <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
    min-width="250"
  >
    <v-card-text>
      <v-text-field
        :loading="loading"   
         v-model="searchQuery"
            
        density="compact"
        variant="solo"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-card>
  


    
    </v-toolbar>
       
        <v-table fixed-header height="160px">
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
                <td>{{  i.title  }}</td>
                <td><v-btn  @click="showSubmissions(index)" >Show Submissions</v-btn></td>
            </tr>
        </tbody>
    </v-table>
    </div>
    <div class="container" style="padding-top: 60px">
                
        <v-toolbar title="Submissions "><h2>{{ selectedTitle }}</h2> 
            <v-btn style="margin-left: 50px">
            DOWNLOAD ALL
      </v-btn>
    </v-toolbar>
       
        <v-table >
        <thead>
            <tr>
                <th class="text-center">
                    Submission ID
                </th>
                <th class="text-center">
                    Submitted By
                </th>
                <th class="text-center">
                    Date
                </th>
                <th class="text-center">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in selectedSubs" :key="i.id">
                <td>{{ i.sid }}</td>
                <td>{{  i.sby  }}</td>
                <td>{{  i.dat  }}</td>
                <td>{{  i.tim  }}</td>
                   </tr>
        </tbody>
    </v-table>
        
    </div>
</div>
</template>
<script>

export default {
    name: 'PublishedForms',
    data() {
        return {
            //related to search
            loaded: false,
      loading: false,
      searchQuery: "",
           
            submissions: [{ id: 24, title: 'Form 2', 
            subs:[{
    sid: 1,
    sby: "John Smith",
    dat: "01.01.2023",
    tim: "09:00"
  },
  {
    sid: 2,
    sby: "Jane Doe",
    dat: "02.01.2023",
    tim: "14:30"
  },
  {
    sid: 3,
    sby: "Alice Johnson",
    dat: "03.01.2023",
    tim: "20:15"
  },
  {
    sid: 4,
    sby: "Michael Brown",
    dat: "04.01.2023",
    tim: "12:45"
  },
  {
    sid: 5,
    sby: "Emily Wilson",
    dat: "05.01.2023",
    tim: "16:20"
  },
  {
    sid:6,
    sby:'Maya Hawkins',
    dat: '12.02.2023',
    tim: '18:42' 
  },
  {
    sid:7,
    sby:'Maya Hawkins',
    dat: '12.02.2023',
    tim: '18:42'
  }]},


            { id: 25, title: 'Form 3', subs: [{    sid: 6,
    sby: "David Lee",
    dat: "06.01.2023",
    tim: "08:55"
  },
  {
    sid: 7,
    sby: "Sarah Davis",
    dat: "07.01.2023",
    tim: "19:30"
  },
  {
    sid: 8,
    sby: "Olivia Martinez",
    dat: "08.01.2023",
    tim: "10:10"
  },
  {
    sid: 9,
    sby: "James Taylor",
    dat: "09.01.2023",
    tim: "14:05"
  },
  {
    sid: 10,
    sby: "Sophia Johnson",
    dat: "10.01.2023",
    tim: "17:40"
  },
  {
    sid: 11,
    sby: "William Anderson",
    dat: "11.01.2023",
    tim: "09:25"
  },
  {
    sid: 12,
    sby: "Mia Garcia",
    dat: "12.01.2023",
    tim: "13:15"
  }] },

            { id: 26, title: 'Form 4', subs: [{
    sid: 13,
    sby: "Liam Hernandez",
    dat: "13.01.2023",
    tim: "22:10"
  },
  {
    sid: 14,
    sby: "Ava Wilson",
    dat: "14.01.2023",
    tim: "11:30"
  },
  {
    sid: 15,
    sby: "Benjamin Taylor",
    dat: "15.01.2023",
    tim: "18:55"
  },
  {
    sid: 16,
    sby: "Emma Martinez",
    dat: "16.01.2023",
    tim: "10:40"
  },
  {
    sid: 17,
    sby: "Jackson Brown",
    dat: "17.01.2023",
    tim: "15:20"
  },
  {
    sid: 18,
    sby: "Charlotte Davis",
    dat: "18.01.2023",
    tim: "20:45"
  }] },

            { id: 27, title: 'Form 5', subs: [  
  {
    sid: 19,
    sby: "Sebastian Lee",
    dat: "19.01.2023",
    tim: "09:15"
  },
  {
    sid: 20,
    sby: "Olivia Wilson",
    dat: "20.01.2023",
    tim: "14:50"
  },
  {
    sid: 21,
    sby: "Lucas Hernandez",
    dat: "21.01.2023",
    tim: "17:25"
  },
  {
    sid: 22,
    sby: "Avery Johnson",
    dat: "22.01.2023",
    tim: "11:05"
  },
  {
    sid: 23,
    sby: "Harper Smith",
    dat: "23.01.2023",
    tim: "19:10"
  },
  {
    sid: 24,
    sby: "Ethan Davis",
    dat: "24.01.2023",
    tim: "08:40"
  }] },
            { id: 28, title: 'Form 6', subs: [{
    sid: 25,
    sby: "Sophia Martinez",
    dat: "25.01.2023",
    tim: "14:00"
  },
  {
    sid: 26,
    sby: "Jackson Wilson",
    dat: "26.01.2023",
    tim: "21:35"
  },
  {
    sid: 27,
    sby: "Emma Johnson",
    dat: "27.01.2023",
    tim: "12:20"
  },
  {
    sid: 28,
    sby: "Aiden Lee",
    dat: "28.01.2023",
    tim: "16:45"
  },
  {
    sid: 29,
    sby: "Olivia Davis",
    dat: "29.01.2023",
    tim: "09:30"
  },
  {
    sid: 30,
    sby: "Mason Brown",
    dat: "30.01.2023",
    tim: "13:55"
  },
  {
    sid: 31,
    sby: "Charlotte Smith",
    dat: "31.01.2023",
    tim: "18:05"
  },
  {
    sid: 32,
    sby: "Elijah Johnson",
    dat: "01.02.2023",
    tim: "10:50"
  },
  {
    sid: 33,
    sby: "Ava Wilson",
    dat: "02.02.2023",
    tim: "15:15"
  },
  {
    sid: 34,
    sby: "William Davis",
    dat: "03.02.2023",
    tim: "22:30"
  },
  {
    sid: 35,
    sby: "Olivia Lee",
    dat: "04.02.2023",
    tim: "11:10"
  }] }
            ],
            selectedTitle: '',
            selectedSubs: []//let's put dummy data for now otherwise should be a prop from the rresearch form selected




        };
    },
    methods: {

        showSubmissions(index) {

            this.selectedSubs = this.submissions[index].subs;
            this.selectedTitle = this.submissions[index].title;

        },

        //Regarding Search
        onClick () {
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