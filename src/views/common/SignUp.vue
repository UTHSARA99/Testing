<template>
    <!-- <v-app> -->
    <v-layout class="rounded-md">
      <v-app-bar id="app-bar" color="rgba(241, 244, 254, 1)">
        <v-row align="center">
          <v-col cols="auto">
            <!-- Image on the left, 10px from the left corner -->
            <v-img
              src="/src/assets/survey-y-logo.png"
              alt="Your Image"
              style="margin-left: 10px; height: 40px; width: 90px"
            ></v-img>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <span class="title">Already a member ? &nbsp; &nbsp;</span>
            <!-- Sign Up button on the right -->
            <router-link to="/" style="text-decoration: none; color: black"
              ><v-btn
                class="custom-button"
                color="blue"
                variant="outlined"
                position="relative"
              >
                Log In
              </v-btn></router-link
            >
          </v-col>
        </v-row>
      </v-app-bar>
  
      <v-content class="mx-auto mb-4 mt-8">
        <v-navigation-drawer location="right">
          <v-list>
            <v-list-item>
              <v-img
                id="right-image"
                class="bg-white"
                height="100%"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                cover
              >
                <v-card
                  max-width="400"
                  width="252"
                  flat
                  color="transparent"
                  class="mt-15"
                >
                  <v-card-title class="text-center">
                    <h3 id="right-h3" class="text-center">
                      Empowering Insights <br />through Data
                      <br />Collection:<br />
                    </h3>
                  </v-card-title>
                  <v-card-text>
                    <p id="right-para">
                      <br />Enabling researchers and organizations to gather,
                      manage, and analyze data effortlessly, fostering informed
                      decision-making and advancing knowledge discovery.
                    </p>
                  </v-card-text>
                </v-card></v-img
              >
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  
        <v-main
          class="d-flex align-center justify-center pb-8"
          style="min-height: 400px"
        >
          <v-sheet width="400" class="mx-auto">
            <v-card class="align-center justify-center" flat color="transparent">
              <h3>Create your Account Today</h3>
            </v-card>
            <br />
            <v-form v-model="valid">
              <v-container>
                <v-row max-width="100%">
                  <v-col cols="14" md="6">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                      hide-details
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="14" md="6">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <br />
  
                <v-select
                  v-model="role"
                  label="Role"
                  :items="['Form Owner', 'Data Collector']"
                ></v-select>
  
                <br />
  
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  hide-details
                  required
                ></v-text-field>
  
                <br />
  
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Confirm Pasword"
                  type="password"
                  hide-details
                  required
                ></v-text-field>
  
                <br />
  
                <v-text-field
                  v-model="confirmPassword"
                  :rules="passwordRules"
                  label="Confirm Pasword"
                  type="password"
                  hide-details
                  required
                ></v-text-field>
  
                <br />
  
                <v-btn type="submit" block class="mt-2">Submit</v-btn>
              </v-container>
            </v-form>
          </v-sheet>
        </v-main>
      </v-content>
    </v-layout>
    <!-- </v-app> -->
  </template>
  
  <script>
  export default {
    name: "Signup",
    data: () => ({
      valid: true,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: null,
      items: ["Form Owner", "Data Collector"],
    }),
  };
  </script>
  
  <style scoped>
  .color {
    position: absolute;
    background-color: #1976d2;
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
  
  #app-bar {
    padding-inline-end: 10px;
  }
  
  #right-image {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  #right-para {
    font-weight: 700;
    font-size: 18px;
    line-height: 27.5px;
    color: #ffffff;
    font-family: "Roboto", sans-serif;
  }
  
  #right-h3 {
    font-weight: 400;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0;
    line-height: 24px;
    line-height: 30.5px;
    font-family: "Roboto", sans-serif;
  }
  </style>
  