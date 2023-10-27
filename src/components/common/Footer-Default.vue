<template>
    <v-footer class="bg-grey-lighten-1 mt-0 mb-0" height="49px" app>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Survey Y</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: "FooterDefault",
  };
  </script>
  
  <style></style>