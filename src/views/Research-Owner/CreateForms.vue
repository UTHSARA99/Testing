
<template>
  <div >
      <h1>Create Forms</h1>
     
      <!--<QuestionsView :questions="questionsList" :readOnly="true" /> -->
  




<v-card>
  <v-tabs
    v-model="tab"
    color="deep-purple-accent-4"
    align-tabs="center"
  >
    <v-tab value="1">Create Forms</v-tab>
    <v-tab value="2">Created Forms </v-tab>
    
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="1">
      <v-container fluid style="background-color: #f1f4fe;" >
        
          <SurveyCreator />
      </v-container>

    </v-window-item>
      
      <v-window-item value="2">
        <v-container fluid style="background-color: #f1f4fe;" >
          <SurveyViewer />
        </v-container>        
    </v-window-item>
  </v-window>
</v-card>


  </div>
</template>

<script>
import SurveyCreator from "./SurveyCreator.vue";
import SurveyViewer from "./SurveyViewer.vue";
export default {
  name: 'CreateForms',
  data() {
      return {
          tab: null,
      }
  },
  components: { SurveyCreator, SurveyViewer }
}
</script>