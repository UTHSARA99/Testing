<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/valid-template-root -->
<template>
    <!-- <v-app> -->
        <!-- <v-layout class="rounded rounded-md"> -->
            <v-navigation-drawer v-model="drawer" class="pl-2 pr-2" style="background-color: rgba(232, 229, 252, 1);">
                <v-container justify-center align-cent>
                    <!-- Row 1 -->
                    <v-row style="height: 100px;">
                        <v-col>
                            <div class="content-box">
                                <v-img src="/src/assets/survey-y-logo.png" class="mx-auto"
                                    style="width: 100px; height: 60px;"></v-img>
                            </div>
                        </v-col>
                    </v-row>


                    <!-- Row 2 -->
                    <v-row style="height: 280px;">
                        <v-col>
                            <div class="content-box-profile">
                                <v-card justify-center flat style="background-color: rgba(194, 192, 210, 1);">
                                    <v-img src="/src/assets/pro-img.svg" class="mx-auto"
                                        style="width: 100px; height: 100px;"></v-img>
                                    <v-card-text>
                                        <h4>Leroy Boone</h4>
                                    </v-card-text>
                                    <v-card-subtitle>Collector</v-card-subtitle>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- Row 3 -->
                    <v-row>
                        <v-col class="pl-0 pr-0">
                            <div class="content-box">
                                <v-list>
                                    <router-link to="/dashboard-collector/join-research"
                                        style="text-decoration: none;"><v-list-item prepend-icon="mdi-plus"
                                            class="pl-0 pr-0" title="Join Researches" value="join-req"
                                            style="font-size: xx-small;"></v-list-item></router-link>
                                    <router-link to="/dashboard-collector/ongoing-research"
                                        style="text-decoration: none;"><v-list-item prepend-icon="mdi-book"
                                            class="pl-0 pr-0" title="Ongoing Researches" value="ongoing"
                                            style="font-size: xx-small;"></v-list-item></router-link>
                                </v-list>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-navigation-drawer>

            <v-app-bar>
                <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <v-menu v-model="menu" offset-y>
                    <template v-slot:activator="{ props }">
                        <v-btn color="blue" icon="mdi-account" size="large" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <router-link style="text-decoration: none; color: black;" to="/dashboard/settings"
                                @click="menuItemClicked('Update Profile Detsils')">Update
                                Profile</router-link>
                        </v-list-item>
                        <v-list-item>
                            <router-link style="text-decoration: none; color: black;" to="/"
                                @click="menuItemClicked('back to login')">Log Out</router-link>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>

           

            <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px; min-width: 500px;">
            </v-main> -->
           
        <!-- </v-layout> -->
    <!-- </v-app> -->
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    drawer: true,
    menu: false,
    selectedTitle: "",
    selectedReqs: [],
    submissions: [
      {
        id: 24,
        title: "Form 2",
        reqs: [
          { uid: 231, name: "John Doe" },
          { uid: 232, name: "Jane Turner" },
          { uid: 233, name: "Mark Green" },
        ],
      },
      { id: 25, title: "Form 3", reqs: [] },
      {
        id: 26,
        title: "Form 4",
        reqs: [
          { uid: 237, name: "Pam Murphy" },
          { uid: 238, name: "Ronda James" },
          { uid: 233, name: "Mark Green" },
        ],
      },
      {
        id: 27,
        title: "Form 5",
        reqs: [
          { uid: 231, name: "John Doe" },
          { uid: 232, name: "Jane Turner" },
          { uid: 233, name: "Mark Green" },
          { uid: 234, name: "Sam Brown" },
        ],
      },
      { id: 28, title: "Form 6", reqs: [] },
    ],
  }),

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    menuItemClicked(item) {
      // Handle menu item click
      console.log(`Clicked: ${item}`);
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