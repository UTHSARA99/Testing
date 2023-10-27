<template>
  <!-- <v-app> -->
  <!-- <v-layout class="rounded rounded-md"> -->
  <div class="NavBar">
    <v-navigation-drawer id="drawer" v-model="drawer" class="pl-2 pr-2" style="background-color: rgba(232, 229, 252, 1);">
      <v-container justify-center align-cent>
        <!-- Row 1 -->
        <v-row style="height: 100px;">
          <v-col>
            <div class="content-box">
              <v-img src="../../../src/assets/survey-y-logo.png" class="mx-auto" style="width: 100px; height: 60px;"></v-img>
            </div>
          </v-col>
        </v-row>


        <!-- Row 2 -->
        <v-row style="height: 280px;">
          <v-col>
            <div class="content-box-profile">
              <v-card justify-center flat style="background-color: rgba(194, 192, 210, 1);">
                <v-avatar size="100"><v-img src="/src/assets/pro-img-1.jpg" class="mx-auto" style="width: 2000px; height: 100px;"></v-img></v-avatar>
                <v-card-text>
                  <h4>{{ userName = (this.$store.getters.getSessionData.user.fname + " " +
                    this.$store.getters.getSessionData.user.lname) }}</h4>
                  <!-- (this.$store.getters.getSessionData.user.fname + " " + this.$store.getters.getSessionData.user.lname) -->
                </v-card-text>
                <v-card-subtitle id="role">{{ role = (this.$store.getters.getSessionData.user.roleId === 1) ? "Research Owner" : "Data Collector" }}</v-card-subtitle>
                <!-- = (this.$store.getters.getSessionData.user.roleId === 1) ? "Research Owner" : "Data Collector" -->
              </v-card>
            </div>
          </v-col>
        </v-row>

        <!-- Row 3 -->
        <v-row>
          <v-col class="pl-0 pr-0">
            <div class="content-box">
              <v-list>
                <router-link to="/dashboard-collector/join-research" style="text-decoration: none;"><v-list-item
                    prepend-icon="mdi-plus" class="pl-0 pr-0" title="Join Researches" value="join-req"
                    style="font-size: xx-small;"></v-list-item></router-link>
                <router-link to="/dashboard-collector/ongoing-research" style="text-decoration: none;"><v-list-item
                    prepend-icon="mdi-book" class="pl-0 pr-0" title="Ongoing Researches" value="ongoing"
                    style="font-size: xx-small;"></v-list-item></router-link>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon id="toggle" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- <v-btn color="blue" id="menu" icon="mdi-account" size="large"></v-btn> -->
      <v-btn id="menu-activator" color="blue" icon="mdi-account" size="large">
      </v-btn>

      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title @click="navigateToPage(item.route)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>



    <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px; min-width: 500px;">
            </v-main> -->

    <!-- </v-layout> -->
    <!-- </v-app> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    drawer: true,
    menu: false,
    userName: "",
    role: "",
    items: [
        { title: 'Update Profile', route: "/dashboard-collector/update-profile-2"},
        { title: 'Log Out', route: "/"},
      ],
  }),

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },

    navigateToPage(route) {
      // Use the Vue Router to navigate to the selected page
      if(route === "/") {
        this.$store.dispatch("setSessionData", "null");
        this.$store.dispatch("setLoginStatus", false);
        // console.log(this.$store.getters.getLoginStatus);
        // console.log(this.$store.getters.getSessionData);
        this.$router.push(route);

      }else{
      this.$router.push(route);
      }
    },

  },
};
</script>

<style>
.content-box-profile {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(194, 192, 210, 1);
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>