<template>
    <v-app>
        <v-layout>
            <RONavBar></RONavBar>
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
import RONavBar from '../common/Dashboard-RONavBar.vue';
import FooterDefault from "../common/Footer-Default.vue";

export default {
    name: "Dashboard-ResOwner",
    components: {
        RONavBar,
        FooterDefault,
    },

    
};
</script>
  
<style>
.main-content {
    padding: 105px 25px 25px 25px;
    margin-left: 337px;
    z-index: -1;
    min-height: 100%;
    background-color: #E8E5FC;
}

@media only screen and (max-width: 768px) {
    .main-content {
        margin-left: 0;
    }
}
</style>
  