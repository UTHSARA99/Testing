<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>User Profile</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="user.lastName" label="Last Name"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="user.email" label="Email"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn @click="updateProfile" color="primary">Update Profile</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
        },
      };
    },
    methods: {
      updateProfile() {
        
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  