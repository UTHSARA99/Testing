<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <FooterDefault></FooterDefault>
  </v-app>
</template>

<script>
import FooterDefault from "./components/common/Footer-Default.vue";


export default {
  name: "App",
  components: {
    FooterDefault,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
