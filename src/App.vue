<template>
  <v-app>
    <Navigation/>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import Home from "./components/Home";

export default {
  name: 'App',
  components: {
    Navigation,
    Home
  },
  data: () => ({
    //
  }),
};
</script>
