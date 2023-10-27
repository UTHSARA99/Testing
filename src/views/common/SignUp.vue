<template>
  <v-layout class="rounded-md">
    <v-app-bar id="app-bar" color="rgba(241, 244, 254, 1)">
      <v-row align="center">
        <v-col cols="auto">
          <!-- Image on the left, 10px from the left corner -->
          <router-link to="/"><v-img src="/src/assets/survey-y-logo.png" alt="Your Image"
              style="margin-left: 10px; height: 40px; width: 90px"></v-img></router-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <span class="title">Already a user! &nbsp; &nbsp;</span>
          <!-- Sign Up button on the right -->
          <router-link to="/login" style="text-decoration: none; color: black"><v-btn class="custom-button" color="blue"
              variant="outlined" position="relative">
              Log In
            </v-btn></router-link>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content class="mx-auto mb-4 mt-8">
      <v-navigation-drawer location="right">
        <v-list>
          <v-list-item>
            <v-img id="right-image" class="bg-white" height="100%"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" cover>
              <v-card max-width="400" width="252" flat color="transparent" class="mt-15">
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
              </v-card></v-img>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center pb-8" style="min-height: 400px">
        <v-sheet width="400" class="mx-auto">
          <v-card class="align-center justify-center" flat color="transparent">
            <h3>Create your Account Today</h3>
          </v-card>
          <br />
          <v-form @submit.prevent="onSignUp">
            <v-container>
              <v-row max-width="100%">
                <v-col cols="14" md="6">
                  <v-text-field v-model="fname" :rules="nameRules" label="First name" required="true"></v-text-field>
                </v-col>

                <v-col cols="14" md="6">
                  <v-text-field v-model="lname" :rules="nameRules" label="Last name" hide-details required></v-text-field>
                </v-col>
              </v-row>

              <br />

              <v-select v-model="role" label="Role" :items=this.items :rules="roleRules"></v-select>

              <br />

              <v-text-field v-model.trim="email" :rules="emailRules" label="E-mail" required></v-text-field>

              <br />

              <v-text-field v-model="password" :rules="passwordRules" label="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1" required></v-text-field>

              <br />

              <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" label="Confirm Password"
                type="password" required></v-text-field>

              <br />

              <v-btn type="submit" block class="mt-2">Submit</v-btn>
            </v-container>
          </v-form>
        </v-sheet>

        <!-- OTP code entering window. -->
        <!-- <otpDialog v-if="dialog"></otpDialog> -->



      </v-main>
    </v-content>
  </v-layout>
</template>
  
<script>

import axios from 'axios';
import { server } from '../../helper.js';
import router from '../../router/index.js';

export default {
  name: "Signup",
  data: () => ({
    show1: false,
    dialog: false,
    valid: true,
    otp: "",


    fname: "",
    lname: "",
    email: "",
    password: "",
    role: null,
    confirmPassword: "",
    roleId: 0,
    items: ["Research Owner", "Data Collector"],
  }),



  computed: {
    confirmPasswordRules() {
      return [
        (v) => !!v || "Confirm Password is required",
        (v) => (v === this.password) || "Password does not match",
      ];
    },

    roleRules() {
      return [
        (v) => !!v || "Role is required",
      ];
    },


    passwordRules() {
      return [
        v => !!v || 'Please enter your password',
        v => (v && v.length >= 6 && v.length <= 20) || 'Password must be at least 6 characters and less than 20 characters',
        v => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}$/).test(v) || 'Password must contain at least one number, one uppercase, one lowercase and one special character',
        

      
      ];
    },

    emailRules() {
      return [
        v => !!v || 'Please enter your e-mail',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ];
    },

    nameRules() {
      return [
        (v) => !!v || "Name is required"];
    },





  },



  // components: {
  //   otpDialog,
  // },


  methods: {

    //sending data to backend registration.

    async signup(payload) {
      // const postData = JSON.stringify(payload);
      console.log(payload);

      const response = await axios.post(`${server.baseURL}/auth/register`, payload).then((response) => {
        if (response.status === 201) {
          this.$store.commit('setFirstReg', true);
          this.$store.commit('setEmailAddress', payload.email);
          //role based login for the users

          if (payload.roleId == 1) {
            this.$router.push({ name: 'create-organization' });
          }
          else if (payload.roleId == 2) {
            this.$router.push({ name: 'verify-otp' });
          }
          else {
            alert("Something went wrong!. Please try again.")
          }
        }

      }).catch((error) => {
        error = error;
        console.log(error);
        alert("Please try again with a different email.");

      });
    },

    onSignUp() {
      const userData = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        roleId: this.role === 'Research Owner' ? 1 : 2,
      }
      //send user data to backend 


      this.signup(userData);

    },





  },
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