<template>
  <v-app>
    <v-layout>
      <NavBar></NavBar>
      <v-main>
        <!-- Main content -->
        <v-container fluid>
          <!-- Content of pages/components goes here -->
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-layout>
    <FooterDefault></FooterDefault>
  </v-app>
</template>
  
<script>
import NavBar from "../common/Dasboard-NavBar.vue";
import FooterDefault from "../common/Footer-Default.vue";

export default {
  name: "Dashboard-Collector",
  components: {
    NavBar,
    FooterDefault,
  },


};
</script>
  
<style>
.main-content {
  padding: 105px 25px 0 25px;
  margin-left: 337px;
  z-index: -1;
  min-height: 100%;
  /*was 600 */
  background-color: #e8e5fc;
}

@media only screen and (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
  